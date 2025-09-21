import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../contexts/ThemeContext";
import LottieAnimation from "./LottieAnimation";
import solar3Animation from "../assets/animations/solar3.json";

const Settings: React.FC = () => {
  const [autoSell, setAutoSell] = useState(false);
  const [priceThreshold, setPriceThreshold] = useState(5.0);
  const [notifyEmail, setNotifyEmail] = useState(true);
  const [notifySMS, setNotifySMS] = useState(false);
  const [notifyPush, setNotifyPush] = useState(true);
  const [alertFrequency, setAlertFrequency] = useState("immediate");
  const { isDark, toggleTheme } = useTheme();
  const [helpOpen, setHelpOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-orange-100 to-blue-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 sm:p-6 lg:p-8 flex flex-col items-center justify-center relative overflow-x-hidden">

      {/* Hero Section */}
      <div className="flex flex-col lg:flex-row items-center justify-between w-full max-w-7xl gap-12 mb-16">
        {/* Left Content */}
        <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left max-w-2xl">
          <motion.h1 
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-orange-700 dark:text-yellow-300 mb-6 drop-shadow-lg leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Settings & Personalization
          </motion.h1>
          <motion.p 
            className="text-lg sm:text-xl text-blue-800 dark:text-blue-200 mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Fine-tune your SolarTrack experience for maximum efficiency and comfort. Customize how your system interacts with the grid, set up your preferred notifications, and find answers to common questions.
          </motion.p>
          {/* Save All Settings button removed */}
        </div>

        {/* Right Animation Section */}
        <div className="flex-1 flex items-center justify-center max-w-lg w-full">
          {/* Main Solar Animation */}
          <motion.div 
            className="w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-white/70 dark:bg-gray-800/70 rounded-3xl shadow-xl backdrop-blur-sm border border-white/20 dark:border-gray-700/20 flex items-center justify-center overflow-hidden"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            whileHover={{ scale: 1.02 }}
          >
            <LottieAnimation 
              animationData={solar3Animation} 
              className="w-full h-full scale-110" 
            />
          </motion.div>
        </div>
      </div>

      {/* Settings Content Section */}
      <div className="w-full max-w-7xl mb-16">
        <div className="flex flex-col lg:flex-row items-start gap-12">
          {/* Left Side Settings Cards */}
          <div className="flex-1 space-y-8">
            {/* Grid Interaction Card */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 1.2 }}
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-yellow-200 via-orange-100 to-white dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 rounded-xl shadow-lg p-8 border border-yellow-100 dark:border-gray-800"
            >
              <div className="flex items-center mb-6">
                <span className="text-4xl mr-4">🔌</span>
                <h2 className="font-bold text-2xl text-orange-700 dark:text-yellow-300">Grid Interaction</h2>
              </div>
              <div className="space-y-6">
                <div className="flex items-start space-x-3 p-4 bg-white/60 dark:bg-gray-800/60 rounded-xl">
                  <input
                    type="checkbox"
                    id="autoSell"
                    checked={autoSell}
                    onChange={() => setAutoSell(!autoSell)}
                    className="mt-1 w-5 h-5 accent-orange-500 rounded"
                  />
                  <label htmlFor="autoSell" className="text-gray-700 dark:text-gray-200 leading-relaxed">
                    Allow <span className="font-semibold text-orange-600 dark:text-orange-400">auto-sell</span> excess energy to grid or neighbor microgrids
                  </label>
                </div>
                <div className="p-4 bg-white/60 dark:bg-gray-800/60 rounded-xl">
                  <label htmlFor="priceThreshold" className="block text-gray-700 dark:text-gray-200 mb-3 font-medium">
                    Price threshold (₹/kWh):
                  </label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="number"
                      id="priceThreshold"
                      value={priceThreshold}
                      min={0}
                      step={0.1}
                      onChange={e => setPriceThreshold(Number(e.target.value))}
                      className="flex-1 px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-400"
                    />
                    <span className="text-2xl">💸</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Notifications Card */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 1.4 }}
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-blue-100 via-white to-yellow-100 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 rounded-xl shadow-lg p-8 border border-blue-100 dark:border-gray-800"
            >
              <div className="flex items-center mb-6">
                <span className="text-4xl mr-4">🔔</span>
                <h2 className="font-bold text-2xl text-blue-700 dark:text-yellow-300">Notifications</h2>
              </div>
              <div className="space-y-6">
                <div className="space-y-4">
                  {[
                    { key: 'email', state: notifyEmail, setter: setNotifyEmail, label: 'Email Alerts', icon: '📧' },
                    { key: 'sms', state: notifySMS, setter: setNotifySMS, label: 'SMS Alerts', icon: '📱' },
                    { key: 'push', state: notifyPush, setter: setNotifyPush, label: 'Push Notifications', icon: '🔔' }
                  ].map(({ key, state, setter, label, icon }) => (
                    <label key={key} className="flex items-center space-x-3 p-3 bg-white/60 dark:bg-gray-800/60 rounded-xl cursor-pointer">
                      <input
                        type="checkbox"
                        checked={state}
                        onChange={() => setter(!state)}
                        className="w-5 h-5 accent-blue-500 rounded"
                      />
                      <span className="flex-1 text-gray-700 dark:text-gray-200">{label}</span>
                      <span className="text-xl">{icon}</span>
                    </label>
                  ))}
                </div>
                <div className="p-4 bg-white/60 dark:bg-gray-800/60 rounded-xl">
                  <label htmlFor="alertFrequency" className="block text-gray-700 dark:text-gray-200 mb-3 font-medium">
                    Alert Frequency:
                  </label>
                  <select
                    id="alertFrequency"
                    value={alertFrequency}
                    onChange={e => setAlertFrequency(e.target.value)}
                    className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-400"
                  >
                    <option value="immediate">Immediate ⏱️</option>
                    <option value="hourly">Hourly ⏰</option>
                    <option value="daily">Daily Summary 📅</option>
                  </select>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Side Content */}
          <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left">
            <motion.h2 
              className="text-3xl sm:text-4xl font-bold text-orange-700 dark:text-yellow-300 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.6 }}
            >
              Smart Configuration
            </motion.h2>
            <motion.p 
              className="text-lg text-blue-800 dark:text-blue-200 mb-6 leading-relaxed max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.8 }}
            >
              Your personalized settings help optimize energy production and consumption. Our intelligent system adapts to your preferences and provides real-time recommendations for better efficiency.
            </motion.p>
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-lg mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2.0 }}
            >
              <div className="flex items-center space-x-3 p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg backdrop-blur-sm">
                <span className="text-2xl">⚙️</span>
                <span className="text-gray-700 dark:text-gray-200 font-medium">Auto-Configuration</span>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg backdrop-blur-sm">
                <span className="text-2xl">🔄</span>
                <span className="text-gray-700 dark:text-gray-200 font-medium">Real-time Sync</span>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg backdrop-blur-sm">
                <span className="text-2xl">🛡️</span>
                <span className="text-gray-700 dark:text-gray-200 font-medium">Secure Settings</span>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg backdrop-blur-sm">
                <span className="text-2xl">📊</span>
                <span className="text-gray-700 dark:text-gray-200 font-medium">Performance Tracking</span>
              </div>
            </motion.div>

            {/* Help & Support Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2.2 }}
              whileHover={{ y: -5 }}
              className="bg-gradient-to-br from-orange-100 via-yellow-100 to-white dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 rounded-xl shadow-lg p-6 border border-orange-100 dark:border-gray-800 w-full"
            >
              <div className="flex items-center mb-4">
                <span className="text-3xl mr-3">❓</span>
                <h2 className="font-bold text-xl text-orange-700 dark:text-yellow-300">Help & FAQ</h2>
              </div>
              <p className="text-gray-700 dark:text-gray-200 mb-4 leading-relaxed">
                Need assistance? Explore our frequently asked questions or contact support for help with your solar dashboard.
              </p>
              <button
                onClick={() => setHelpOpen(!helpOpen)}
                className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg shadow text-sm font-semibold transition-colors mb-4"
              >
                {helpOpen ? 'Hide FAQ' : 'Show FAQ'}
              </button>
              {helpOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3 }}
                  className="space-y-2"
                >
                  {[
                    "How do I change my notification preferences?",
                    "How does auto-sell to the grid work?",
                    "How do I update my settings?",
                    "Who do I contact for technical support?"
                  ].map((question, index) => (
                    <div key={index} className="text-sm text-gray-600 dark:text-gray-300 p-2 bg-white/50 dark:bg-gray-700/50 rounded">
                      • {question}
                    </div>
                  ))}
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;