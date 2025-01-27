import { generateShortUrl, getLongUrl, getUrls } from "../controllers/url.controller.js";
import { checkForToken } from "../controllers/user.controller.js";
import { Router } from "express";

const urlRouter = Router();

urlRouter.use(checkForToken);

urlRouter.post("/generate", generateShortUrl);

urlRouter.get("/geturls", getUrls);

urlRouter.get("/:code", getLongUrl);

export { urlRouter };
