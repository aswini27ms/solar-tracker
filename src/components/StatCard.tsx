import React from 'react';
import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  unit: string;
  icon: LucideIcon;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  delay?: number;
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  unit, 
  icon: Icon, 
  change, 
  changeType = 'neutral',
  delay = 0 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
      className="bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-5 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 h-full flex flex-col"
    >
      <div className="flex items-center justify-between mb-3 min-h-[44px]">
        <div className="p-2.5 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl">
          <Icon className="w-6 h-6 text-white" />
        </div>
        {change && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: delay + 0.2 }}
            className={`text-sm font-medium ${
              changeType === 'positive'
                ? 'text-green-600 dark:text-green-400'
                : changeType === 'negative'
                ? 'text-red-600 dark:text-red-400'
                : 'text-gray-600 dark:text-gray-400'
            }`}
          >
            {change}
          </motion.span>
        )}
      </div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay + 0.3 }}
        className="flex flex-col flex-1"
      >
        <h3 className="text-gray-600 dark:text-gray-400 text-xs font-medium leading-snug break-words min-h-[28px]">
          {title}
        </h3>
        <div className="mt-auto flex items-baseline space-x-2">
          <span className="text-2xl font-bold text-gray-900 dark:text-white tabular-nums tracking-tight">
            {typeof value === 'number' ? value.toFixed(1) : value}
          </span>
          <span className="text-base text-gray-500 dark:text-gray-400 font-medium min-w-[38px] text-left">
            {unit || '\u00A0'}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default StatCard;