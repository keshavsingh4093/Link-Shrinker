import { generateShortUrl, getLongUrl, getUrls } from "../controllers/url.controller.js";
import { Router } from "express";

const urlRouter = Router();

urlRouter.post("/generate", generateShortUrl);

urlRouter.get("/geturls", getUrls);

urlRouter.get("/:code", getLongUrl);

export { urlRouter };
