import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Info, CheckCircle, Clock } from 'lucide-react';

interface Alert {
  id: number;
  type: 'warning' | 'info' | 'success' | 'error';
  message: string;
  timestamp: string;
  severity: 'low' | 'medium' | 'high';
}

interface AlertsPanelProps {
  alerts: Alert[];
  delay?: number;
}

const AlertsPanel: React.FC<AlertsPanelProps> = ({ alerts, delay = 0 }) => {
  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return AlertTriangle;
      case 'info':
        return Info;
      case 'success':
        return CheckCircle;
      default:
        return AlertTriangle;
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'warning':
        return 'text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20';
      case 'info':
        return 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20';
      case 'success':
        return 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20';
      case 'error':
        return 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20';
      default:
        return 'text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/20';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          System Alerts
        </h3>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="text-sm text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 font-medium"
        >
          View All
        </motion.button>
      </div>

      <div className="space-y-4">
        {alerts.map((alert, index) => {
          const IconComponent = getAlertIcon(alert.type);
          return (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: delay + 0.1 * index, duration: 0.3 }}
              whileHover={{ scale: 1.02 }}
              className="flex items-start space-x-3 p-4 rounded-xl border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all duration-200"
            >
              <div className={`p-2 rounded-lg ${getAlertColor(alert.type)}`}>
                <IconComponent className="w-4 h-4" />
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                  {alert.message}
                </p>
                <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                  <Clock className="w-3 h-3" />
                  <span>{alert.timestamp}</span>
                </div>
              </div>

              <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                alert.severity === 'high' 
                  ? 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400'
                  : alert.severity === 'medium'
                  ? 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
              }`}>
                {alert.severity}
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default AlertsPanel;