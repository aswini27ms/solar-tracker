import React from 'react';
import { motion } from 'framer-motion';
import ChartCard from '../ChartCard';
import StatCard from '../StatCard';
import { Zap, TrendingUp, Battery, Activity } from 'lucide-react';

interface OutputCardProps {
  data: Array<{ time: string; power: number }>;
}

const OutputCard: React.FC<OutputCardProps> = ({ data }) => {
  return (
    <div className="space-y-6">
      {/* Active Power Chart */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <ChartCard
          title="Active Power Output"
          subtitle="Real-time active power generation across all microgrids"
          data={data}
          type="line"
          dataKey="power"
          xAxisKey="time"
          color="#3b82f6"
        />
      </motion.div>

      {/* System Output Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Active Power */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <StatCard
            title="Active Power"
            value={245.8}
            unit="kW"
            icon={Zap}
            change="+2.3%"
            changeType="positive"
          />
        </motion.div>

        {/* Reactive Power */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <StatCard
            title="Reactive Power"
            value={45.2}
            unit="kVAR"
            icon={Activity}
            change="-1.1%"
            changeType="negative"
          />
        </motion.div>

        {/* Total Energy Generated */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <StatCard
            title="Total Energy Generated"
            value={1247.5}
            unit="kWh"
            icon={Battery}
            change="+15.8%"
            changeType="positive"
          />
        </motion.div>

        {/* Net Energy Export */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          <StatCard
            title="Net Energy Export"
            value={89.3}
            unit="kWh"
            icon={TrendingUp}
            change="+22.4%"
            changeType="positive"
          />
        </motion.div>
      </div>

      {/* Energy Flow Summary */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.0 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Energy Flow Summary</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">+156.8 kWh</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Generated Today</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">67.5 kWh</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Consumed Today</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">+89.3 kWh</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Exported to Grid</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default OutputCard;
