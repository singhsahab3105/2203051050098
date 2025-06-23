import { Router } from "express";
import { shortUrl } from "../controller/url.controllers.js";
const router = Router();
router.route("/shorturls").post(shortUrl);
export default router;