const express = require("express");
const authRouter = require("./auth.router");
const sql_dataRouter = require("./sql_data.router");
const graphRouter = require("./Graph.router");
const detailedRouter = require("./detailed_graph.router");
const resource =require("./Resource.router");
const oee=require("./Oee.router");
const Productionmetrics=require("./Productionmetrics.router")
const oeeanalysis=require("./Oeeanalysis.router")
const router = express.Router();

router.use("/api", authRouter);
router.use("/api", sql_dataRouter);
router.use("/api", graphRouter );
router.use("/api/graphs", detailedRouter);
router.use("/api",resource);
router.use('/api',oee);
router.use("/api",Productionmetrics);
router.use("/api",oeeanalysis)

module.exports = router;