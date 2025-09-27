import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import BhmPanel from './BhmPanel';
import SolarCard from './SolarCard';
import { mockSolarData, generateLiveData } from '../../data/mockData';

const Analytics = () => {
  const { t } = useTranslation();
  const [liveData, setLiveData] = useState(mockSolarData.liveData);
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  // Simulate live data updates
  useEffect(() => {
    const interval = setInterval(() => {
      const newPower = generateLiveData();
      
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
            {t('analytics.title')}
          </h1>
          <p className="text-blue-800 dark:text-blue-200">
            {t('analytics.subtitle')}
          </p>
        </motion.div>

        {/* Period Selector */}
        <motion.div variants={itemVariants} className="mb-8 flex gap-3 flex-wrap">
          {['day', 'week', 'month', 'year'].map(period => (
            <motion.button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              aria-pressed={selectedPeriod === period}
              className={`px-5 py-2 rounded-full transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400/50 ${
                selectedPeriod === period
                  ? 'bg-orange-500 text-white shadow-md ring-1 ring-orange-300/40 dark:ring-orange-300/20'
                  : 'bg-white text-gray-700 border border-gray-200 hover:bg-orange-50 hover:text-orange-600 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-700/60 dark:hover:text-orange-300'
              }`}
            >
              {t(`analytics.periods.${period}`)}
            </motion.button>
          ))}
        </motion.div>

        {/* Stats Cards */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
            <h3 className="text-gray-600 dark:text-gray-400 text-sm mb-2">{t('analytics.cards.totalEnergy')}</h3>
            <div className="flex items-baseline">
              <span className="text-3xl font-bold text-gray-900 dark:text-white">{t('analytics.stats.totalEnergyValue')}</span>
              <span className="ml-2 text-gray-700 dark:text-gray-300">{t('analytics.units.mwh')}</span>
            </div>
            <div className="text-green-500 text-sm mt-2">{t('analytics.stats.totalEnergyChange')}</div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
            <h3 className="text-gray-600 dark:text-gray-400 text-sm mb-2">{t('analytics.cards.avgEfficiency')}</h3>
            <div className="flex items-baseline">
              <span className="text-3xl font-bold text-gray-900 dark:text-white">{t('analytics.stats.avgEfficiencyValue')}</span>
              <span className="ml-2 text-gray-700 dark:text-gray-300">{t('analytics.units.percent')}</span>
            </div>
            <div className="text-green-500 text-sm mt-2">{t('analytics.stats.avgEfficiencyChange')}</div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
            <h3 className="text-gray-600 dark:text-gray-400 text-sm mb-2">{t('analytics.cards.co2Avoided')}</h3>
            <div className="flex items-baseline">
              <span className="text-3xl font-bold text-gray-900 dark:text-white">{t('analytics.stats.co2AvoidedValue')}</span>
              <span className="ml-2 text-gray-700 dark:text-gray-300">{t('analytics.units.tons')}</span>
            </div>
            <div className="text-green-500 text-sm mt-2">{t('analytics.stats.co2AvoidedChange')}</div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
            <h3 className="text-gray-600 dark:text-gray-400 text-sm mb-2">{t('analytics.cards.costSavings')}</h3>
            <div className="flex items-baseline">
              <span className="text-3xl font-bold text-gray-900 dark:text-white">{t('analytics.units.currency')}{t('analytics.stats.costSavingsValue')}</span>
            </div>
            <div className="text-green-500 text-sm mt-2">{t('analytics.stats.costSavingsChange')}</div>
          </div>
        </motion.div>

        {/* Charts */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
            <h3 className="text-gray-600 dark:text-gray-400 text-lg mb-4">{t('analytics.charts.monthlyEnergy')}</h3>
            <p className="text-sm text-gray-500 mb-4">{t('analytics.charts.monthlySubtitle')}</p>
            <SolarCard data={liveData} />
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
            <h3 className="text-gray-600 dark:text-gray-400 text-lg mb-4">{t('analytics.charts.efficiencyTrend')}</h3>
            <p className="text-sm text-gray-500 mb-4">{t('analytics.charts.efficiencySubtitle')}</p>
            <BhmPanel />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Analytics;
