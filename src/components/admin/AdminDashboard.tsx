import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, FileText } from 'lucide-react';

import KPICards from './KPICards.tsx';
import OutputCard from './OutputCard.tsx';
import { mockSolarData, generateLiveData } from '../../data/mockData';
import { useTranslation } from 'react-i18next';

const Dashboard = () => {
  const { t } = useTranslation();
  const [liveData, setLiveData] = useState(mockSolarData.liveData);
  const [currentPower, setCurrentPower] = useState(mockSolarData.currentStats.powerOutput);

  // Simulate live data updates
  useEffect(() => {
    const interval = setInterval(() => {
      const newPower = generateLiveData();
      setCurrentPower(newPower);
      
      // Update live data array
      setLiveData(prev => {
        const newData = [...prev.slice(1)];
        const now = new Date();
        const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        newData.push({ time: timeString, power: newPower });
        return newData;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  const handleDownloadReport = (format: 'csv' | 'pdf') => {
    const timestamp = new Date().toISOString().split('T')[0];
    const filename = `admin-microgrid-report-${timestamp}`;
    
    if (format === 'csv') {
      downloadCSV(filename);
    } else if (format === 'pdf') {
      downloadPDF(filename);
    }
  };

  const downloadCSV = (filename: string) => {
    // Prepare CSV data with comprehensive admin metrics
    const csvData = [
      [t('report.title'), ''],
      [t('report.generatedDate'), new Date().toLocaleString()],
      [t('report.reportType'), t('report.adminDashboard')],
      ['', ''],
      [t('report.kpiSection'), ''],
      [t('report.metric'), t('report.value'), t('report.unit'), t('report.change')],
      [t('kpi.gridVoltage'), '230.5', 'V', '+0.5%'],
      [t('kpi.gridCurrent'), '45.2', 'A', '+1.2%'],
      [t('kpi.gridFrequency'), '50.0', 'Hz', '0.0%'],
      [t('kpi.solarGeneration'), '156.8', 'kW', '+8.7%'],
      [t('kpi.batterySOC'), '72.5', '%', '-2.1%'],
      [t('kpi.loadDemand'), '189.3', 'kW', '+3.4%'],
      [t('kpi.efficiency'), '92.8', '%', '+0.3%'],
      [t('kpi.powerFactor'), '0.95', '', '+0.01'],
      ['', ''],
      [t('report.systemOutput'), ''],
      [t('report.metric'), t('report.value'), t('report.unit'), t('report.change')],
      [t('output.activePower'), currentPower, 'kW', '+2.3%'],
      [t('output.reactivePower'), '45.2', 'kVAR', '-1.1%'],
      [t('output.totalEnergyGenerated'), '1247.5', 'kWh', '+15.8%'],
      [t('output.netEnergyExport'), '89.3', 'kWh', '+22.4%'],
      ['', ''],
      [t('report.energyFlow'), ''],
      [t('report.category'), t('report.value'), t('report.unit')],
      [t('energy.generatedToday'), '156.8', 'kWh'],
      [t('energy.consumedToday'), '67.5', 'kWh'],
      [t('energy.exportedToGrid'), '89.3', 'kWh'],
      ['', ''],
      [t('output.liveData'), ''],
      [t('report.time'), t('output.power') + ' (kW)'],
      ...liveData.map(item => [item.time, item.power]),
      ['', ''],
      [t('report.additionalMetrics'), ''],
      [t('report.metric'), t('report.value'), t('report.unit')],
      [t('output.voltage'), mockSolarData.currentStats.voltage, 'V'],
      [t('output.current'), mockSolarData.currentStats.current, 'A'],
      [t('output.batteryLevel'), mockSolarData.currentStats.batteryLevel, '%'],
      [t('output.irradiance'), mockSolarData.currentStats.irradiance, 'W/m²'],
      [t('output.temperature'), mockSolarData.currentStats.temperature, '°C'],
      [t('output.co2SavedToday'), mockSolarData.currentStats.co2Saved, 'tons'],
      [t('output.energyGeneratedToday'), mockSolarData.currentStats.energyGenerated, 'kWh'],
      ['', ''],
      [t('report.weeklyProduction'), ''],
      [t('report.day'), t('report.energy') + ' (kWh)', t('report.efficiency') + ' (%)'],
      ...mockSolarData.weeklyData.map(item => [item.day, item.energy, item.efficiency]),
      ['', ''],
      [t('report.systemAlerts'), ''],
      [t('report.type'), t('report.message'), t('report.timestamp'), t('report.severity')],
      ...mockSolarData.alerts.map(alert => [alert.type, alert.message, alert.timestamp, alert.severity]),
      ['', ''],
      [t('report.weatherInfo'), ''],
      [t('output.currentCondition'), mockSolarData.weather.current.condition, ''],
      [t('output.temperature'), mockSolarData.weather.current.temperature, '°C'],
      [t('output.humidity'), mockSolarData.weather.current.humidity, '%'],
      [t('output.windSpeed'), mockSolarData.weather.current.windSpeed, 'km/h'],
      ['', ''],
      [t('report.weatherForecast'), ''],
      [t('report.day'), t('report.condition'), t('report.high') + ' (°C)', t('report.low') + ' (°C)'],
      ...mockSolarData.weather.forecast.map(forecast => [forecast.day, forecast.condition, forecast.high, forecast.low])
    ];

    // Convert to CSV string
    const csvString = csvData.map(row => 
      row.map(field => `"${field}"`).join(',')
    ).join('\n');

    // Create blob and download
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadPDF = (filename: string) => {
    // Create a comprehensive HTML content for PDF
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>${t('report.title')}</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          h1 { color: #3b82f6; }
          h2 { color: #333; border-bottom: 2px solid #3b82f6; padding-bottom: 5px; }
          h3 { color: #555; border-bottom: 1px solid #ddd; padding-bottom: 3px; }
          table { width: 100%; border-collapse: collapse; margin: 10px 0; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          th { background-color: #3b82f6; color: white; }
          .stats-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin: 20px 0; }
          .stat-card { border: 1px solid #ddd; padding: 15px; border-radius: 5px; }
          .kpi-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px; margin: 20px 0; }
          .kpi-card { border: 1px solid #ddd; padding: 12px; border-radius: 5px; text-align: center; }
          .kpi-value { font-size: 1.5em; font-weight: bold; color: #3b82f6; }
          .kpi-unit { font-size: 0.9em; color: #666; }
          .kpi-change { font-size: 0.8em; margin-top: 5px; }
          .change-positive { color: #10b981; }
          .change-negative { color: #ef4444; }
          .change-neutral { color: #6b7280; }
          .energy-summary { display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin: 20px 0; }
          .energy-card { text-align: center; padding: 15px; border-radius: 5px; }
          .energy-generated { background-color: #dcfce7; border: 1px solid #10b981; }
          .energy-consumed { background-color: #dbeafe; border: 1px solid #3b82f6; }
          .energy-exported { background-color: #f3e8ff; border: 1px solid #9333ea; }
          .alert { padding: 10px; margin: 5px 0; border-radius: 3px; }
          .alert-warning { background-color: #fff3cd; border: 1px solid #ffeaa7; }
          .alert-info { background-color: #d1ecf1; border: 1px solid #bee5eb; }
          .alert-success { background-color: #d4edda; border: 1px solid #c3e6cb; }
        </style>
      </head>
      <body>
        <h1>${t('report.title')}</h1>
        <p><strong>${t('report.generatedDate')}:</strong> ${new Date().toLocaleString()}</p>
        <p><strong>${t('report.reportType')}:</strong> ${t('report.adminDashboard')}</p>
        
        <h2>${t('report.kpiSection')}</h2>
        <div class="kpi-grid">
          <div class="kpi-card">
            <div class="kpi-value">230.5</div>
            <div class="kpi-unit">V</div>
            <div>${t('kpi.gridVoltage')}</div>
            <div class="kpi-change change-positive">+0.5%</div>
          </div>
          <div class="kpi-card">
            <div class="kpi-value">45.2</div>
            <div class="kpi-unit">A</div>
            <div>${t('kpi.gridCurrent')}</div>
            <div class="kpi-change change-positive">+1.2%</div>
          </div>
          <div class="kpi-card">
            <div class="kpi-value">50.0</div>
            <div class="kpi-unit">Hz</div>
            <div>${t('kpi.gridFrequency')}</div>
            <div class="kpi-change change-neutral">0.0%</div>
          </div>
          <div class="kpi-card">
            <div class="kpi-value">156.8</div>
            <div class="kpi-unit">kW</div>
            <div>${t('kpi.solarGeneration')}</div>
            <div class="kpi-change change-positive">+8.7%</div>
          </div>
          <div class="kpi-card">
            <div class="kpi-value">72.5</div>
            <div class="kpi-unit">%</div>
            <div>${t('kpi.batterySOC')}</div>
            <div class="kpi-change change-negative">-2.1%</div>
          </div>
          <div class="kpi-card">
            <div class="kpi-value">189.3</div>
            <div class="kpi-unit">kW</div>
            <div>${t('kpi.loadDemand')}</div>
            <div class="kpi-change change-positive">+3.4%</div>
          </div>
          <div class="kpi-card">
            <div class="kpi-value">92.8</div>
            <div class="kpi-unit">%</div>
            <div>${t('kpi.efficiency')}</div>
            <div class="kpi-change change-positive">+0.3%</div>
          </div>
          <div class="kpi-card">
            <div class="kpi-value">0.95</div>
            <div class="kpi-unit"></div>
            <div>${t('kpi.powerFactor')}</div>
            <div class="kpi-change change-positive">+0.01</div>
          </div>
        </div>
        
        <h2>${t('report.systemOutput')}</h2>
        <div class="stats-grid">
          <div class="stat-card">
            <strong>${t('output.activePower')}:</strong> ${currentPower} kW<br>
            <strong>${t('output.reactivePower')}:</strong> 45.2 kVAR<br>
            <strong>${t('output.totalEnergyGenerated')}:</strong> 1,247.5 kWh
          </div>
          <div class="stat-card">
            <strong>${t('output.netEnergyExport')}:</strong> 89.3 kWh<br>
            <strong>${t('kpi.efficiency')}:</strong> 92.8%<br>
            <strong>${t('kpi.powerFactor')}:</strong> 0.95
          </div>
        </div>
        
        <h2>${t('report.energyFlow')}</h2>
        <div class="energy-summary">
          <div class="energy-card energy-generated">
            <div class="kpi-value">+156.8 kWh</div>
            <div>${t('energy.generatedToday')}</div>
          </div>
          <div class="energy-card energy-consumed">
            <div class="kpi-value">67.5 kWh</div>
            <div>${t('energy.consumedToday')}</div>
          </div>
          <div class="energy-card energy-exported">
            <div class="kpi-value">+89.3 kWh</div>
            <div>${t('energy.exportedToGrid')}</div>
          </div>
        </div>
        
        <h2>${t('output.liveData')}</h2>
        <table>
          <thead>
            <tr><th>${t('report.time')}</th><th>${t('output.power')} (kW)</th></tr>
          </thead>
          <tbody>
            ${liveData.map(item => `<tr><td>${item.time}</td><td>${item.power}</td></tr>`).join('')}
          </tbody>
        </table>
        
        <h2>${t('report.additionalMetrics')}</h2>
        <div class="stats-grid">
          <div class="stat-card">
            <strong>${t('output.voltage')}:</strong> ${mockSolarData.currentStats.voltage} V<br>
            <strong>${t('output.current')}:</strong> ${mockSolarData.currentStats.current} A<br>
            <strong>${t('output.batteryLevel')}:</strong> ${mockSolarData.currentStats.batteryLevel}%<br>
            <strong>${t('output.temperature')}:</strong> ${mockSolarData.currentStats.temperature}°C
          </div>
          <div class="stat-card">
            <strong>${t('output.irradiance')}:</strong> ${mockSolarData.currentStats.irradiance} W/m²<br>
            <strong>${t('output.co2SavedToday')}:</strong> ${mockSolarData.currentStats.co2Saved} tons<br>
            <strong>${t('output.energyGeneratedToday')}:</strong> ${mockSolarData.currentStats.energyGenerated} kWh
          </div>
        </div>
        
        <h2>${t('report.weeklyProduction')}</h2>
        <table>
          <thead>
            <tr><th>${t('report.day')}</th><th>${t('report.energy')} (kWh)</th><th>${t('report.efficiency')} (%)</th></tr>
          </thead>
          <tbody>
            ${mockSolarData.weeklyData.map(item => `<tr><td>${item.day}</td><td>${item.energy}</td><td>${item.efficiency}</td></tr>`).join('')}
          </tbody>
        </table>
        
        <h2>${t('report.systemAlerts')}</h2>
        ${mockSolarData.alerts.map(alert => 
          `<div class="alert alert-${alert.type}">
            <strong>${alert.type.toUpperCase()}:</strong> ${alert.message}<br>
            <small>${alert.timestamp} - ${t('report.severity')}: ${alert.severity}</small>
          </div>`
        ).join('')}
        
        <h2>${t('report.weatherInfo')}</h2>
        <div class="stats-grid">
          <div class="stat-card">
            <strong>${t('output.currentCondition')}:</strong> ${mockSolarData.weather.current.condition}<br>
            <strong>${t('output.temperature')}:</strong> ${mockSolarData.weather.current.temperature}°C<br>
            <strong>${t('output.humidity')}:</strong> ${mockSolarData.weather.current.humidity}%<br>
            <strong>${t('output.windSpeed')}:</strong> ${mockSolarData.weather.current.windSpeed} km/h
          </div>
        </div>
        
        <h2>${t('report.weatherForecast')}</h2>
        <table>
          <thead>
            <tr><th>${t('report.day')}</th><th>${t('report.condition')}</th><th>${t('report.high')} (°C)</th><th>${t('report.low')} (°C)</th></tr>
          </thead>
          <tbody>
            ${mockSolarData.weather.forecast.map(forecast => `<tr><td>${forecast.day}</td><td>${forecast.condition}</td><td>${forecast.high}</td><td>${forecast.low}</td></tr>`).join('')}
          </tbody>
        </table>
      </body>
      </html>
    `;

    // Create blob and download
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}.html`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-orange-100 to-blue-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 sm:p-6 lg:p-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto"
      >
        <motion.div variants={itemVariants} className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-orange-700 dark:text-yellow-100 mb-2">
                {t('dashboard')}
              </h1>
            </div>
            
            <div className="flex space-x-3 mt-4 sm:mt-0">
              <motion.button
                onClick={() => handleDownloadReport('csv')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>{t('buttons.csvReport')}</span>
              </motion.button>
              
              <motion.button
                onClick={() => handleDownloadReport('pdf')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
              >
                <FileText className="w-4 h-4" />
                <span>{t('buttons.pdfReport')}</span>
              </motion.button>
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="mb-8">
          <KPICards />
        </motion.div>

        {/* OutputCard occupies full width now */}
        <div className="grid grid-cols-1 gap-6 mb-8">
          <motion.div variants={itemVariants}>
            <OutputCard data={liveData} />
          </motion.div>
        </div>

        {/* AlertsFeed card removed */}
      </motion.div>
    </div>
  );
};

export default Dashboard;