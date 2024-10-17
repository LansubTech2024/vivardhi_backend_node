const express = require("express");
const authRouter = require("./auth.router");
const sql_dataRouter = require("./sql_data.router");

const router = express.Router();

router.use("/api", authRouter);
router.use("/api", sql_dataRouter);


module.exports = router;