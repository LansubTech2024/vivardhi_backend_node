const express = require("express");
const authRouter = require("./auth.router");

const router = express.Router();

router.use("/api", authRouter);


module.exports = router;