import express, { Request, Response } from "express";
import { createServer } from "http";
import cors from 'cors'

const app = express();
app.use(cors())
const port: number = Number(process.env.PORT) || 8000;

app.get("/", (req: Request, res: Response) => {
  res.send("Server is running!  ello there");
}); 

const server = createServer(app);

server.listen(port, () => {
  console.log(`Server started successfully on port ${port}`);
});
