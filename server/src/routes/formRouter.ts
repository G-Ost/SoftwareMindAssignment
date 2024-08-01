import express from "express";
const router = express.Router();
import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
} from "../controllers/formController";

router.route("/").post(createUser).get(getUsers);
router.route("/:id").get(getUser).delete(deleteUser);

export default router;
