import { redis } from "../redisConnection.js";
import { Url } from "../models/url.model.js";
import * as base62 from "base62-ts";

const generateShortUrl = async (req, res) => {
  try {
    const user = req.user;
    const { longUrl, title } = req.body;

    const counter = await redis.get("counter");

    await redis.set("counter", counter + 1);

    const code = base62.encode(counter);

    const url = new Url({ code, longUrl, title });

    await url.save();

    user.urls.push(url._id);

    await user.save();

    const apiUrl = "https://link-shrinker-gc27.onrender.com";

    const shortUrl = `${apiUrl}/${code}`;

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

    const urlFromRedis = await redis.get(code);
    if (urlFromRedis) {
        return res.status(301).redirect(urlFromRedis);
    }

    const url = await Url.findOne({ code });

    if (!url) {
      res.status(404).json({ msg: "Invalid ShortUrl" });
    } else {
      await redis.set(code, url.longUrl);
      res.status(301).redirect(url.longUrl);
    }
  } catch (error) {
    res.status(400).json({ error });
  }
};

const getUrls = async (req, res) => {
  try {
    const user = req.user;
    const urls = await Url.aggregate([
      {
        $match: {
          _id: { $in: user.urls },
        },
      },
      {
        $addFields: {
          shortUrl: {
            $concat: ["https://link-shrinker-gc27.onrender.com/", "$code"],
          },
        },
      },
      {
        $project: {
          _id: 0,
          code: 0,
        },
      },
    ]);

    res.status(200).json({ name: user.name, urls });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ sucess: false, message: "Something went wrong" });
  }
};

export { generateShortUrl, getLongUrl, getUrls };
