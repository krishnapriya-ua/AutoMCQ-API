import express from "express";
import { createServer } from "http";
import cors from 'cors'
import apiRoutes from './routes/api'

const app = express();
app.use(cors())
const port: number = Number(process.env.PORT) || 8000;

app.use('/api',apiRoutes)

const server = createServer(app);

server.listen(port, () => {
  console.log(`Server started successfully on port ${port}`);
});
