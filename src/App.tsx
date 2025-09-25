import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { UserProvider } from './contexts/UserContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Analytics from './components/Analytics';
import Home from './components/Home';
import Alerts from './components/Alerts';
import Settings from './components/Settings';
import Login from './components/Login';
import Profile from './components/Profile';
import Footer from './components/Footer';
import UserManual from './components/UserManual';

import AdminDashboard from './components/admin/AdminDashboard';
import AdminHome from './components/admin/AdminHome';
import AdminAnalytics from './components/admin/Analytics';
import AdminAlerts from './components/admin/AdminAlerts';
import AdminProfile from './components/admin/AdminProfile';
import { TelemetryProvider } from './contexts/TelemetryContext';
import { useUser } from './contexts/UserContext';



function App() {
  const [activeTab, setActiveTab] = useState('home');

  function AppWithUser() {
    const { user } = useUser();
    const renderActiveComponent = () => {
      switch (activeTab) {
        case 'home':
          return <Home setActiveTab={setActiveTab} />;
        case 'dashboard':
          if (user && user.role === 'admin') {
            return <AdminDashboard />;
          } else {
            return <Dashboard />;
          }
        case 'analytics':
          if (user && user.role === 'admin') {
            return <AdminAnalytics />;
          } else {
            return <Analytics />;
          }
        case 'alerts':
          if (user && user.role === 'admin') {
            return <AdminAlerts />;
          } else {
            return <Alerts />;
          }
        case 'settings':
          return <Settings />;
        case 'profile':
          if (user && user.role === 'admin') {
            return <AdminProfile />;
          } else {
            return <Profile />;
          }
        case 'login':
          return <Login setActiveTab={setActiveTab} />;
        case 'admin-home':
          return <AdminHome setActiveTab={setActiveTab} />;
        case 'usermanual':
          return <UserManual />;
        default:
          return <Dashboard />;
      }
    };
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderActiveComponent()}
          </motion.div>
        </AnimatePresence>
        <Footer activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    );
  }

  return (
    <UserProvider>
      <ThemeProvider>
        <TelemetryProvider>
          <AppWithUser />
        </TelemetryProvider>
      </ThemeProvider>
    </UserProvider>
  );
}

export default App;