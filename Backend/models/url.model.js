import { Schema, model } from "mongoose";

const urlSchema = new Schema({
    code: {
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
    },
    title: String
});

const Url = model("url", urlSchema);

export { Url };