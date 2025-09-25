import { motion } from 'framer-motion';
import { Zap, Battery, Gauge, Activity, TrendingUp, Cpu } from 'lucide-react';
import StatCard from '../StatCard';

const KPICards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Grid Voltage */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <StatCard
          title="Grid Voltage"
          value={230.5}
          unit="V"
          icon={Zap}
          change="+0.5%"
          changeType="positive"
        />
      </motion.div>
      
      {/* Grid Current */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <StatCard
          title="Grid Current"
          value={45.2}
          unit="A"
          icon={Activity}
          change="+1.2%"
          changeType="positive"
        />
      </motion.div>
      
      {/* Grid Frequency */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <StatCard
          title="Grid Frequency"
          value={50.0}
          unit="Hz"
          icon={TrendingUp}
          change="0.0%"
          changeType="neutral"
        />
      </motion.div>
      
      {/* Solar PV Generation */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <StatCard
          title="Solar PV Generation"
          value={156.8}
          unit="kW"
          icon={Zap}
          change="+8.7%"
          changeType="positive"
        />
      </motion.div>
      
      {/* Battery SOC */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <StatCard
          title="Battery SOC"
          value={72.5}
          unit="%"
          icon={Battery}
          change="-2.1%"
          changeType="negative"
        />
      </motion.div>
      
      {/* Load Demand */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <StatCard
          title="Load Demand"
          value={189.3}
          unit="kW"
          icon={Cpu}
          change="+3.4%"
          changeType="positive"
        />
      </motion.div>
      
      {/* Efficiency */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        <StatCard
          title="Efficiency"
          value={92.8}
          unit="%"
          icon={Gauge}
          change="+0.3%"
          changeType="positive"
        />
      </motion.div>
      
      {/* Power Factor */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <StatCard
          title="Power Factor"
          value={0.95}
          unit=""
          icon={TrendingUp}
          change="+0.01"
          changeType="positive"
        />
      </motion.div>
    </div>
  );
};

export default KPICards;
