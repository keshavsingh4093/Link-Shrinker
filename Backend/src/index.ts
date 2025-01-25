import { connectToDatabase } from "./dbConnection";
import { userRouter } from "./routes/user.router";
import { urlRouter } from "./routes/url.router";
import cookieParser from "cookie-parser"
import express from "express";
import cors from "cors";
import "dotenv/config"

const app = express();
const PORT = process.env.PORT;

app.use(cors());

app.use(express.json());

app.use(cookieParser());

app.use("user", userRouter);

app.use("url",urlRouter);

app.listen(PORT, async () => {
  await connectToDatabase();
  console.log(`Server running at http://localhost:${PORT}`);
});