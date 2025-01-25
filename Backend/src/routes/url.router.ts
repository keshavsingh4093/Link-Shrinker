import { generateShortUrl, getLongUrl } from "../controllers/url.controller";
import { Router } from "express";

const urlRouter = Router();

urlRouter.post("/generate", generateShortUrl);

urlRouter.get("/:code", getLongUrl);

export { urlRouter };
