import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import BhmPanel from './BhmPanel';
import SolarCard from './SolarCard';
import { mockSolarData, generateLiveData } from '../../data/mockData';

const Analytics = () => {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-orange-100 to-blue-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 sm:p-6 lg:p-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto"
      >
        <motion.div variants={itemVariants} className="mb-8">
          <h1 className="text-3xl font-bold text-orange-700 dark:text-yellow-100 mb-2">
            Analytics Dashboard
          </h1>
          <p className="text-blue-800 dark:text-blue-200">
            Detailed battery and solar system analytics
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="mb-8">
          <BhmPanel />
        </motion.div>

        <motion.div variants={itemVariants} className="mb-8">
          <SolarCard data={liveData} />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Analytics;
