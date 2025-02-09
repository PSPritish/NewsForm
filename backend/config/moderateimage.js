const OpenAI = require("openai");
const dotenv = require("dotenv");
dotenv.config();
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

async function moderateImage(imageUrl) {
    try {
        // Pass the imageUrl directly as input.
        const moderation = await openai.moderations.create({
            model: "omni-moderation-latest",
            input: imageUrl,
        });

        return moderation.results[0].flagged; // Returns true if the image is unsafe
    } catch (err) {
        console.error("Error in image moderation:", err);
        return true; // Reject the image if an error occurs
    }
}

module.exports = moderateImage;
