const db = require('../DB_connection/db_connection');


const getDeviceByTemp = (chwInTemp) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM devices WHERE chw_in_temp = ?';
        db.query(query, [chwInTemp], (err, results) => {
            if (err) return reject(err);
            resolve(results.length ? results[0] : null);
        });
    });
};

const createDevice = (data) => {
    return new Promise((resolve, reject) => {
        const query = `INSERT INTO devices (
            chw_in_temp, chw_out_temp, cow_in_temp, cow_out_temp, device_date
        ) VALUES (?, ?, ?, ?, ?)`;

        db.query(query, [
            data.chw_in_temp, data.chw_out_temp, data.cow_in_temp, data.cow_out_temp, data.device_date
        ], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};

module.exports = {
    getDeviceByTemp,
    createDevice
};
