const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MachineSchema = new Schema({
    zoneName: {
        type: String,
        required: true
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
        type: Number
    },
    plannedTime: {
        type: Number
    },
    manpower: {
        type: Number
    },
    uptime: {
        type: Number
    },
    totalDowntimeDuration: {
        type: Number
    },
    downtimeReasons: {
        type: String
    },
    totalPieces: {
        type: Number
    },
    target: {
        type: Number
    },
    productionRate: {
        type: Number
    },
    efficiency: {
        type: Number
    },
    goodPieces: {
        type: Number
    },
    totalProduction: {
        type: Number
    },
    rawMaterialUsed: {
        type: Number
    },
    defectRate: {
        type: Number
    },
    scrapRate: {
        type: Number
    },
    partRejectionRate: {
        type: Number
    },
    voltage: {
        type: Number
    },
    current: {
        type: Number
    },
    powerConsumed: {
        type: Number
    },
    totalPowerDowntimeDuration: {
        type: Number
    },
    powerDowntimeReasons: {
        type: String
    },
    energyConsumption: {
        type: Number
    },
    rawMaterialInput: {
        type: Number
    },
    rawMaterialOutput: {
        type: Number
    },
    wasteScrap: {
        type: Number
    },
    wasteDefect: {
        type: Number
    },
    wasteRecycled: {
        type: Number
    },

    // Inventory data fields
    rawMaterialId: {
        type: String
    },
    rawMaterialName: {
        type: String
    },
    currentStock: {
        type: Number
    },
    minimumRequired: {
        type: Number
    },

    // Finished Goods
    finishedGoodId: {
        type: String
    },
    finishedGoodName: {
        type: String
    },
    finishedGoodCurrentStock: {
        type: Number
    },
    finishedGoodMinimumRequired: {
        type: Number
    },

    // Resource allocation fields
    workerId: {
        type: String
    },
    workerName: {
        type: String
    },
    role: {
        type: String
    },
    allocatedHours: {
        type: Number
    },
    workedHours: {
        type: Number
    },
    leave: {
        type: Number
    },
    currentShift: {
        type: String
    },
    allocation: {
        type: String
    },
    equipmentId: {
        type: String
    },
    equipmentName: {
        type: String
    },
    equipmentAllocatedHours: {
        type: Number
    },
    utilizationRate: {
        type: Number
    },
    spindleSpeed: {
        type: Number
    },
    feedRate: {
        type: Number
    },
    cycleTime: {
        type: Number
    },
    machineUtilization: {
        type: Number
    },
    temperature: {
        type: Number
    },
    chuckPressure: {
        type: Number
    },
    downtime: {
        type: Number
    },
    cutDepth: {
        type: Number
    },
    materialRemovalRate: {
        type: Number
    },
    surfaceFinishQuality: {
        type: Number
    },

    // Production rate fields
    targetProduction: {
        type: Number
    },
    actualProduction: {
        type: Number
    },
    overallProductivity: {
        type: Number
    },

    // Tool management fields
    toolInUseId: {
        type: String
    },
    toolInUseName: {
        type: String
    },
    toolInUseUsageTime: {
        type: Number
    },
    toolInUseCondition: {
        type: String
    },
    toolInUseTotalOperation: {
        type: Number
    },
    toolInUseSuccessOperation: {
        type: Number
    },
    toolInUseEfficiency: {
        type: Number
    },
    toolLife: {
        type: Number
    },
    toolWear: {
        type: Number
    },
    totalTools: {
        type: Number
    },
    toolsAvailable: {
        type: Number
    }
}, {
    timestamps: true
});

const Machine = mongoose.model('Machine', MachineSchema);

module.exports = Machine;