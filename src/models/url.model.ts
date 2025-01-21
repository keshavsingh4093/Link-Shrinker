import { Schema, model } from "mongoose";

const urlSchema = new Schema({
    shortUrl: {
        type: String,
        required: true
    },
    longUrl: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const Url = model("url", urlSchema);

export { Url };