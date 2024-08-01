import express from "express";
const router = express.Router();
import { createUser, getUsers } from "../controllers/usersController";

router.route("/").post(createUser).get(getUsers);

export default router;
