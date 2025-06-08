# URL Shortener

A full-stack URL shortener application with analytics dashboard. Built with React (frontend) and Node.js/Express/MongoDB (backend).

## Features
- User authentication (register, login, logout)
- Create short URLs (with optional custom slug)
- View and copy your shortened URLs
- Analytics dashboard for each short URL:
  - Total clicks
  - Device, browser, location, and source breakdowns (with charts)
- Responsive, modern UI

## Tech Stack
- **Frontend:** React, Chart.js, react-chartjs-2, Tailwind CSS, Redux, React Query, Vite
- **Backend:** Node.js, Express, MongoDB, Mongoose, JWT, UA-Parser, Axios

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB (local or cloud)

### Setup

#### 1. Clone the repository
```bash
# Clone the repo
git clone <your-repo-url>
cd Url-Shortner
```

#### 2. Install dependencies
```bash
cd BACKEND
npm install
cd ../FRONTEND
npm install
```

#### 3. Configure environment variables
- Create a `.env` file in `BACKEND/` with:
  ```env
  MONGO_URI=mongodb://localhost:27017/urlshortner
  JWT_SECRET=your_jwt_secret
  NODE_ENV=development
  ```
- Adjust as needed for your environment.

#### 4. Start the backend
```bash
cd BACKEND
npm run dev
```

#### 5. Start the frontend
```bash
cd ../FRONTEND
npm run dev
```

- Frontend: http://localhost:5173
- Backend: http://localhost:3000

## Usage
- Register or login to your account.
- Paste a long URL and (optionally) enter a custom slug.
- Click "Shorten URL" to generate a short link.
- View your URLs and click any row to see detailed analytics.
- Copy short URLs with one click.

## Project Structure
```
Url-Shortner/
  BACKEND/      # Express/MongoDB backend
  FRONTEND/     # React frontend
```

## License
MIT
