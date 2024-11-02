const calculateKPIs = (data) => {
    const calculateOEE = (entry) => {
      const availability = entry.actualRunTime / entry.plannedTime;
      const performance = entry.totalPieces / (entry.target || 1);
      const quality = entry.goodPieces / (entry.totalPieces || 1);
      return (availability * performance * quality * 100).toFixed(2);
    };
  
    const calculateAvailability = (entry) => {
      return ((entry.actualRunTime / entry.plannedTime) * 100).toFixed(2);
    };
  
    const calculatePerformance = (entry) => {
      return ((entry.totalPieces / entry.target) * 100).toFixed(2);
    };
  
    const calculateQuality = (entry) => {
      return ((entry.goodPieces / entry.totalPieces) * 100).toFixed(2);
    };
  
    const calculateYield = (entry) => {
      return ((entry.rawMaterialOutput / entry.rawMaterialInput) * 100).toFixed(2);
    };
  
    const latest = data[data.length - 1];
    
    return {
      oee: calculateOEE(latest),
      availability: calculateAvailability(latest),
      performance: calculatePerformance(latest),
      quality: calculateQuality(latest),
      yield: calculateYield(latest)
    };
  };
  
  const calculateProductionMetrics = (data) => {
    return data.map(entry => ({
      date: entry.date,
      actualProduction: entry.actualProduction,
      targetProduction: entry.targetProduction,
      efficiency: entry.efficiency,
      defectRate: entry.defectRate
    }));
  };
  
  const calculateInventoryMetrics = (data) => {
    return data.map(entry => ({
      date: entry.date,
      rawMaterials: entry.currentStock,
      finishedGoods: entry.finishedGoodCurrentStock,
      wasteScrap: entry.wasteScrap,
      wasteDefect: entry.wasteDefect
    }));
  };
  
  const calculateDowntimeAnalysis = (data) => {
    return data.map(entry => ({
      date: entry.date,
      downtime: entry.totalDowntimeDuration,
      reasons: entry.downtimeReasons,
      uptime: entry.uptime
    }));
  };
  
  module.exports = {
    calculateKPIs,
    calculateProductionMetrics,
    calculateInventoryMetrics,
    calculateDowntimeAnalysis
  };
  