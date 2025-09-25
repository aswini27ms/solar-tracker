import React from "react";
import { motion } from "framer-motion";
import { useUser } from "../../contexts/UserContext";
import LottieAnimation from "../LottieAnimation";
import solarAnimation from "../../assets/animations/solar.json";
import solar1Animation from "../../assets/animations/solar1.json";

interface HomeProps {
  setActiveTab: (tab: string) => void;
}

const Home: React.FC<HomeProps> = ({ setActiveTab }) => {
  const { user } = useUser();

  return (
  <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-orange-100 to-blue-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 sm:p-6 lg:p-8 flex flex-col items-center justify-center relative overflow-x-hidden w-full">


      {/* Hero Section */}
  <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-7xl gap-8 md:gap-12 mb-8 md:mb-16">
        {/* Left Content */}
  <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left max-w-2xl w-full">
          <motion.h1 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-orange-700 dark:text-yellow-100 mb-6 drop-shadow-lg leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Welcome to SolarTrack
          </motion.h1>
          <motion.p 
            className="text-base sm:text-lg md:text-xl text-blue-800 dark:text-blue-200 mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Your all-in-one platform to monitor, analyze, and optimize your solar energy system. Harness the power of the sun with real-time insights and smart analytics.
          </motion.p>
          {user && (
            <motion.div 
              className="flex justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <button 
                onClick={() => setActiveTab('dashboard')}
                className="px-8 py-3 bg-gradient-to-r from-orange-500 to-yellow-400 hover:from-orange-600 hover:to-yellow-500 text-white rounded-lg shadow-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105"
              >
                Go to Dashboard
              </button>
            </motion.div>
          )}
          
          {!user && (
            <motion.div 
              className="flex justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <button 
                onClick={() => setActiveTab('login')}
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-400 hover:from-blue-600 hover:to-purple-500 text-white rounded-lg shadow-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105"
              >
                Get Started
              </button>
            </motion.div>
          )}
        </div>

        {/* Right Animation Section */}
  <div className="flex-1 flex items-center justify-center max-w-lg w-full mt-8 md:mt-0">
          {/* Main Solar Animation */}
          <motion.div 
            className="w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-white/70 dark:bg-gray-700/70 rounded-3xl shadow-xl backdrop-blur-sm border border-white/20 dark:border-gray-600/20 flex items-center justify-center overflow-hidden"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            whileHover={{ scale: 1.02 }}
          >
            <LottieAnimation 
              animationData={solarAnimation} 
              className="w-full h-full scale-110" 
            />
          </motion.div>
        </div>
      </div>

      {/* Additional Content Section */}
      <div className="w-full max-w-7xl mb-8 md:mb-16">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 w-full">
          {/* Left Side with Secondary Lottie */}
          <div className="flex-1 flex justify-center md:justify-start w-full">
            <motion.div 
              className="w-56 h-56 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[420px] lg:h-[420px]"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 1.2 }}
              whileHover={{ scale: 1.05 }}
            >
              <LottieAnimation 
                animationData={solar1Animation} 
                className="w-full h-full" 
              />
            </motion.div>
          </div>

          {/* Right Side with Content */}
          <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left">
            <motion.h2 
              className="text-3xl sm:text-4xl font-bold text-orange-700 dark:text-yellow-100 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4 }}
            >
              Maximize Your Solar Potential
            </motion.h2>
            <motion.p 
              className="text-lg text-blue-800 dark:text-blue-200 mb-6 leading-relaxed max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.6 }}
            >
              Experience cutting-edge solar monitoring technology that adapts to your needs. Our intelligent system learns from your usage patterns and provides personalized recommendations to optimize your energy efficiency.
            </motion.p>
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.8 }}
            >
              <div className="flex items-center space-x-3 p-4 bg-white/50 dark:bg-gray-700/50 rounded-lg backdrop-blur-sm">
                <span className="text-2xl">🔋</span>
                <span className="text-gray-700 dark:text-gray-300 font-medium">Energy Storage</span>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-white/50 dark:bg-gray-700/50 rounded-lg backdrop-blur-sm">
                <span className="text-2xl">🌱</span>
                <span className="text-gray-700 dark:text-gray-300 font-medium">Eco-Friendly</span>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-white/50 dark:bg-gray-700/50 rounded-lg backdrop-blur-sm">
                <span className="text-2xl">💰</span>
                <span className="text-gray-700 dark:text-gray-300 font-medium">Cost Savings</span>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-white/50 dark:bg-gray-700/50 rounded-lg backdrop-blur-sm">
                <span className="text-2xl">📱</span>
                <span className="text-gray-700 dark:text-gray-300 font-medium">Mobile Ready</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <motion.div 
          className="bg-gradient-to-br from-yellow-200 via-orange-100 to-white dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 rounded-xl shadow-lg p-6 flex flex-col items-center border border-yellow-100 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300"
          whileHover={{ y: -5 }}
        >
          <span className="text-4xl mb-4 animate-bounce">🌞</span>
          <h2 className="font-bold text-xl mb-3 text-orange-700 dark:text-yellow-100">Live Monitoring</h2>
          <p className="text-gray-700 dark:text-gray-300 text-center leading-relaxed">Track your solar panel output and system status in real time, anytime, anywhere.</p>
        </motion.div>

        <motion.div 
          className="bg-gradient-to-br from-blue-100 via-white to-yellow-100 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 rounded-xl shadow-lg p-6 flex flex-col items-center border border-blue-100 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
          whileHover={{ y: -5 }}
          onClick={() => setActiveTab('analytics')}
        >
          <span className="text-4xl mb-4 animate-pulse">📊</span>
          <h2 className="font-bold text-xl mb-3 text-blue-700 dark:text-yellow-100">Advanced Analytics</h2>
          <p className="text-gray-700 dark:text-gray-300 text-center leading-relaxed">Visualize energy production, consumption, and savings with interactive charts and reports.</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors text-sm"
          >
            Explore Analytics
          </motion.button>
        </motion.div>

        <motion.div 
          className="bg-gradient-to-br from-orange-100 via-yellow-100 to-white dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 rounded-xl shadow-lg p-6 flex flex-col items-center border border-orange-100 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300"
          whileHover={{ y: -5 }}
        >
          <span className="text-4xl mb-4 animate-bounce">⚡</span>
          <h2 className="font-bold text-xl mb-3 text-orange-700 dark:text-yellow-100">Smart Alerts</h2>
          <p className="text-gray-700 dark:text-gray-300 text-center leading-relaxed">Get instant notifications for system issues, maintenance reminders, and performance tips.</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Home;