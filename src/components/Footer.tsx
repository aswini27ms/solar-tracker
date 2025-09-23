import React from "react";
import { Sun } from "lucide-react";

interface FooterProps {
  setActiveTab: (tab: string) => void;
}


const Footer: React.FC<FooterProps> = ({ setActiveTab }) => (
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
          Empowering you to monitor, optimize, and maximize your solar energy. <br />
          Clean energy, bright future.
        </p>
      </div>
      {/* Quick Links */}
      <div className="flex flex-col items-center">
  <span className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Quick Links</span>
        <nav className="flex flex-col space-y-1 text-sm w-full">
          <button onClick={() => setActiveTab('home')} className="text-left text-gray-700 dark:text-gray-200 hover:text-orange-600 dark:hover:text-yellow-100 transition-colors w-full py-1">Home</button>
          <button onClick={() => setActiveTab('dashboard')} className="text-left text-gray-700 dark:text-gray-200 hover:text-orange-600 dark:hover:text-yellow-100 transition-colors w-full py-1">Dashboard</button>
          <button onClick={() => setActiveTab('profile')} className="text-left text-gray-700 dark:text-gray-200 hover:text-orange-600 dark:hover:text-yellow-100 transition-colors w-full py-1">Profile</button>
          <button onClick={() => setActiveTab('settings')} className="text-left text-gray-700 dark:text-gray-200 hover:text-orange-600 dark:hover:text-yellow-100 transition-colors w-full py-1">Settings</button>
          <button onClick={() => setActiveTab('alerts')} className="text-left text-gray-700 dark:text-gray-200 hover:text-orange-600 dark:hover:text-yellow-100 transition-colors w-full py-1">Alerts</button>
        </nav>
      </div>
      {/* Contact Info */}
      <div className="flex flex-col items-center md:items-end">
  <span className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Contact</span>
        <a href="mailto:support@solartrack.com" className="text-sm text-blue-700 dark:text-blue-300 hover:underline">support@solartrack.com</a>
        <span className="text-xs text-gray-500 dark:text-gray-400 mt-2">We'd love to hear your feedback!</span>
      </div>
    </div>
  </footer>
);

export default Footer;
