import express from "express";
import dotenv from "dotenv";
import urlRouter from "./routes/url.routes.js"
const app = express();
dotenv.config({path: "./.env"})
app.use(express.json());
app.use(urlRouter)
export {app}

