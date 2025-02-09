# NewsForm Application

This repository contains the source code for the NewsForm application, a full-stack web application that fetches news data from a Google Sheets document, validates and stores it in MongoDB, and displays it on a React frontend. The application also includes image moderation using the OpenAI API.

## Table of Contents

- [Setup Instructions](#setup-instructions)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Running the Application](#running-the-application)
- [Testing the Application](#testing-the-application)
- [Design Choices](#design-choices)
- [Extra Features](#extra-features)

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- Google Cloud account with access to Google Sheets API
- OpenAI API key

### Backend Setup

1. Clone the repository:

   ```sh
   git clone https://github.com/PSPritish/NewsForm.git
   cd NewsForm/backend
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Create a `.env` file in the `backend` directory with the following content:

   ```env
   SPREADSHEET_ID=your_google_sheet_id
   PORT=3000
   MONGO_URI=your_mongodb_connection_string
   OPENAI_API_KEY=your_openai_api_key
   ```

4. Obtain Google Sheets API credentials:

   - Go to the [Google Cloud Console](https://console.cloud.google.com/).
   - Create a new project or select an existing one.
   - Enable the Google Sheets API for your project.
   - Create service account credentials and download the JSON file.
   - Save the JSON file as `credentials.json` in the `backend` directory.

5. Start the backend server:
   ```sh
   npm start
   ```

### Frontend Setup

1. Navigate to the `frontend` directory:

   ```sh
   cd ../frontend
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Start the frontend development server:
   ```sh
   npm run dev
   ```

## Running the Application

1. Ensure that both the backend and frontend servers are running.
2. Open your browser and navigate to `http://localhost:5173` to view the application.

## Testing the Application

- To test the backend, you can use tools like Postman to send requests to the API endpoints.
- To test the frontend, simply interact with the application in your browser.

## Design Choices

- **Backend**: The backend is built with Express.js and MongoDB. It fetches data from Google Sheets, validates it using Zod, checks for duplicates, and moderates images using the OpenAI API.
- **Frontend**: The frontend is built with React and Vite. It fetches news data from the backend and displays it with filtering options for city and category.
- **Validation**: Zod is used for schema validation to ensure data integrity.
- **Image Moderation**: OpenAI's moderation API is used to ensure that images are safe for display.

## Extra Features

- **City and Category Filters**: Users can filter news by city and category. The city filter is determined by the unique cities present in the database.
- **Image Moderation**: Images are moderated using OpenAI's API to ensure they are safe for display.
- **Duplicate Check**: News entries are checked for duplicates based on description similarity.

Feel free to contribute to this project by submitting issues or pull requests.
