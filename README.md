# AstroGem — AI-Powered Gemstone Recommendation App

A web application that recommends Vedic gemstones based on your zodiac sign and current life challenges, powered by Claude AI.

## What This App Does
When you open AstroGem, you can enter your name, birthdate, zodiac sign, and select the specific areas of life you want to focus on—like health, wealth, love, or career. The app passes this information to Claude AI, which analyzes your profile and suggests 3 gemstones matching your celestial chart, explaining how to wear and use each stone.

## Tech Stack
- **Frontend:** React (Vite) + Tailwind CSS
- **Backend:** Node.js + Express.js
- **Database:** MongoDB with Mongoose
- **AI:** Claude API by Anthropic (model: claude-sonnet-4-6)
- **Authentication:** JWT (JSON Web Tokens)

## How to Run Locally

### Prerequisites
- Node.js installed
- MongoDB URI (you can use MongoDB Atlas free tier)
- Anthropic API key

### Steps
1. Clone the repository
   ```bash
   git clone <your-repo-url>
   ```

2. Setup the backend
   ```bash
   cd server
   npm install
   ```
   Create a `.env` file with:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=any_random_secret_key
   ANTHROPIC_API_KEY=your_anthropic_api_key
   PORT=5000
   ```
   Run the backend:
   ```bash
   npm run dev
   ```

3. Setup the frontend
   ```bash
   cd ../client
   npm install
   ```
   Create a `.env` file with:
   ```env
   VITE_API_URL=http://localhost:5000
   ```
   Run the frontend:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Features
- User registration and login with JWT auth
- AI-powered gemstone recommendations based on zodiac + life challenges
- Save and revisit your past recommendations
- Informational About page covering Vedic gemstone knowledge
- Clean, mystical emerald and gold themed UI

## Folder Structure
- `/client` — React frontend and user interface
- `/server` — Express backend handling logic and endpoints
  - `/models` — MongoDB schemas representing users and recommendations
  - `/routes` — API endpoints for authentication and suggestions
  - `/middleware` — JWT auth middleware protecting private endpoints

## Future Plans
Here is a quick wishlist of what I want to add down the road:
- Add birth time and location for full Vedic birth chart analysis
- Let users buy recommended gemstones directly from the app
- Book consultations with real astrologers
- Add gemstone images and 3D views
- Support Hindi and regional Indian languages
- Build a mobile app version
