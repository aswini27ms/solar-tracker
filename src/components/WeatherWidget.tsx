import React from 'react';
import { motion } from 'framer-motion';
import { Cloud, Sun, Wind, Droplets } from 'lucide-react';

interface WeatherData {
  current: {
    condition: string;
    temperature: number;
    humidity: number;
    windSpeed: number;
  };
  forecast: Array<{
    day: string;
    condition: string;
    high: number;
    low: number;
    icon: string;
  }>;
}

interface WeatherWidgetProps {
  weather: WeatherData;
  delay?: number;
}

const WeatherWidget: React.FC<WeatherWidgetProps> = ({ weather, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700"
    >
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
        Weather Forecast
      </h3>

      {/* Current Weather */}
      <motion.div 
        className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl"
        whileHover={{ scale: 1.02 }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Sun className="w-8 h-8 text-yellow-500" />
            <div>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                {weather.current.temperature}°C
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {weather.current.condition}
              </p>
            </div>
          </div>
          
          <div className="text-right">
            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mb-1">
              <Droplets className="w-4 h-4" />
              <span>{weather.current.humidity}%</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
              <Wind className="w-4 h-4" />
              <span>{weather.current.windSpeed} km/h</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Forecast */}
      <div className="space-y-3">
        {weather.forecast.map((day, index) => (
          <motion.div
            key={day.day}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: delay + 0.1 * index }}
            className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{day.icon}</span>
              <div>
                <p className="font-medium text-gray-900 dark:text-white text-sm">
                  {day.day}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {day.condition}
                </p>
              </div>
            </div>
            
            <div className="text-right">
              <p className="font-semibold text-gray-900 dark:text-white text-sm">
                {day.high}°
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {day.low}°
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default WeatherWidget;