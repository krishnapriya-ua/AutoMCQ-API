import express from "express";
import { createServer } from "http";
import cors from 'cors'
import apiRoutes from './routes/api'
import connectDB from "./config";
import dotenv from 'dotenv'
dotenv.config()

const app = express();
app.use(cors())
connectDB()
const port: number = Number(process.env.PORT) || 8000;

app.use('/api',apiRoutes)

const server = createServer(app);

server.listen(port, () => {
  console.log(`Server started successfully on port ${port}`);
});
