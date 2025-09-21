import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Zap, Battery, Gauge, TrendingUp, Leaf, Sun, Download, FileText } from 'lucide-react';
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
    // Simulate download
    const filename = `solar-report-${new Date().toISOString().split('T')[0]}.${format}`;
    alert(`Downloading ${filename}...`);
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
            <AlertsPanel alerts={mockSolarData.alerts} delay={0.7} />
          </div>
          
          <WeatherWidget weather={mockSolarData.weather} delay={0.8} />
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;