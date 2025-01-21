import { Router, Request, Response } from "express";
import { Url } from "../models/url.model";
import * as base62 from "base62-ts";

const urlRouter = Router();
let counter: number = 1;

urlRouter.post("/generate-short-url", async (req: Request, res: Response) => {
    console.log("inside route");
    try {
        const longUrl: string = req.body.longUrl;
        console.log(longUrl);

        const shortUrl = base62.encode(counter);
        counter++;

        const url = new Url({ shortUrl, longUrl });

        await url.save();

        console.log(url);

        res.status(200).json({ url });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error });
    }
});


urlRouter.get("/:shortUrl", async (req: Request, res: Response) => {
    try {
        const shortUrl = req.params.shortUrl;

        const url = await Url.findOne({ shortUrl });

        if (!url) {
            res.status(400).json({ msg: "Invalid ShortUrl" });
        } else {
            res.redirect(url.longUrl);
        }

    } catch (error) {
        res.status(400).json({ error });
    }
});

export { urlRouter };
