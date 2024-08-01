const express = require("express");
const router = express.Router();
const { getContinents } = require("../controllers/continentController");

router.route("/").get(getContinents);

module.exports = router;
