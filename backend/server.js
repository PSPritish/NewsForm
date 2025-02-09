const express = require("express");
const { google } = require("googleapis");
const cors = require("cors");
const fs = require("fs");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const News = require("./models/news.model");
const validateNewsEntry = require("./config/validator");
const isDuplicate = require("./config/duplicate_check");
const moderateImage = require("./config/moderateimage");
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));


const PORT = process.env.PORT || 5000;
const credentials = JSON.parse(fs.readFileSync("credentials.json"));
const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

function convertToDirectLink(driveUrl) {
    const match = driveUrl.match(/(?:id=|\/d\/)([a-zA-Z0-9-_]+)/);
    return match ? `https://drive.google.com/thumbnail?export=view&id=${match[1]}&sz=s800` : null;
}
async function getNewsData() {
    const sheets = google.sheets({ version: "v4", auth });
    const spreadsheetId = process.env.SPREADSHEET_ID;
    const range = "Sheet1!A:H";

    const response = await sheets.spreadsheets.values.get({ spreadsheetId, range });
    const rows = response.data.values;
    if (!rows.length) return [];

    const processedNews = await News.find({});
    for (let i = 1; i < rows.length; i++) {
        let newsEntry = {
            timeStamp: rows[i][0],
            title: rows[i][1],
            description: rows[i][2],
            city: rows[i][3],
            category: rows[i][4],
            publisher: rows[i][5],
            phone: rows[i][6].replace(/(\d{3})\d{4}(\d{2})/, "$1****$2"),
            image_url: convertToDirectLink(rows[i][7]),
        };

        if (validateNewsEntry(newsEntry) && !(await isDuplicate(newsEntry, processedNews))) {
            if (!(await moderateImage(newsEntry.image_url))) {
                if (await storeNewsInMongo(newsEntry)) {
                    processedNews.push(newsEntry);
                }
            }

        }

    }
}

async function storeNewsInMongo(newsEntry) {
    try {
        const existingNews = await News.findOne({ title: newsEntry.title });
        if (!existingNews) {
            const news = new News(newsEntry);
            await news.save();
            console.log(`News stored: ${newsEntry.title}`);
            return true;
        }
        return false;
    } catch (err) {
        console.error("Error storing news in MongoDB:", err);
        return false;
    }
}

app.get("/api/news", async (req, res) => {
    try {
        await getNewsData();
        const { city, category } = req.query; // Get filters from query params
        let filter = {};

        if (city) filter.city = city;
        if (category) filter.category = category;

        const news = await News.find(filter); // Fetch filtered news from MongoDB
        res.status(200).json({ success: true, data: news });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

app.get("/api/cities", async (req, res) => {
    try {
        const cities = await News.distinct("city"); // Fetch unique city names from MongoDB
        res.status(200).json({ success: true, data: cities });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});


app.listen(PORT, () => {
    connectDB();
    console.log(`Server running on port ${PORT}`)
});
