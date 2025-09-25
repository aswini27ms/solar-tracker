import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sun, Zap, TrendingUp, PieChart } from 'lucide-react';
import StatCard from '../StatCard';

interface SolarCardProps {
  data: Array<{ time: string; power: number }>;
}

const SolarCard: React.FC<SolarCardProps> = ({ data }) => {
  const [solarHistory, setSolarHistory] = useState([
    { time: '06:00', power: 0 },
    { time: '08:00', power: 45 },
    { time: '10:00', power: 120 },
    { time: '12:00', power: 180 },
    { time: '14:00', power: 165 },
    { time: '16:00', power: 95 },
    { time: '18:00', power: 25 },
    { time: '20:00', power: 0 }
  ]);

  // Simulate solar history updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSolarHistory(prev => {
        const newData = [...prev];
        // Shift data and add new point
        newData.shift();
        const now = new Date();
        const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const lastPower = prev[prev.length - 1].power;
        const newPower = Math.max(0, Math.min(200, lastPower + (Math.random() - 0.5) * 20));
        newData.push({ time: timeString, power: Math.round(newPower) });
        return newData;
      });
    }, 15000);

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

  const renderSolarGenerationChart = () => {
    const maxPower = Math.max(...solarHistory.map(d => d.power));
    const minPower = Math.min(...solarHistory.map(d => d.power));
    const range = maxPower - minPower || 1;

    return (
      <div className="w-full h-64 bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Solar Generation History</h3>
          <span className="text-xs text-gray-500 dark:text-gray-400">Today's profile</span>
        </div>
        <div className="relative h-48">
          {/* Grid lines */}
          <div className="absolute inset-0 flex flex-col justify-between">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="border-t border-gray-200 dark:border-gray-700"></div>
            ))}
          </div>
          
          {/* Chart area with gradient fill */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <linearGradient id="solarGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.1" />
              </linearGradient>
            </defs>
            
            {/* Area under curve */}
            <path
              d={`M 0,100 L ${solarHistory.map((d, i) => `${(i / (solarHistory.length - 1)) * 100},${100 - ((d.power - minPower) / range) * 80 - 10}`).join(' L ')} L 100,100 Z`}
              fill="url(#solarGradient)"
            />
            
            {/* Line */}
            <path
              d={`M ${solarHistory.map((d, i) => `${(i / (solarHistory.length - 1)) * 100},${100 - ((d.power - minPower) / range) * 80 - 10}`).join(' L ')}`}
              fill="none"
              stroke="#f59e0b"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          
          {/* Data points */}
          {solarHistory.map((d, i) => (
            <div
              key={i}
              className="absolute w-3 h-3 bg-amber-500 rounded-full border-2 border-white dark:border-gray-800"
              style={{
                left: `${(i / (solarHistory.length - 1)) * 100}%`,
                top: `${100 - ((d.power - minPower) / range) * 80 - 10}%`,
                transform: 'translate(-50%, -50%)'
              }}
            ></div>
          ))}
          
          {/* Y-axis labels */}
          <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500 dark:text-gray-400">
            <span>{Math.round(maxPower)} kW</span>
            <span>{Math.round((maxPower + minPower) / 2)} kW</span>
            <span>{Math.round(minPower)} kW</span>
          </div>
          
          {/* X-axis labels */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-500 dark:text-gray-400">
            {solarHistory.filter((_, i) => i % 2 === 0).map((d, i) => (
              <span key={i}>{d.time}</span>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderSourceContributionChart = () => {
    const contributions = [
      { source: 'Solar', percentage: 65, color: '#f59e0b' },
      { source: 'Grid', percentage: 25, color: '#3b82f6' },
      { source: 'Battery', percentage: 10, color: '#10b981' }
    ];

    return (
      <div className="w-full h-48 bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Source Contribution</h3>
          <span className="text-xs text-gray-500 dark:text-gray-400">Current mix</span>
        </div>
        <div className="relative h-32">
          {/* Pie chart */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-24 h-24">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                {contributions.reduce((acc, contribution, index) => {
                  const prevPercentage = acc.reduce((sum, c) => sum + c.percentage, 0);
                  const strokeDasharray = `${contribution.percentage} ${100 - contribution.percentage}`;
                  const strokeDashoffset = 100 - prevPercentage;
                  
                  acc.push(
                    <circle
                      key={index}
                      cx="18"
                      cy="18"
                      r="15.915"
                      fill="none"
                      stroke={contribution.color}
                      strokeWidth="3"
                      strokeDasharray={strokeDasharray}
                      strokeDashoffset={strokeDashoffset}
                    />
                  );
                  return acc;
                }, [] as JSX.Element[])}
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">100%</span>
              </div>
            </div>
          </div>
          
          {/* Legend */}
          <div className="absolute right-0 top-0 space-y-2">
            {contributions.map((contribution, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: contribution.color }}
                ></div>
                <span className="text-xs text-gray-600 dark:text-gray-400">
                  {contribution.source} ({contribution.percentage}%)
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
          <Sun className="w-6 h-6 mr-2 text-amber-500" />
          Solar Analytics
        </h2>
      </div>

      {/* Solar Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <motion.div variants={itemVariants}>
          <StatCard
            title="Current Solar Input"
            value={156.8}
            unit="kW"
            icon={Sun}
            change="+8.7%"
            changeType="positive"
          />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <StatCard
            title="Efficiency"
            value={92.8}
            unit="%"
            icon={TrendingUp}
            change="+0.3%"
            changeType="positive"
          />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <StatCard
            title="Source Contribution"
            value={65}
            unit="%"
            icon={PieChart}
            change="+2.1%"
            changeType="positive"
          />
        </motion.div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <motion.div variants={itemVariants}>
          {renderSolarGenerationChart()}
        </motion.div>
        
        <motion.div variants={itemVariants}>
          {renderSourceContributionChart()}
        </motion.div>
      </div>

      {/* Solar Performance Summary */}
      <motion.div variants={itemVariants} className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-amber-800 dark:text-amber-200">Solar Performance</h3>
            <p className="text-amber-600 dark:text-amber-400">Excellent generation conditions - Peak efficiency achieved</p>
          </div>
          <div className="text-right">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
              Optimal
            </span>
          </div>
        </div>
        
        <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
          <div>
            <span className="text-gray-500 dark:text-gray-400">Today's Total:</span>
            <p className="font-semibold text-gray-900 dark:text-white">1,247 kWh</p>
          </div>
          <div>
            <span className="text-gray-500 dark:text-gray-400">Peak Power:</span>
            <p className="font-semibold text-gray-900 dark:text-white">185 kW</p>
          </div>
          <div>
            <span className="text-gray-500 dark:text-gray-400">Avg Efficiency:</span>
            <p className="font-semibold text-gray-900 dark:text-white">91.2%</p>
          </div>
          <div>
            <span className="text-gray-500 dark:text-gray-400">CO₂ Saved:</span>
            <p className="font-semibold text-gray-900 dark:text-white">2.1 tons</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SolarCard;
