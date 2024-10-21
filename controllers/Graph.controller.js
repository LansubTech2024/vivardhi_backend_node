const { spawn } = require('child_process');
const GraphModel = require('../models/Graph.model');

exports.generateGraphsData = async (req, res) => {
    try {
        // Fetch data from MySQL
        const graphData = await GraphModel.findAll({
            attributes: ['chw_in_temp', 'chw_out_temp', 'cow_in_temp', 'cow_out_temp', 'vaccum_pr', 'device_date']
        });

        // Convert data to JSON to send to Python
        const dataToPython = graphData.map(row => ({
            chw_in_temp: row.chw_in_temp,
            chw_out_temp: row.chw_out_temp,
            cow_in_temp: row.cow_in_temp,
            cow_out_temp: row.cow_out_temp,
            vaccum_pr: row.vaccum_pr,
            device_date: row.device_date.toISOString()
        }));

        // Spawn a Python process to run the AI/ML graph logic
        const pythonProcess = spawn('python', ['python/graph_logic.py']);

        // Send data to Python script
        pythonProcess.stdin.write(JSON.stringify(dataToPython));
        pythonProcess.stdin.end();

        // Capture the output from Python script
        pythonProcess.stdout.on('data', (data) => {
            const graphResults = JSON.parse(data.toString());
            res.json(graphResults);  // Send results to frontend
        });

        pythonProcess.stderr.on('data', (data) => {
            console.error(`Python error: ${data}`);
        });

    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};
