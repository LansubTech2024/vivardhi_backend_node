const fs = require('fs').promises;
const path = require('path');
const json2csv = require('json2csv').parse;
const csv2json = require('csvtojson');
const Device = require('../models/sql_data.model');

exports.importMachines = async (req, res) => {
  try {
    const jsonFilePath = path.join(__dirname, '../Data', 'data.json');
    const jsonData = await fs.readFile(jsonFilePath, 'utf8');
    const data = JSON.parse(jsonData);

    if (!Array.isArray(data)) {
      return res.status(400).json({ error: "Expected a list of objects in JSON file." });
    }

    const csv = json2csv(data);
    const jsonArray = await csv2json().fromString(csv);

    const keysToExtract = ['CHW_IN_TEMP', 'CHW_OUT_TEMP', 'COW_IN_TEMP', 'COW_OUT_TEMP','VACCUM_PR', 'TIME'];
    const filteredData = jsonArray.map(item => 
      keysToExtract.reduce((acc, key) => {
        if (item[key]) acc[key] = item[key];
        return acc;
      }, {})
    ).filter(item => Object.keys(item).length > 0);

    const newMachines = [];
    for (const item of filteredData) {
      if (item.device_date) {
        item.device_date = new Date(item.device_date);
      }

      const [machine, created] = await Device.findOrCreate({
        where: { 
            chw_in_temp: item.CHW_IN_TEMP,
            chw_out_temp: item.CHW_OUT_TEMP,
            cow_in_temp: item.COW_IN_TEMP,
            cow_out_temp: item.COW_OUT_TEMP,
            vaccum_pr: item.VACCUM_PR,
            device_date: item.TIME
         },
        defaults: item,
      });

      if (created) {
        newMachines.push(machine);
        await new Promise(resolve => setTimeout(resolve, 3000)); // 3 seconds delay
      }
    }

    const totalRecords = await Device.count();

    res.status(201).json({
      success: `${newMachines.length} new records successfully inserted into MySQL!`,
      total_records: totalRecords,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};