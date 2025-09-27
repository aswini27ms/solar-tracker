import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { BookOpen, Info, Settings, AlertTriangle, BarChart3, HelpCircle, Phone, Mail } from "lucide-react";
import LottieAnimation from "./LottieAnimation";
import usermanualAnimation from "../assets/animations/usermanual.json";

const UserManual: React.FC = () => {
  const { t } = useTranslation();
  const sections = [
    {
      title: t("introduction", "Introduction"),
      icon: <Info className="w-6 h-6 text-orange-500 mr-2" />,
      content: <div dangerouslySetInnerHTML={{ __html: t("manual_intro") }} />
    },
    {
      title: t("system_overview", "System Overview"),
      icon: <Settings className="w-6 h-6 text-blue-500 mr-2" />,
      content: <div dangerouslySetInnerHTML={{ __html: t("manual_system_overview") }} />
    },
    {
      title: t("installation_setup", "Installation & Setup"),
      icon: <Settings className="w-6 h-6 text-green-500 mr-2" />,
      content: <div dangerouslySetInnerHTML={{ __html: t("manual_installation_setup") }} />
    },
    {
      title: t("user_roles_access", "User Roles & Access"),
      icon: <BookOpen className="w-6 h-6 text-purple-500 mr-2" />,
      content: <div dangerouslySetInnerHTML={{ __html: t("manual_user_roles_access") }} />
    },
    {
      title: t("using_dashboard", "Using the Dashboard"),
      icon: <BarChart3 className="w-6 h-6 text-orange-500 mr-2" />,
      content: <div dangerouslySetInnerHTML={{ __html: t("manual_using_dashboard") }} />
    },
    {
      title: t("alerts_notifications", "Alerts & Notifications"),
      icon: <AlertTriangle className="w-6 h-6 text-yellow-500 mr-2" />,
      content: <div dangerouslySetInnerHTML={{ __html: t("manual_alerts_notifications") }} />
    },
    {
      title: t("troubleshooting_guide", "Troubleshooting Guide"),
      icon: <HelpCircle className="w-6 h-6 text-red-500 mr-2" />,
      content: <div dangerouslySetInnerHTML={{ __html: t("manual_troubleshooting_guide") }} />
    },
    {
      title: t("safety_instructions", "Safety Instructions"),
      icon: <AlertTriangle className="w-6 h-6 text-yellow-500 mr-2" />,
      content: <div dangerouslySetInnerHTML={{ __html: t("manual_safety_instructions") }} />
    },
    {
      title: t("maintenance_guidelines", "Maintenance Guidelines"),
      icon: <Settings className="w-6 h-6 text-green-500 mr-2" />,
      content: <div dangerouslySetInnerHTML={{ __html: t("manual_maintenance_guidelines") }} />
    },
    {
      title: t("faqs", "FAQs"),
      icon: <HelpCircle className="w-6 h-6 text-blue-500 mr-2" />,
      content: <div dangerouslySetInnerHTML={{ __html: t("manual_faqs") }} />
    },
    {
      title: t("contact_support", "Contact Support"),
      icon: <Phone className="w-6 h-6 text-green-500 mr-2" />,
      content: <div dangerouslySetInnerHTML={{ __html: t("manual_contact_support") }} />
    },
  ];


  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-orange-100 to-blue-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section with Animation */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 mb-12">
          <motion.div 
            className="flex-1 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/20 dark:border-gray-700/50 flex items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <BookOpen className="w-10 h-10 text-orange-500" />
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-orange-700 dark:text-yellow-100 mb-2">{t("user_manual_guide", "User Manual Guide")}</h1>
              <p className="text-gray-600 dark:text-gray-300">{t("user_manual_guide_desc", "Complete guide to using the Smart Microgrid Management System")}</p>
            </div>
          </motion.div>
          
          <motion.div 
            className="flex-1 max-w-md"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            whileHover={{ scale: 1.02 }}
          >
            <LottieAnimation 
              animationData={usermanualAnimation} 
              className="w-full h-64 sm:h-80 drop-shadow-lg" 
            />
          </motion.div>
        </div>
        
        {/* Content Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {sections.map((section, idx) => (
            <motion.div 
              key={idx}
              className="bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-lg p-6 border border-white/20 dark:border-gray-700/50 flex flex-col mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <div className="flex items-center mb-2">
                {section.icon}
                <h2 className="text-xl font-bold text-orange-700 dark:text-yellow-100">{section.title}</h2>
              </div>
              <div className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                {section.content}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserManual;
