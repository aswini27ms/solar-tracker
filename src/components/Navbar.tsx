import React, { useState } from 'react';
import { useUser } from '../contexts/UserContext';
import { motion } from 'framer-motion';
import { 
  Sun, 
  Moon, 
  Home, 
  BarChart3, 
  TrendingUp, 
  AlertTriangle, 
  Settings, 
  User, 
  LogIn, 
  BookOpen,
  Menu
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}


const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const { isDark, toggleTheme } = useTheme();
  const { user, setUser } = useUser();

  const navItems = user ? (
    user.role === 'admin' ? [
      { id: 'admin-home', label: 'Home', icon: Home },
      { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
      { id: 'analytics', label: 'Analytics', icon: TrendingUp },
      { id: 'alerts', label: 'Alerts', icon: AlertTriangle },
      { id: 'settings', label: 'Settings', icon: Settings },
      { id: 'profile', label: 'Profile', icon: User },
      { id: 'usermanual', label: 'User Manual', icon: BookOpen },
    ] : [
      { id: 'home', label: 'Home', icon: Home },
      { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
      { id: 'analytics', label: 'Analytics', icon: TrendingUp },
      { id: 'alerts', label: 'Alerts', icon: AlertTriangle },
      { id: 'settings', label: 'Settings', icon: Settings },
      { id: 'profile', label: 'Profile', icon: User },
      { id: 'usermanual', label: 'User Manual', icon: BookOpen },
    ]
  ) : [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'login', label: 'Login', icon: LogIn },
    { id: 'usermanual', label: 'User Manual', icon: BookOpen },
  ];

  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16 justify-between w-full">
          {/* Logo and Name Left-Aligned */}
          <motion.div 
            className="flex items-center space-x-3 mr-8 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            onClick={() => setActiveTab('home')}
          >
            <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
              <Sun className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-yellow-500 to-orange-600 bg-clip-text text-transparent">
              SolarTracker
            </span>
          </motion.div>

          {/* Navigation Items Center-Aligned */}
          <div className="hidden md:flex flex-1 justify-center items-center gap-6">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === item.id
                    ? 'text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20'
                    : 'text-gray-600 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </motion.button>
            ))}
            {/* Show Logout button only when user is logged in */}
            {user && (
              <motion.button
                key="logout"
                onClick={() => {
                  setUser(null as any);
                  setActiveTab('login');
                }}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-800 ml-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <LogIn className="w-4 h-4" />
                <span>Logout</span>
              </motion.button>
            )}
          </div>

          {/* Theme Toggle Right-Aligned */}
          <motion.button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 ml-4"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </motion.button>

          {/* Mobile menu button */}
          <div className="md:hidden ml-2">
            <motion.button
              className="p-2 rounded-lg text-gray-600 dark:text-gray-300"
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Open navigation menu"
            >
              <Menu className="w-6 h-6" />
            </motion.button>
          </div>
        </div>
        {/* Mobile Navigation Drawer */}
        {mobileOpen && (
          <div className="md:hidden absolute left-0 right-0 top-16 bg-white dark:bg-gray-900 shadow-lg border-t border-gray-200 dark:border-gray-800 z-50">
            <div className="flex flex-col items-stretch p-4 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => { setActiveTab(item.id); setMobileOpen(false); }}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                    activeTab === item.id
                      ? 'text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20'
                      : 'text-gray-600 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              ))}
              {user && (
                <button
                  key="logout"
                  onClick={() => { setUser(null as any); setActiveTab('login'); setMobileOpen(false); }}
                  className="flex items-center space-x-2 px-4 py-3 rounded-lg text-base font-medium transition-colors text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-800"
                >
                  <LogIn className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
