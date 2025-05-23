import express, { Request, Response } from "express";
import { createServer } from "http";
import cors from 'cors'

const app = express();
app.use(cors())
const port: number = Number(process.env.PORT) || 5000;

app.get("/", (req: Request, res: Response) => {
  res.send("Server is running!nhello there");
});

const server = createServer(app);

server.listen(port, () => {
  console.log(`Server started successfully on port ${port}`);
});
