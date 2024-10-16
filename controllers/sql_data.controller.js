const fs = require('fs');
const path = require('path');
const Device = require('../models/sql_data.model');

// Import JSON data, clean it, and insert it into the database
const importMachines = async (req, res) => {
    try {
        // Dynamically construct the file path using 'path'
        const jsonFilePath = path.join(__dirname, '../Data/data.json');

        // Load JSON data from the file
        const data = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));

        if (!Array.isArray(data)) {
            return res.status(400).json({ error: 'Expected a list of objects in JSON file.' });
        }

        // Extract relevant columns (all 11 columns in this case)
        const keysToExtract = [
            'CHW_IN_TEMP', 'CHW_OUT_TEMP', 'COW_IN_TEMP', 'COW_OUT_TEMP', 'DEVICE_DATE'
        ];
        
        const filteredData = data.map(item => {
            return keysToExtract.reduce((obj, key) => {
                obj[key.toLowerCase()] = item[key] || null;  // Convert keys to lowercase
                return obj;
            }, {});
        });

        // Clean data (remove null values, duplicates)
        const cleanedData = filteredData
            .filter(row => row.chw_in_temp && row.device_date)  // Filter out rows with nulls in critical fields
            .filter((row, index, self) =>
                index === self.findIndex((t) => t.chw_in_temp === row.chw_in_temp)
            );

        // Insert new data with a 3-second delay
        let newMachinesCount = 0;
        for (let i = 0; i < cleanedData.length; i++) {
            const row = cleanedData[i];

            // Check if the device already exists
            const existingDevice = await Device.getDeviceByTemp(row.chw_in_temp);
            if (!existingDevice) {
                await Device.createDevice(row); // Insert new device record
                newMachinesCount++;
                console.log(`Inserted: ${row.chw_in_temp}`);
            }

            // Add a delay of 3 seconds
            await new Promise(resolve => setTimeout(resolve, 3000));
        }

        res.status(201).json({
            success: `${newMachinesCount} new records successfully inserted!`,
            total_records: cleanedData.length
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    importMachines
};
