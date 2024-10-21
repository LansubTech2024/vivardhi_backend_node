const { spawn } = require('child_process');
const ChartData = require('../models/detailed_graph.model');
const { Op } = require('sequelize');

class ChartController {
  static pythonScriptPath = 'python/detailed_graph.py';

  static async getChartData(days = 365) {
    try {
      const endDate = new Date();
      const startDate = new Date(endDate.getTime() - (days * 24 * 60 * 60 * 1000));

      const data = await ChartData.findAll({
        attributes: ['device_date', 'chw_in_temp', 'chw_out_temp', 'vaccum_pr', 'cow_in_temp', 'cow_out_temp'],
        where: {
          device_date: {
            [Op.between]: [startDate, endDate]
          }
        },
        order: [['device_date', 'DESC']],
      });
      return data.map(item => item.toJSON());
    } catch (error) {
      console.error('Error fetching chart data:', error);
      throw error;
    }
  }

  static async generateChart(req, res, chartType) {
    try {
      const data = await ChartController.getChartData();
      const graphResults = await ChartController.executePythonScript(data, chartType);
      res.json(graphResults);
    } catch (error) {
      console.error(`Error generating ${chartType}:`, error);
      res.status(500).json({ error: `Failed to generate ${chartType}` });
    }
  }

  static async generateLineChart(req, res) {
    await ChartController.generateChart(req, res, 'line_chart');
  }

  static async generateWaterfallChart(req, res) {
    await ChartController.generateChart(req, res, 'waterfall_chart');
  }

  static async generateDonutChart(req, res) {
    await ChartController.generateChart(req, res, 'donut_chart');
  }

  static async generateCombinationChart(req, res) {
    await ChartController.generateChart(req, res, 'combination_chart');
  }

  static executePythonScript(inputData, chartType) {
    return new Promise((resolve, reject) => {
      const pythonProcess = spawn('python', [
        ChartController.pythonScriptPath,
        '--chart-type',
        chartType
      ]);

      let outputData = '';
      let errorData = '';

      pythonProcess.stdout.on('data', (data) => {
        outputData += data.toString();
      });

      pythonProcess.stderr.on('data', (data) => {
        errorData += data.toString();
      });

      pythonProcess.on('close', (code) => {
        if (code !== 0) {
          reject(new Error(`Python script exited with code ${code}\nError: ${errorData}`));
        } else {
          try {
            const results = JSON.parse(outputData);
            resolve(results);
          } catch (error) {
            reject(new Error(`Failed to parse Python script output: ${error.message}`));
          }
        }
      });

      // Send input data to the Python script
      pythonProcess.stdin.write(JSON.stringify(inputData));
      pythonProcess.stdin.end();
    });
  }
}

module.exports = ChartController;