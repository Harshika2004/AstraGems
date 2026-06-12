# Project Notes

## Tech Stack Choices and Why

- **React + Vite:** It is extremely fast to set up, compiles instantly, and makes building dynamic forms and UI dashboards simple with reusable components.
- **Tailwind CSS:** It saves a massive amount of time on styling, allowing me to build a beautiful, custom theme with simple class names.
- **Node.js + Express:** Super lightweight and fast for building REST APIs, and pairs naturally with a Node-based frontend.
- **MongoDB:** The flexible document schema is perfect for storing diverse recommendations and history data without forcing rigid structures.
- **Claude API:** It provides smart, context-aware gemstone recommendations that read like a personalized reading rather than database lookups.
- **JWT:** A clean, stateless way to handle logins and protect user routes without maintaining database session tables.

## Architecture Overview
- The frontend client communicates with the backend server via clean REST API requests.
- The server performs authentication, coordinates Claude API calls, and reads/writes to MongoDB.
- Claude API calls are kept entirely on the server side so that the Anthropic API keys are never exposed to the web browser.
- The JWT is saved in the frontend's `localStorage` and sent inside the `Authorization` header for protected calls.

## Assumptions I Made While Building
- Users know their zodiac sign or can check it based on their birthday.
- This is a spiritual wellness app for personal entertainment and exploration, not clinical therapy.
- Claude API outputs are validated, but we assume it responds with matching JSON properties (and we added a solid try/catch fallback array just in case).
- Users are comfortable with basic login/register flows.
- AstroGem recommendations are suggestions, not absolute astrological dictums.

## Challenges I Faced
- Making sure Claude consistently returns pure JSON without any surrounding conversational text was tricky. I solved it using strict system instructions and a robust regex-backed fallback parser.
- Setting up the JWT middleware so that user identifiers were safely mapped to `req.user` across all routes took a few rounds of refactoring.
- Creating a deep emerald and gold theme that felt mystical and historic without looking outdated took some styling iterations.

## What I Would Improve With More Time
- Implement actual birth chart calculations by requesting the user's birth time and location.
- Add gemstone images or interactive 3D crystal models to make the dashboard visually richer.
- Write a set of unit and integration tests to verify the routes and database updates.
- Set up API rate-limiting to prevent excessive Claude token usage.
- Let users share their gemstone readings directly to social media.
- Add an admin dashboard to track the volume and types of recommendations requested.
