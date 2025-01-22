Frontend Setup Guide

Prerequisites

Ensure your system has the following installed:
Node.js (LTS)
Git (for cloning the repository)

1️⃣ Clone the Repository

git clone <your-repo-url> frontend
cd frontend

2️⃣ Create & Configure Environment Variables

Copy the environment config file:
cp .env.example .env
Edit .env and set the backend API URL:
NEXT_PUBLIC_API_URL="http://localhost:5000"

3️⃣ Install Dependencies
npm install

4️⃣ Start the Frontend Development Server
npm run dev

Your frontend should now be running at http://localhost:3000.

