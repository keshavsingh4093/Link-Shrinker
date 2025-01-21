import express, { Request, Response } from "express";
import { connectToDatabase } from "./dbConnection";
import { urlRouter } from "./routes/url.router";
import cors from "cors";
import "dotenv/config"

const app = express();
const PORT = process.env.PORT;

app.use(cors());

app.use(express.json());

app.use(urlRouter);

app.listen(PORT, async () => {
  await connectToDatabase();
  console.log(`Server running at http://localhost:${PORT}`);
});