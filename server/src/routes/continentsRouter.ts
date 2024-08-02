import express from "express";
import { getContinents } from "../controllers/continentsController";
const router = express.Router();

router.route("/").get(getContinents);

export default router;
