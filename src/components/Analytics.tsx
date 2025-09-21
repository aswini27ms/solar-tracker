import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, TrendingUp, BarChart3, PieChart } from 'lucide-react';
import ChartCard from './ChartCard';
import { mockSolarData } from '../data/mockData';

const Analytics: React.FC = () => {
  const monthlyData = [
    { month: 'Jan', energy: 890, efficiency: 88.5 },
    { month: 'Feb', energy: 950, efficiency: 89.2 },
    { month: 'Mar', energy: 1120, efficiency: 91.8 },
    { month: 'Apr', energy: 1280, efficiency: 93.4 },
    { month: 'May', energy: 1450, efficiency: 94.1 },
    { month: 'Jun', energy: 1520, efficiency: 94.7 },
    { month: 'Jul', energy: 1480, efficiency: 94.2 },
    { month: 'Aug', energy: 1420, efficiency: 93.8 },
    { month: 'Sep', energy: 1350, efficiency: 92.9 },
    { month: 'Oct', energy: 1180, efficiency: 91.5 },
    { month: 'Nov', energy: 980, efficiency: 89.8 },
    { month: 'Dec', energy: 850, efficiency: 88.1 }
  ];

  const yearlyStats = [
    { metric: 'Total Energy Generated', value: '14.47', unit: 'MWh', change: '+15.2%' },
    { metric: 'Average Efficiency', value: '92.1', unit: '%', change: '+3.4%' },
    { metric: 'CO₂ Avoided', value: '8.6', unit: 'tons', change: '+18.7%' },
    { metric: 'Cost Savings', value: '$3,240', unit: '', change: '+22.1%' }
  ];

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
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Analytics & Reports
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Detailed analysis of your solar system performance
          </p>
        </motion.div>

        {/* Time Period Selector */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap gap-3 mb-8"
        >
          {['Day', 'Week', 'Month', 'Year'].map((period) => (
            <motion.button
              key={period}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-orange-50 dark:hover:bg-orange-900/20 hover:text-orange-600 dark:hover:text-orange-400 hover:border-orange-200 dark:hover:border-orange-800 transition-all"
            >
              {period}
            </motion.button>
          ))}
        </motion.div>

        {/* Yearly Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {yearlyStats.map((stat, index) => (
            <motion.div
              key={stat.metric}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700"
            >
              <h3 className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-1">
                {stat.metric}
              </h3>
              <div className="flex items-baseline space-x-2 mb-2">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </span>
                <span className="text-lg text-gray-500 dark:text-gray-400 font-medium">
                  {stat.unit}
                </span>
              </div>
              <span className="text-sm font-medium text-green-600 dark:text-green-400">
                {stat.change}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <ChartCard
            title="Monthly Energy Production"
            subtitle="Energy generation over the past 12 months"
            data={monthlyData}
            type="bar"
            dataKey="energy"
            xAxisKey="month"
            color="#f97316"
            delay={0.6}
          />
          
          <ChartCard
            title="Efficiency Trend"
            subtitle="System efficiency over time"
            data={monthlyData}
            type="line"
            dataKey="efficiency"
            xAxisKey="month"
            color="#22c55e"
            delay={0.7}
          />
        </div>

        {/* Additional Analytics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700"
        >
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Performance Insights
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Key Findings
              </h4>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <p className="text-gray-600 dark:text-gray-400">
                    Peak performance achieved during summer months (June-August)
                  </p>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <p className="text-gray-600 dark:text-gray-400">
                    System efficiency has improved by 3.4% compared to last year
                  </p>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  <p className="text-gray-600 dark:text-gray-400">
                    Optimal maintenance window: March and September
                  </p>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Recommendations
              </h4>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                  <p className="text-gray-600 dark:text-gray-400">
                    Consider panel cleaning before peak season
                  </p>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                  <p className="text-gray-600 dark:text-gray-400">
                    Monitor Panel 3 performance closely
                  </p>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                  <p className="text-gray-600 dark:text-gray-400">
                    Schedule inverter inspection next quarter
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Analytics;