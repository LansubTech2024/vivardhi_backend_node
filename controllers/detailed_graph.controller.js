// controllers/graph_controller.js
const { spawn } = require('child_process');
const DetailedGraphModel = require('../models/detailed_graph.model');
const { Op } = require('sequelize');

const runPythonScript = (scriptName, data) => {
  return new Promise((resolve, reject) => {
    const pythonProcess = spawn('python', ['python/detailed_graph.py', scriptName]);
    
    let result = '';
    pythonProcess.stdout.on('data', (data) => {
      result += data.toString();
    });
    
    pythonProcess.stderr.on('data', (data) => {
      console.error(`Python script error: ${data}`);
      reject(data.toString());
    });
    
    pythonProcess.on('close', (code) => {
      if (code !== 0) {
        reject(`Python script exited with code ${code}`);
      } else {
        resolve(JSON.parse(result));
      }
    });

    pythonProcess.stdin.write(JSON.stringify(data));
    pythonProcess.stdin.end();
  });
};

const fetchData = async (days) => {
  const endDate = new Date();
  const startDate = new Date(endDate.getTime() - days * 24 * 60 * 60 * 1000);

  return await DetailedGraphModel.findAll({
    where: {
      device_date: {
        [Op.between]: [startDate, endDate]
      }
    },
    order: [['device_date', 'ASC']],
    attributes: ['device_date', 'chw_in_temp', 'chw_out_temp', 'cow_in_temp', 'cow_out_temp', 'vaccum_pr']
    
  });
};

exports.lineChartPopup = async (req, res) => {
  try {
    const data = await fetchData(30);
    const result = await runPythonScript('line_chart_popup', data);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

exports.waterfallChartPopup = async (req, res) => {
  try {
    const data = await fetchData(30);
    const result = await runPythonScript('waterfall_chart_popup', data);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

exports.donutChartPopup = async (req, res) => {
  try {
    const data = await fetchData(30);
    const result = await runPythonScript('donut_chart_popup', data);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

exports.combinationChartPopup = async (req, res) => {
  try {
    const data = await fetchData(365);
    const result = await runPythonScript('combination_chart_popup', data);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};