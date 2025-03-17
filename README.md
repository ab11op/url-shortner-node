# 🚀 URL Shortener Service

A simple URL shortener built with **Node.js**, **Express**, **MongoDB**, and **Redis**, supporting both **local development** and **Docker deployment**.

---

## ⚡ Features
- Shortens long URLs and stores them in **MongoDB**
- Caches results in **Redis** for faster lookups
- REST API to create and retrieve short URLs
- Supports both **local development** and **Docker environment**
- Uses **nodemon** for hot-reloading in local mode

---

## 🚀 **Running Locally (Development Mode)**
### **1️⃣ Install Dependencies**
Make sure you have **Node.js** installed, then run:
```sh
npm install

If running without Docker, you need MongoDB and Redis installed locally. Start them:

mongod --dbpath /data/db  # Start MongoDB
redis-server              # Start Redis

Use nodemon for hot reloading:

npm run dev


🐳 Running with Docker
If you prefer to run everything in Docker, follow these steps:

docker-compose up --build

This will start:

MongoDB on mongodb://mongo:27017
Redis on redis://redis:6379
URL Shortener API on http://localhost:5001

To stop the containers:
docker-compose down


📜 Environment Variables (.env file)

Create a .env file in the root folder and add:

PORT=5001
MONGO_URI=mongodb://localhost:27017/urlshortener  # Change for Docker
REDIS_URI=redis://localhost:6379
BASE_URL=http://localhost:5001


For Docker, use:

MONGO_URI=mongodb://mongo:27017/urlshortener
REDIS_URI=redis://redis:6379


🔥 API Endpoints
Method	Endpoint	Description
POST	/api/shorten	Shorten a long URL
GET	   /api/:shortCode	Redirect to the long URL


curl -X POST http://localhost:5001/api/shorten -H "Content-Type: application/json" -d '{"longUrl": "https://example.com"}'


🛠️ Troubleshooting

1️⃣ MongoDB or Redis not connecting?

Ensure they are running locally or check the Docker logs:
docker-compose logs -f


2️⃣ CSS/JS not loading?

Ensure the frontend files are inside /client/
Try opening http://localhost:5001/styles.css in your browser. If it returns 404, check your express.static() setup.

🤝 Contributing
Feel free to open an issue or submit a pull request! 🙌

📜 License
This project is MIT licensed.


🎯 Now you’re ready to use the URL Shortener! 🚀

---

### 🔥 **What This README Covers**
✅ How to **run locally with nodemon**  
✅ How to **run with Docker**  
✅ API endpoints with **cURL example**  
✅ **Troubleshooting common issues**  
✅ **Environment variables setup**  

Let me know if you want any modifications! 🚀🔥