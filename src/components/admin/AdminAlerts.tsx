import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTelemetry } from '../../contexts/TelemetryContext';
import { AlertTriangle, CheckCircle, Info, X, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const AdminAlerts: React.FC = () => {
  const { t } = useTranslation();
  const { alerts, acknowledgeAlert, acknowledgeAllAlerts } = useTelemetry();
  const [filter, setFilter] = useState<'all' | 'critical' | 'warning' | 'info'>('all');

  // Count alerts by severity
  const criticalCount = alerts.filter(alert => alert.severity === 'critical').length;
  const warningCount = alerts.filter(alert => alert.severity === 'warning').length;
  const infoCount = alerts.filter(alert => alert.severity === 'info').length;

  // Filter alerts based on selected filter
  const filteredAlerts = filter === 'all' 
    ? alerts 
    : alerts.filter(alert => alert.severity === filter);

  // Get alert icon and color based on severity
  const getAlertConfig = (severity: string) => {
    switch (severity) {
      case 'critical':
        return {
          icon: AlertTriangle,
          bgColor: 'bg-red-50 dark:bg-red-900/20',
          borderColor: 'border-red-200 dark:border-red-800',
          textColor: 'text-red-700 dark:text-red-300',
          iconColor: 'text-red-500',
          badgeColor: 'bg-red-500'
        };
      case 'warning':
        return {
          icon: AlertTriangle,
          bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
          borderColor: 'border-yellow-200 dark:border-yellow-800',
          textColor: 'text-yellow-700 dark:text-yellow-300',
          iconColor: 'text-yellow-500',
          badgeColor: 'bg-yellow-500'
        };
      case 'info':
        return {
          icon: Info,
          bgColor: 'bg-blue-50 dark:bg-blue-900/20',
          borderColor: 'border-blue-200 dark:border-blue-800',
          textColor: 'text-blue-700 dark:text-blue-300',
          iconColor: 'text-blue-500',
          badgeColor: 'bg-blue-500'
        };
      default:
        return {
          icon: Info,
          bgColor: 'bg-gray-50 dark:bg-gray-800',
          borderColor: 'border-gray-200 dark:border-gray-700',
          textColor: 'text-gray-700 dark:text-gray-300',
          iconColor: 'text-gray-500',
          badgeColor: 'bg-gray-500'
        };
    }
  };

  // Format timestamp
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.3 } }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-orange-100 to-blue-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 sm:p-6 lg:p-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="mb-8">
          <h1 className="text-3xl font-bold text-orange-700 dark:text-yellow-100 mb-2">
            {t('admin_alerts_title')}
          </h1>
          <p className="text-blue-800 dark:text-blue-200">
            {t('admin_alerts_subtitle')}
          </p>
        </motion.div>

        {/* Alert Summary Panel */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Critical Alerts Card */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-red-600 dark:text-red-400 text-sm font-medium">
                    {t('admin_alerts_critical')}
                  </p>
                  <p className="text-3xl font-bold text-red-700 dark:text-red-300">
                    {criticalCount}
                  </p>
                </div>
                <AlertTriangle className="w-8 h-8 text-red-500" />
              </div>
            </motion.div>

            {/* Warning Alerts Card */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-600 dark:text-yellow-400 text-sm font-medium">
                    {t('admin_alerts_warning')}
                  </p>
                  <p className="text-3xl font-bold text-yellow-700 dark:text-yellow-300">
                    {warningCount}
                  </p>
                </div>
                <AlertTriangle className="w-8 h-8 text-yellow-500" />
              </div>
            </motion.div>

            {/* Info Alerts Card */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-600 dark:text-blue-400 text-sm font-medium">
                    {t('admin_alerts_info')}
                  </p>
                  <p className="text-3xl font-bold text-blue-700 dark:text-blue-300">
                    {infoCount}
                  </p>
                </div>
                <Info className="w-8 h-8 text-blue-500" />
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div variants={itemVariants} className="mb-6">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'all'
                  ? 'bg-orange-500 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              {t('admin_alerts_all')} ({alerts.length})
            </button>
            <button
              onClick={() => setFilter('critical')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'critical'
                  ? 'bg-red-500 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              {t('admin_alerts_critical')} ({criticalCount})
            </button>
            <button
              onClick={() => setFilter('warning')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'warning'
                  ? 'bg-yellow-500 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              {t('admin_alerts_warning')} ({warningCount})
            </button>
            <button
              onClick={() => setFilter('info')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'info'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              {t('admin_alerts_info')} ({infoCount})
            </button>
          </div>
        </motion.div>

        {/* Alert List Feed */}
        <motion.div variants={itemVariants} className="space-y-4">
          <AnimatePresence>
            {filteredAlerts.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-12"
              >
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  {t('admin_alerts_none')}
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  {t('admin_alerts_all_normal')}
                </p>
              </motion.div>
            ) : (
              filteredAlerts.map((alert) => {
                const config = getAlertConfig(alert.severity);
                const IconComponent = config.icon;
                
                return (
                  <motion.div
                    key={alert.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    whileHover={{ scale: 1.01 }}
                    className={`${config.bgColor} ${config.borderColor} border rounded-lg p-4`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3 flex-1">
                        <IconComponent className={`w-6 h-6 ${config.iconColor} mt-0.5`} />
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className={`inline-block w-2 h-2 ${config.badgeColor} rounded-full`}></span>
                            <span className={`text-sm font-medium ${config.textColor} capitalize`}>
                              {t(`alert_severity_${alert.severity}`)}
                            </span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              • {t(`alert_category_${alert.category}`)}
                            </span>
                          </div>
                          <p className={`text-gray-800 dark:text-gray-200 mb-2`}>
                            {t(`alert_message_${alert.message}`, alert.message)}
                          </p>
                          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                            <Clock className="w-3 h-3 mr-1" />
                            {formatTime(alert.timestamp)}
                          </div>
                        </div>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => acknowledgeAlert(alert.id)}
                        className="ml-4 p-1 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                      >
                        <X className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                      </motion.button>
                    </div>
                  </motion.div>
                );
              })
            )}
          </AnimatePresence>
        </motion.div>

        {/* Quick Actions */}
        {alerts.length > 0 && (
          <motion.div 
            variants={itemVariants}
            className="mt-8 text-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={acknowledgeAllAlerts}
              className="px-6 py-3 bg-gradient-to-r from-orange-500 to-yellow-400 hover:from-orange-600 hover:to-yellow-500 text-white rounded-lg font-medium transition-all duration-300 shadow-lg"
            >
              {t('admin_alerts_ack_all')}
            </motion.button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default AdminAlerts;
