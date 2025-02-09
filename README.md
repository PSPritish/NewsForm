# NewsForm

This repository contains the source code for the NewsForm application, which fetches news data from a Google Sheets document, validates and stores it in a MongoDB database, and provides a frontend interface to display the news.

## Setup Instructions

### Prerequisites

1. **Node.js**: Ensure you have Node.js installed. You can download it from [nodejs.org](https://nodejs.org/).
2. **MongoDB**: Set up a MongoDB instance. You can use MongoDB Atlas for a cloud-based solution.
3. **Google Cloud Account**: Set up a Google Cloud account to access the Google Sheets API.
4. **OpenAI Account**: Set up an OpenAI account to access the GPT-4 API.

### Google Sheets API Setup

1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Create a new project.
3. Enable the Google Sheets API for your project.
4. Create a service account and download the `credentials.json` file.
5. Share your Google Sheet with the service account email.

### OpenAI API Setup

1. Sign up for an account at [OpenAI](https://www.openai.com/).
2. Generate an API key.

### Environment Variables

Create a `.env` file in the root directory with the following content:

```
SPREADSHEET_ID=your_google_sheet_id
PORT=3000
MONGO_URI=your_mongodb_connection_string
OPENAI_API_KEY=your_openai_api_key
```

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/yourusername/newsform.git
   cd newsform
   ```

2. Install backend dependencies:

   ```sh
   npm install
   ```

3. Install frontend dependencies:
   ```sh
   cd frontend
   npm install
   cd ..
   ```

### Running the Application

1. Start the backend server:

   ```sh
   npm run dev
   ```

2. Start the frontend development server:
   ```sh
   cd frontend
   npm run dev
   ```

### Building for Production

1. Build the frontend:

   ```sh
   cd frontend
   npm run build
   cd ..
   ```

2. Start the production server:
   ```sh
   npm start
   ```

## Testing

To test the application, you can use tools like Postman to make API requests to the backend or simply use the frontend interface.

## Design Choices and Extra Features

- **Validation**: Used `zod` for schema validation to ensure data integrity.
- **Duplicate Check**: Implemented a duplicate check using `string-similarity` to avoid storing similar news entries.
- **Image Moderation**: Integrated OpenAI's GPT-4 API for image moderation to filter out inappropriate content.
- **Frontend**: Built with React and Tailwind CSS for a responsive and modern UI.
- **Filters**: Added filters for city and category to enhance user experience.

Feel free to explore the code and contribute to the project!
