dotenv.config()
import express from 'express'
import helmet from 'helmet'
import http from 'node:http'
import dotenv from 'dotenv'
import cors from 'cors'
import { fileURLToPath } from 'url';
import {limiter} from './api/rateLimit.js'
import { redisClient } from './api/redisConn.js'
import db_Connection from './api/dbConn.js'
import apiRouter from './api/urlApi.js'
import path from 'path'
const app = express()
const server = http.createServer(app)
app.use(helmet())
app.use(cors())
app.use(express.json())

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log('--dirname',__dirname)
app.use(express.static(path.join(__dirname, "client")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "index.html"));
});
app.get('/health-check',(_req,res)=> {
    res.status(200).json('SERVER IS UP AND RUNNING')
})
app.use(limiter)
app.use('/api',apiRouter)


console.log('dir name',__dirname)
const PORT = process.env.PORT || 5001
db_Connection()
redisClient.connect().then(() => console.log("Redis Connected")).catch(err => console.error('err in connecting to the redis client',err.message ? err.message: err));
server.listen(`${PORT}`,()=> {
    console.log(`server listening on port ${PORT}`)

})
