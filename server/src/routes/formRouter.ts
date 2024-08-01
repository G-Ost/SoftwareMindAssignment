import express from "express";
const router = express.Router();
import { createUser, getUsers } from "../controllers/formController";

router.route("/").post(createUser).get(getUsers);

export default router;
