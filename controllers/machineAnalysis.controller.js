
const Machine = require('../models/machineAnalysis.model');


const getMachines = async (req, res) => {
    try {
        const machines = await Machine.findAll();
        res.json(machines);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch machines' });
    }
};

module.exports =  {getMachines} ;