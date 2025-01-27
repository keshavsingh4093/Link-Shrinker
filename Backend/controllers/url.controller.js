import { Url } from "../models/url.model.js";
import * as base62 from "base62-ts";

let counter = 1;

const generateShortUrl = async (req, res) => {
  try {
    const { longUrl, title } = req.body;
    
    const requestUrl = req.protocol + "://" + req.get("host");

    const code = base62.encode(counter);
    counter++;

    const url = new Url({ code, longUrl, title });

    await url.save();

    const shortUrl = `${requestUrl}/${code}`;

    console.log(shortUrl);

    res.status(200).json({ shortUrl });
      
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

const getLongUrl = async (req, res) => {
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

const getUrls = async (req, res) => {
  try {
    const urls = await Url.aggregate([
      {
        $addFields: {
          shortUrl: {
            $concat: ["http://localhost:8900/","$code"]
          }
        }
      },
      {
        $project: {
          _id: 0,
          code: 0
        }
      }
    ]);

    res.status(200).json({ urls });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ sucess: false, message: "Something went wrong" });
  }
}

export { generateShortUrl, getLongUrl, getUrls };