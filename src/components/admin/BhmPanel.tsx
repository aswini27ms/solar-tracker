import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Battery, Heart, Thermometer, Zap, Activity } from 'lucide-react';
import StatCard from '../StatCard';
import { useTranslation } from 'react-i18next';

const BhmPanel = () => {
  const { t } = useTranslation();
  const [socData, setSocData] = useState([
    { time: '00:00', soc: 65 },
    { time: '04:00', soc: 62 },
    { time: '08:00', soc: 58 },
    { time: '12:00', soc: 72 },
    { time: '16:00', soc: 78 },
    { time: '20:00', soc: 75 },
    { time: '24:00', soc: 70 }
  ]);

  // Simulate SoC data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSocData(prev => {
        const newData = [...prev.slice(1)];
        const now = new Date();
        const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const newSoc = Math.max(20, Math.min(95, prev[prev.length - 1].soc + (Math.random() - 0.5) * 5));
        newData.push({ time: timeString, soc: Math.round(newSoc * 10) / 10 });
        return newData;
      });
    }, 10000);

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

  const renderSoCTrendChart = () => {
    const maxSoc = Math.max(...socData.map(d => d.soc));
    const minSoc = Math.min(...socData.map(d => d.soc));
    const range = maxSoc - minSoc || 1;

    return (
      <div className="w-full h-48 bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">{t('bhm.socTrend')}</h3>
          <span className="text-xs text-gray-500 dark:text-gray-400">{t('bhm.last24Hours')}</span>
        </div>
        <div className="relative h-32">
          {/* Grid lines */}
          <div className="absolute inset-0 flex flex-col justify-between">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="border-t border-gray-200 dark:border-gray-700"></div>
            ))}
          </div>
          
          {/* Chart line */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path
              d={`M ${socData.map((d, i) => `${(i / (socData.length - 1)) * 100},${100 - ((d.soc - minSoc) / range) * 80 - 10}`).join(' L ')}`}
              fill="none"
              stroke="#3b82f6"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Fill area under curve */}
            <path
              d={`M ${socData.map((d, i) => `${(i / (socData.length - 1)) * 100},${100 - ((d.soc - minSoc) / range) * 80 - 10}`).join(' L ')} L 100,100 L 0,100 Z`}
              fill="url(#gradient)"
              opacity="0.3"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
          
          {/* Data points */}
          {socData.map((d, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-blue-500 rounded-full border border-white dark:border-gray-800"
              style={{
                left: `${(i / (socData.length - 1)) * 100}%`,
                top: `${100 - ((d.soc - minSoc) / range) * 80 - 10}%`,
                transform: 'translate(-50%, -50%)'
              }}
            ></div>
          ))}
          
          {/* Y-axis labels */}
          <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500 dark:text-gray-400">
            <span>{Math.round(maxSoc)}%</span>
            <span>{Math.round((maxSoc + minSoc) / 2)}%</span>
            <span>{Math.round(minSoc)}%</span>
          </div>
          
          {/* X-axis labels */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-500 dark:text-gray-400">
            {socData.filter((_, i) => i % 2 === 0).map((d, i) => (
              <span key={i}>{d.time}</span>
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
          <Battery className="w-6 h-6 mr-2 text-blue-500" />
          {t('bhm.title')}
        </h2>
      </div>

      {/* Battery Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div variants={itemVariants} className="h-full">
          <StatCard
            title={t('bhm.stateOfCharge')}
            value={72.5}
            unit={t('bhm.units.percent')}
            icon={Battery}
            change="-2.1%"
            changeType="negative"
          />
        </motion.div>
        
        <motion.div variants={itemVariants} className="h-full">
          <StatCard
            title={t('bhm.stateOfHealth')}
            value={94.2}
            unit={t('bhm.units.percent')}
            icon={Heart}
            change="+0.3%"
            changeType="positive"
          />
        </motion.div>
        
        <motion.div variants={itemVariants} className="h-full">
          <StatCard
            title={t('bhm.temperature')}
            value={28.5}
            unit={t('bhm.units.celsius')}
            icon={Thermometer}
            change="+1.2%"
            changeType="positive"
          />
        </motion.div>
        
        <motion.div variants={itemVariants} className="h-full">
          <StatCard
            title={t('bhm.cycles')}
            value={1247}
            unit=""
            icon={Activity}
            change="+1"
            changeType="neutral"
          />
        </motion.div>
      </div>

      {/* SoC Trend Chart */}
      <motion.div variants={itemVariants} className="mb-8">
        {renderSoCTrendChart()}
      </motion.div>

      {/* Charge/Discharge Rates */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <motion.div variants={itemVariants} className="h-full">
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-green-800 dark:text-green-200">{t('bhm.chargeRate')}</h3>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">45.8 {t('bhm.units.kw')}</p>
                <p className="text-sm text-green-600 dark:text-green-400">{t('bhm.chargeChange')}</p>
              </div>
              <Zap className="w-8 h-8 text-green-500" />
            </div>
          </div>
        </motion.div>
        
        <motion.div variants={itemVariants} className="h-full">
          <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 border border-red-200 dark:border-red-800">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-red-800 dark:text-red-200">{t('bhm.dischargeRate')}</h3>
                <p className="text-2xl font-bold text-red-600 dark:text-red-400">32.4 {t('bhm.units.kw')}</p>
                <p className="text-sm text-red-600 dark:text-red-400">{t('bhm.dischargeChange')}</p>
              </div>
              <Zap className="w-8 h-8 text-red-500" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Battery Status Summary */}
      <motion.div variants={itemVariants} className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200">{t('bhm.batteryStatus')}</h3>
            <p className="text-blue-600 dark:text-blue-400">{t('bhm.batteryStatusDesc')}</p>
          </div>
          <div className="text-right">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
              {t('bhm.healthy')}
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default BhmPanel;
