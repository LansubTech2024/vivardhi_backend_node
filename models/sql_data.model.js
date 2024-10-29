const { DataTypes } = require('sequelize');
const sequelize = require('../DB_connection/db_connection'); // Ensure this path is correct

const Device = sequelize.define('Device', {
    zoneName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      machineId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      actualRunTime: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      plannedTime: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      manpower: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      uptime: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      totalDowntimeDuration: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      downtimeReasons: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      totalPieces: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      target: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      efficiency: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      goodPieces: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      totalProduction: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      rawMaterialUsed: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      defectRate: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      voltage: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      current: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      powerConsumed: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      totalPowerDowntimeDuration: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      powerDowntimeReasons: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      rawMaterialInput: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      rawMaterialOutput: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      wasteScrap: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      wasteDefect: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      wasteRecycled: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    
      // Inventory data fields
      rawMaterialId: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      rawMaterialName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      currentStock: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      minimumRequired: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    
      // Finished Goods
      finishedGoodId: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      finishedGoodName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      finishedGoodCurrentStock: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      finishedGoodMinimumRequired: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    
      // Resource allocation fields
      workerId: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      workerName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      allocatedHours: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      workedHours: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      leave: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      currentShift: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      allocation: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      equipmentId: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      equipmentName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      equipmentAllocatedHours: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      utilizationRate: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    
      // Production rate fields
      targetProduction: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      actualProduction: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      overallProductivity: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    
      // Tool management fields
      toolInUseId: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      toolInUseName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      toolInUseUsageTime: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      toolInUseCondition: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      toolInUseTotalOperation: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      toolInUseSuccessOperation: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      toolInUseEfficiency: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      totalTools: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      toolsAvailable: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    }, {
  sequelize,
  modelName: 'Device',
  tableName: 'factory_data', // Change to your desired table name
  timestamps: false, // If you want to manage createdAt and updatedAt, set this to true
});

module.exports = Device;
