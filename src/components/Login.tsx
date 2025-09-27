import React, { useState } from "react";
import { motion } from "framer-motion";
import { User, Shield, ArrowRight } from "lucide-react";
import LottieAnimation from "./LottieAnimation";
import loginAnimation from "../assets/animations/login.json";
import UserLogin from "./UserLogin";
import AdminLogin from "./AdminLogin";
import { useTranslation } from "react-i18next";

interface LoginProps {
  setActiveTab: (tab: string) => void;
}

const Login: React.FC<LoginProps> = ({ setActiveTab }) => {
  const [selectedRole, setSelectedRole] = useState<'user' | 'admin' | null>(null);

  const { t } = useTranslation();


  // If a role is selected, render the appropriate login component
  if (selectedRole === 'user') {
    return <UserLogin setActiveTab={setActiveTab} onBackToRoleSelection={() => setSelectedRole(null)} />;
  }

  if (selectedRole === 'admin') {
    return <AdminLogin setActiveTab={setActiveTab} onBackToRoleSelection={() => setSelectedRole(null)} />;
  }

  // Role selection screen
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-orange-100 to-blue-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 sm:p-6 lg:p-8 flex flex-col items-center justify-center relative overflow-hidden">
      
      {/* Background Decorative Elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-yellow-300/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-orange-300/20 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-blue-300/20 rounded-full blur-2xl"></div>

      {/* Main Content */}
      <motion.div 
        className="w-full max-w-4xl z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          
          {/* Left Side - Animation & Welcome */}
          <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left max-w-2xl">
            <motion.div 
              className="w-80 h-80 sm:w-96 sm:h-96 lg:w-[420px] lg:h-[420px] mb-8"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              whileHover={{ scale: 1.02 }}
            >
              <LottieAnimation 
                animationData={loginAnimation} 
                className="w-full h-full drop-shadow-lg" 
              />
            </motion.div>
            
            <motion.h1 
              className="text-4xl sm:text-5xl font-extrabold text-orange-700 dark:text-yellow-100 mb-4 drop-shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              {t('login_welcome_title')}
            </motion.h1>
            <motion.p 
              className="text-lg text-blue-800 dark:text-blue-200 mb-6 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              {t('login_welcome_desc')}
            </motion.p>
            
            {/* Feature Highlights */}
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              <div className="flex items-center space-x-3 p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg backdrop-blur-sm">
                <span className="text-2xl">📊</span>
                <span className="text-gray-700 dark:text-gray-200 font-medium">{t('login_feature_realtime_analytics')}</span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg backdrop-blur-sm">
                <span className="text-2xl">🔋</span>
                <span className="text-gray-700 dark:text-gray-200 font-medium">{t('login_feature_energy_optimization')}</span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg backdrop-blur-sm">
                <span className="text-2xl">💰</span>
                <span className="text-gray-700 dark:text-gray-200 font-medium">{t('login_feature_cost_savings')}</span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg backdrop-blur-sm">
                <span className="text-2xl">🌱</span>
                <span className="text-gray-700 dark:text-gray-200 font-medium">{t('login_feature_eco_friendly')}</span>
              </div>
            </motion.div>
          </div>

          {/* Right Side - Role Selection */}
          <motion.div 
            className="flex-1 w-full max-w-md"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20 dark:border-gray-700/50">
              
              {/* Header */}
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-orange-700 dark:text-yellow-100 mb-2">
                  {t('login_choose_role_title')}
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  {t('login_choose_role_desc')}
                </p>
              </div>

              {/* Role Selection Cards */}
              <div className="space-y-6">
                {/* User Card */}
                <motion.button
                  onClick={() => setSelectedRole('user')}
                  className="w-full p-6 bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 border-2 border-orange-200 dark:border-orange-800 rounded-2xl hover:border-orange-400 dark:hover:border-orange-600 transition-all duration-300 text-left group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-orange-100 dark:bg-orange-900/50 rounded-full flex items-center justify-center group-hover:bg-orange-200 dark:group-hover:bg-orange-800 transition-colors">
                      <User className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-orange-700 dark:text-orange-300 mb-1">{t('login_user_access_title')}</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        {t('login_user_access_desc')}
                      </p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-orange-400 group-hover:text-orange-600 dark:group-hover:text-orange-300 transition-colors" />
                  </div>
                </motion.button>

                {/* Admin Card */}
                <motion.button
                  onClick={() => setSelectedRole('admin')}
                  className="w-full p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-2xl hover:border-blue-400 dark:hover:border-blue-600 transition-all duration-300 text-left group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center group-hover:bg-blue-200 dark:group-hover:bg-blue-800 transition-colors">
                      <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-300 mb-1">{t('login_admin_access_title')}</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        {t('login_admin_access_desc')}
                      </p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-blue-400 group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors" />
                  </div>
                </motion.button>
              </div>

              {/* Additional Info */}
              <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                  {t('login_no_account')}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );

};

export default Login;