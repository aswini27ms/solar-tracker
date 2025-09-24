import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Zap, Battery, Gauge, Leaf, Download, FileText } from 'lucide-react';
import StatCard from './StatCard';
import ChartCard from './ChartCard';
import AlertsPanel from './AlertsPanel';
import WeatherWidget from './WeatherWidget';
import { mockSolarData, generateLiveData } from '../data/mockData';

const Dashboard: React.FC = () => {
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

  const handleDownloadReport = (format: 'csv' | 'pdf') => {
    const timestamp = new Date().toISOString().split('T')[0];
    const filename = `solar-report-${timestamp}`;
    
    if (format === 'csv') {
      downloadCSV(filename);
    } else if (format === 'pdf') {
      downloadPDF(filename);
    }
  };

  const downloadCSV = (filename: string) => {
    // Prepare CSV data
    const csvData = [
      ['Solar System Report', ''],
      ['Generated Date', new Date().toLocaleString()],
      ['', ''],
      ['Current Statistics', ''],
      ['Metric', 'Value', 'Unit'],
      ['Power Output', mockSolarData.currentStats.powerOutput, 'kW'],
      ['Voltage', mockSolarData.currentStats.voltage, 'V'],
      ['Current', mockSolarData.currentStats.current, 'A'],
      ['Efficiency', mockSolarData.currentStats.efficiency, '%'],
      ['Battery Level', mockSolarData.currentStats.batteryLevel, '%'],
      ['Irradiance', mockSolarData.currentStats.irradiance, 'W/m²'],
      ['Temperature', mockSolarData.currentStats.temperature, '°C'],
      ['CO₂ Saved Today', mockSolarData.currentStats.co2Saved, 'tons'],
      ['Energy Generated Today', mockSolarData.currentStats.energyGenerated, 'kWh'],
      ['', ''],
      ['Live Power Data', ''],
      ['Time', 'Power (kW)'],
      ...liveData.map(item => [item.time, item.power]),
      ['', ''],
      ['Weekly Energy Production', ''],
      ['Day', 'Energy (kWh)', 'Efficiency (%)'],
      ...mockSolarData.weeklyData.map(item => [item.day, item.energy, item.efficiency]),
      ['', ''],
      ['Alerts', ''],
      ['Type', 'Message', 'Timestamp', 'Severity'],
      ...mockSolarData.alerts.map(alert => [alert.type, alert.message, alert.timestamp, alert.severity]),
      ['', ''],
      ['Weather Information', ''],
      ['Current Condition', mockSolarData.weather.current.condition, ''],
      ['Temperature', mockSolarData.weather.current.temperature, '°C'],
      ['Humidity', mockSolarData.weather.current.humidity, '%'],
      ['Wind Speed', mockSolarData.weather.current.windSpeed, 'km/h'],
      ['', ''],
      ['Forecast', ''],
      ['Day', 'Condition', 'High (°C)', 'Low (°C)'],
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
    // Create a simple HTML content for PDF
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Solar System Report</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          h1 { color: #f97316; }
          h2 { color: #333; border-bottom: 2px solid #f97316; padding-bottom: 5px; }
          table { width: 100%; border-collapse: collapse; margin: 10px 0; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          th { background-color: #f97316; color: white; }
          .stats-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin: 20px 0; }
          .stat-card { border: 1px solid #ddd; padding: 15px; border-radius: 5px; }
          .alert { padding: 10px; margin: 5px 0; border-radius: 3px; }
          .alert-warning { background-color: #fff3cd; border: 1px solid #ffeaa7; }
          .alert-info { background-color: #d1ecf1; border: 1px solid #bee5eb; }
          .alert-success { background-color: #d4edda; border: 1px solid #c3e6cb; }
        </style>
      </head>
      <body>
        <h1>Solar System Report</h1>
        <p><strong>Generated Date:</strong> ${new Date().toLocaleString()}</p>
        
        <h2>Current Statistics</h2>
        <div class="stats-grid">
          <div class="stat-card">
            <strong>Power Output:</strong> ${mockSolarData.currentStats.powerOutput} kW<br>
            <strong>Voltage:</strong> ${mockSolarData.currentStats.voltage} V<br>
            <strong>Current:</strong> ${mockSolarData.currentStats.current} A
          </div>
          <div class="stat-card">
            <strong>Efficiency:</strong> ${mockSolarData.currentStats.efficiency}%<br>
            <strong>Battery Level:</strong> ${mockSolarData.currentStats.batteryLevel}%<br>
            <strong>Temperature:</strong> ${mockSolarData.currentStats.temperature}°C
          </div>
          <div class="stat-card">
            <strong>CO₂ Saved Today:</strong> ${mockSolarData.currentStats.co2Saved} tons<br>
            <strong>Energy Generated Today:</strong> ${mockSolarData.currentStats.energyGenerated} kWh
          </div>
          <div class="stat-card">
            <strong>Irradiance:</strong> ${mockSolarData.currentStats.irradiance} W/m²
          </div>
        </div>
        
        <h2>Live Power Data</h2>
        <table>
          <thead>
            <tr><th>Time</th><th>Power (kW)</th></tr>
          </thead>
          <tbody>
            ${liveData.map(item => `<tr><td>${item.time}</td><td>${item.power}</td></tr>`).join('')}
          </tbody>
        </table>
        
        <h2>Weekly Energy Production</h2>
        <table>
          <thead>
            <tr><th>Day</th><th>Energy (kWh)</th><th>Efficiency (%)</th></tr>
          </thead>
          <tbody>
            ${mockSolarData.weeklyData.map(item => `<tr><td>${item.day}</td><td>${item.energy}</td><td>${item.efficiency}</td></tr>`).join('')}
          </tbody>
        </table>
        
        <h2>Alerts</h2>
        ${mockSolarData.alerts.map(alert => 
          `<div class="alert alert-${alert.type}">
            <strong>${alert.type.toUpperCase()}:</strong> ${alert.message}<br>
            <small>${alert.timestamp} - Severity: ${alert.severity}</small>
          </div>`
        ).join('')}
        
        <h2>Weather Information</h2>
        <div class="stats-grid">
          <div class="stat-card">
            <strong>Current Condition:</strong> ${mockSolarData.weather.current.condition}<br>
            <strong>Temperature:</strong> ${mockSolarData.weather.current.temperature}°C<br>
            <strong>Humidity:</strong> ${mockSolarData.weather.current.humidity}%<br>
            <strong>Wind Speed:</strong> ${mockSolarData.weather.current.windSpeed} km/h
          </div>
        </div>
        
        <h2>Weather Forecast</h2>
        <table>
          <thead>
            <tr><th>Day</th><th>Condition</th><th>High (°C)</th><th>Low (°C)</th></tr>
          </thead>
          <tbody>
            ${mockSolarData.weather.forecast.map(forecast => 
              `<tr><td>${forecast.day}</td><td>${forecast.condition}</td><td>${forecast.high}</td><td>${forecast.low}</td></tr>`
            ).join('')}
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
    
    // Note: For actual PDF generation, you would need a library like jsPDF or puppeteer
    // This HTML file can be easily converted to PDF using browser's print function
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-orange-100 to-blue-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 sm:p-6 lg:p-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Solar Monitoring Dashboard
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Real-time monitoring of your solar energy system
              </p>
            </div>
            
            <div className="flex space-x-3 mt-4 sm:mt-0">
              <motion.button
                onClick={() => handleDownloadReport('csv')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>CSV Report</span>
              </motion.button>
              
              <motion.button
                onClick={() => handleDownloadReport('pdf')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
              >
                <FileText className="w-4 h-4" />
                <span>PDF Report</span>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Power Output"
            value={currentPower}
            unit="kW"
            icon={Zap}
            change="+2.3%"
            changeType="positive"
            delay={0.1}
          />
          <StatCard
            title="Battery Level"
            value={mockSolarData.currentStats.batteryLevel}
            unit="%"
            icon={Battery}
            change="+5.1%"
            changeType="positive"
            delay={0.2}
          />
          <StatCard
            title="Efficiency"
            value={mockSolarData.currentStats.efficiency}
            unit="%"
            icon={Gauge}
            change="-0.8%"
            changeType="negative"
            delay={0.3}
          />
          <StatCard
            title="CO₂ Saved Today"
            value={mockSolarData.currentStats.co2Saved}
            unit="tons"
            icon={Leaf}
            change="+12.5%"
            changeType="positive"
            delay={0.4}
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <ChartCard
            title="Live Power Output"
            subtitle="Real-time power generation"
            data={liveData}
            type="line"
            dataKey="power"
            xAxisKey="time"
            color="#f97316"
            delay={0.5}
          />
          
          <ChartCard
            title="Weekly Energy Production"
            subtitle="Daily energy generation this week"
            data={mockSolarData.weeklyData}
            type="bar"
            dataKey="energy"
            xAxisKey="day"
            color="#eab308"
            delay={0.6}
          />
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <AlertsPanel alerts={mockSolarData.alerts as any} delay={0.7} />
          </div>
          
          <WeatherWidget weather={mockSolarData.weather} delay={0.8} />
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;