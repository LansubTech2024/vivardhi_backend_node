const express = require("express");

const authRouter = require("./auth.router");
const sql_dataRouter = require("./sql_data.router");
const graphRouter = require("./Graph.router");
const detailedRouter = require("./detailed_graph.router");
const resource =require("./Resource.router");
const powerRouter = require("./powerUsage.router");
const inventoryRouter = require("./inventory.router");
const dashboardRouter = require("./dashboard.router");
const productivityRouter = require("./Production.router");
const oeeanalysis=require("./Oeeanalysis.router");
const machineRouter = require("./machineAnalysis.router")

const router = express.Router();

router.use("/api", authRouter);
router.use("/api", sql_dataRouter);
router.use("/api", graphRouter );
router.use("/api/graphs", detailedRouter);
router.use("/api",resource);
router.use("/api" , powerRouter);
router.use("/api", inventoryRouter);
router.use("/api" , dashboardRouter);
router.use("/api",productivityRouter);
router.use("/api",oeeanalysis);
router.use("/api" , machineRouter)


module.exports = router;