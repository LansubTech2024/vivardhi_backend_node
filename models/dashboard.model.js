const mongoose = require('mongoose');

// Define the schema
const ProductionDataSchema = new mongoose.Schema({
    zoneName: {
        type: String,
        required: true  // equivalent to allowNull: false
    },
    machineId: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    actualRunTime: {
        type: Number,
        required: false
    },
    plannedTime: {
        type: Number,
        required: false
    },
    manpower: {
        type: Number,
        required: false
    },
    uptime: {
        type: Number,
        required: false
    },
    totalDowntimeDuration: {
        type: Number,
        required: false
    },
    downtimeReasons: {
        type: String,
        required: false
    },
    totalPieces: {
        type: Number,
        required: false
    },
    target: {
        type: Number,
        required: false
    },
    efficiency: {
        type: Number,
        required: false
    },
    goodPieces: {
        type: Number,
        required: false
    },
    totalProduction: {
        type: Number,
        required: false
    },
    rawMaterialUsed: {
        type: Number,
        required: false
    },
    defectRate: {
        type: Number,
        required: false
    },
    voltage: {
        type: Number,
        required: false
    },
    current: {
        type: Number,
        required: false
    },
    powerConsumed: {
        type: Number,
        required: false
    },
    totalPowerDowntimeDuration: {
        type: Number,
        required: false
    },
    powerDowntimeReasons: {
        type: String,
        required: false
    },
    rawMaterialInput: {
        type: Number,
        required: false
    },
    rawMaterialOutput: {
        type: Number,
        required: false
    },
    wasteScrap: {
        type: Number,
        required: false
    },
    wasteDefect: {
        type: Number,
        required: false
    },
    wasteRecycled: {
        type: Number,
        required: false
    },

    // Inventory data fields
    rawMaterialId: {
        type: String,
        required: false
    },
    rawMaterialName: {
        type: String,
        required: false
    },
    currentStock: {
        type: Number,
        required: false
    },
    minimumRequired: {
        type: Number,
        required: false
    },

    // Finished Goods
    finishedGoodId: {
        type: String,
        required: false
    },
    finishedGoodName: {
        type: String,
        required: false
    },
    finishedGoodCurrentStock: {
        type: Number,
        required: false
    },
    finishedGoodMinimumRequired: {
        type: Number,
        required: false
    },

    // Resource allocation fields
    workerId: {
        type: String,
        required: false
    },
    workerName: {
        type: String,
        required: false
    },
    role: {
        type: String,
        required: false
    },
    allocatedHours: {
        type: Number,
        required: false
    },
    workedHours: {
        type: Number,
        required: false
    },
    leave: {
        type: Number,
        required: false
    },
    currentShift: {
        type: String,
        required: false
    },
    allocation: {
        type: String,
        required: false
    },
    equipmentId: {
        type: String,
        required: false
    },
    equipmentName: {
        type: String,
        required: false
    },
    equipmentAllocatedHours: {
        type: Number,
        required: false
    },
    utilizationRate: {
        type: Number,
        required: false
    },

    // Production rate fields
    targetProduction: {
        type: Number,
        required: false
    },
    actualProduction: {
        type: Number,
        required: false
    },
    overallProductivity: {
        type: Number,
        required: false
    },

    // Tool management fields
    toolInUseId: {
        type: String,
        required: false
    },
    toolInUseName: {
        type: String,
        required: false
    },
    toolInUseUsageTime: {
        type: Number,
        required: false
    },
    toolInUseCondition: {
        type: String,
        required: false
    },
    toolInUseTotalOperation: {
        type: Number,
        required: false
    },
    toolInUseSuccessOperation: {
        type: Number,
        required: false
    },
    toolInUseEfficiency: {
        type: Number,
        required: false
    },
    totalTools: {
        type: Number,
        required: false
    },
    toolsAvailable: {
        type: Number,
        required: false
    }
}, {
    collection: 'machines',  // equivalent to tableName
    timestamps: false        // keeps timestamps disabled
});

// Create and export the model
const ProductionData = mongoose.model('ProductionData', ProductionDataSchema);
module.exports = ProductionData;