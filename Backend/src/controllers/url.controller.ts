import { Request, Response } from "express";
import { Url } from "../models/url.model";
import * as base62 from "base62-ts";

let counter: number = 1;

const generateShortUrl = async (req: Request, res: Response) => {
  try {
    const longUrl: string = req.body.longUrl;
    const requestUrl: string = req.protocol + "://" + req.get("host");

    const code: string = base62.encode(counter);
    counter++;

    const url = new Url({ code, longUrl });

    await url.save();

    const shortUrl = `${requestUrl}+${code}`;

    console.log(shortUrl);

    res.status(200).json({ shortUrl });
      
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

const getLongUrl = async (req: Request, res: Response) => {
  try {
    const code = req.params.code;

    const url = await Url.findOne({ code });

    if (!url) {
      res.status(400).json({ msg: "Invalid ShortUrl" });
    } else {
      res.redirect(url.longUrl);
    }
  } catch (error) {
    res.status(400).json({ error });
  }
};

export { generateShortUrl, getLongUrl };