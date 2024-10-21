const express = require("express");
const authRouter = require("./auth.router");
const sql_dataRouter = require("./sql_data.router");
const graphRouter = require("./Graph.router");
const detailedRouter = require("./detailed_graph.router");
const resource =require("./Resource.router");

const router = express.Router();

router.use("/api", authRouter);
router.use("/api", sql_dataRouter);
router.use("/api", graphRouter );
router.use("/api/graphs", detailedRouter);
router.use("/api",resource);


module.exports = router;