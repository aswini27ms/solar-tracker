import React from "react";
import { Sun } from "lucide-react";
import { useUser } from "../contexts/UserContext";
import { useTranslation } from "react-i18next";

interface FooterProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Footer: React.FC<FooterProps> = ({ activeTab, setActiveTab }) => {
  const { user } = useUser();
  const isLoggedIn = user !== null;
  const { t } = useTranslation();

  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-10 mt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        {/* Brand & Mission */}
        <div className="flex flex-col items-center md:items-start space-y-2">
          <span className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center mb-1">
            <Sun className="w-5 h-5 text-white" />
          </span>
          <span className="text-lg font-bold bg-gradient-to-r from-yellow-500 to-orange-600 bg-clip-text text-transparent">
            SolarTrack
          </span>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
            {t('footer.missionLine1', 'Empowering you to monitor, optimize, and maximize your solar energy.')} <br />
            {t('footer.missionLine2', 'Clean energy, bright future.')}
          </p>
        </div>
        {/* Quick Links - Only visible when user is logged in */}
        {isLoggedIn && (
          <div className="flex flex-col items-center">
            <span className="font-semibold text-gray-700 dark:text-gray-300 mb-2">{t('footer.quickLinks', 'Quick Links')}</span>
            <nav className="flex flex-col space-y-1 text-sm">
              <button 
                onClick={() => setActiveTab('home')}
                className={`text-left transition-colors ${activeTab === 'home' 
                  ? 'text-orange-600 dark:text-yellow-100 font-semibold' 
                  : 'text-gray-700 dark:text-gray-200 hover:text-orange-600 dark:hover:text-yellow-100'}`}
              >
                {t('home')}
              </button>
              <button 
                onClick={() => setActiveTab('dashboard')}
                className={`text-left transition-colors ${activeTab === 'dashboard' 
                  ? 'text-orange-600 dark:text-yellow-100 font-semibold' 
                  : 'text-gray-700 dark:text-gray-200 hover:text-orange-600 dark:hover:text-yellow-100'}`}
              >
                {t('dashboard')}
              </button>
              <button 
                onClick={() => setActiveTab('analytics-nav')}
                className={`text-left transition-colors ${activeTab === 'analytics-nav' 
                  ? 'text-orange-600 dark:text-yellow-100 font-semibold' 
                  : 'text-gray-700 dark:text-gray-200 hover:text-orange-600 dark:hover:text-yellow-100'}`}
              >
                {t('analytics-nav')}
              </button>
              <button 
                onClick={() => setActiveTab('profile')}
                className={`text-left transition-colors ${activeTab === 'profile' 
                  ? 'text-orange-600 dark:text-yellow-100 font-semibold' 
                  : 'text-gray-700 dark:text-gray-200 hover:text-orange-600 dark:hover:text-yellow-100'}`}
              >
                {t('profile')}
              </button>
              <button 
                onClick={() => setActiveTab('settings')}
                className={`text-left transition-colors ${activeTab === 'settings' 
                  ? 'text-orange-600 dark:text-yellow-100 font-semibold' 
                  : 'text-gray-700 dark:text-gray-200 hover:text-orange-600 dark:hover:text-yellow-100'}`}
              >
                {t('settings')}
              </button>
              <button 
                onClick={() => setActiveTab('alerts')}
                className={`text-left transition-colors ${activeTab === 'alerts' 
                  ? 'text-orange-600 dark:text-yellow-100 font-semibold' 
                  : 'text-gray-700 dark:text-gray-200 hover:text-orange-600 dark:hover:text-yellow-100'}`}
              >
                {t('alerts')}
              </button>
              <button 
                onClick={() => setActiveTab('usermanual')}
                className={`text-left transition-colors ${activeTab === 'usermanual' 
                  ? 'text-orange-600 dark:text-yellow-100 font-semibold' 
                  : 'text-gray-700 dark:text-gray-200 hover:text-orange-600 dark:hover:text-yellow-100'}`}
              >
                {t('usermanual')}
              </button>
            </nav>
          </div>
        )}
        {/* Contact Info */}
        <div className="flex flex-col items-center md:items-end">
          <span className="font-semibold text-gray-700 dark:text-gray-300 mb-2">{t('footer.contact', 'Contact')}</span>
          <a href="mailto:support@solartrack.com" className="text-sm text-blue-700 dark:text-blue-300 hover:underline">support@solartrack.com</a>
          <span className="text-xs text-gray-500 dark:text-gray-400 mt-2">{t('footer.feedback', "We'd love to hear your feedback!")}</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
