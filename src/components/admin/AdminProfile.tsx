import React, { useState, useEffect } from "react";
import { useUser } from "../../contexts/UserContext";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { 
  Edit, 
  Mail, 
  Calendar, 
  MapPin, 
  Phone, 
  Award, 
  Shield, 
  Users, 
  Activity,
  Database,
  Server,
  Key,
  BarChart3,
  AlertTriangle,
  CheckCircle
} from "lucide-react";


const AdminProfile: React.FC = () => {
  const [editMode, setEditMode] = useState(false);
  const { user } = useUser();
  const { t } = useTranslation();
  
  // Enhanced admin profile data
  const [profile, setProfile] = useState({
    phone: user?.phone || "+91 98765 43210",
    location: user?.location || "சென்னை, தமிழ்நாடு", // Changed to Tamil
    joined: user?.joined || "2024-01-15",
    avatar: "🛡️",
    bio: t('admin_profile.bio'),
    adminLevel: t('admin_profile.admin_level'),
    department: t('admin_profile.department'),
    employeeId: "ADM-2024-001",
    accessLevel: t('admin_profile.access_level'),
    lastLogin: "2024-09-25 22:45:30",
    sessionDuration: "2h 34m",
    systemsManaged: 24,
    usersManaged: 156,
    totalUptime: "99.8%",
    incidentsResolved: 892,
    systemOptimizations: 47
  });


  // Update profile when user context changes
  useEffect(() => {
    if (user) {
      setProfile(prev => ({
        ...prev,
        phone: user.phone || prev.phone,
        location: user.location || "சென்னை, தமிழ்நாடு", // Use Tamil as default
        joined: user.joined || prev.joined
      }));
    }
  }, [user]);

  // Helper function to format date in Tamil context
  const formatJoinedDate = (dateString: string) => {
    const date = new Date(dateString);
    const months = {
      0: 'ஜனவரி', 1: 'பிப்ரவரி', 2: 'மார்ச்', 3: 'ஏப்ரல்', 4: 'மே', 5: 'ஜூன்',
      6: 'ஜூலை', 7: 'ஆகஸ்ட்', 8: 'செப்டம்பர்', 9: 'அக்டோபர்', 10: 'நவம்பர்', 11: 'டிசம்பர்'
    };
    return `${months[date.getMonth() as keyof typeof months]} ${date.getFullYear()}`;
  };

  const achievementsData = t('admin_profile.achievements', { returnObjects: true }) as any[];
  const adminAchievements = achievementsData.map((achievement: any, index: number) => ({
    id: index + 1,
    title: achievement.title,
    description: achievement.description,
    icon: ["🛡️", "🚨", "⚡", "👥", "🔒", "💡"][index],
    date: [
      "ஜனவரி 2024", "மார்ச் 2024", "மே 2024", 
      "ஜூலை 2024", "ஆகஸ்ட் 2024", "செப்டம்பர் 2024"
    ][index], // Changed to Tamil months
    impact: achievement.impact === "மிகவும் முக்கியம்" ? "Critical" : achievement.impact === "அதிகம்" ? "High" : "Medium"
  }));


  const adminStats = [
    { label: t('admin_profile.stats.systems_managed'), value: profile.systemsManaged, icon: <Server className="w-5 h-5" />, color: "text-blue-600", change: "+2 this month" },
    { label: t('admin_profile.stats.users_managed'), value: profile.usersManaged, icon: <Users className="w-5 h-5" />, color: "text-green-600", change: "+12 this week" },
    { label: t('admin_profile.stats.system_uptime'), value: profile.totalUptime, icon: <Activity className="w-5 h-5" />, color: "text-purple-600", change: "Stable" },
    { label: t('admin_profile.stats.incidents_resolved'), value: profile.incidentsResolved, icon: <AlertTriangle className="w-5 h-5" />, color: "text-red-600", change: "+5 today" }
  ];


  const systemMetrics = [
    { label: t('admin_profile.metrics.cpu_usage'), value: "45%", trend: "down", icon: <Database className="w-4 h-4" /> },
    { label: t('admin_profile.metrics.memory_usage'), value: "67%", trend: "up", icon: <Database className="w-4 h-4" /> },
    { label: t('admin_profile.metrics.network_load'), value: "23%", trend: "stable", icon: <Activity className="w-4 h-4" /> },
    { label: t('admin_profile.metrics.storage_usage'), value: "78%", trend: "up", icon: <Server className="w-4 h-4" /> }
  ];


  const adminActivities = [
    { id: 1, activity: t('admin_profile.activities.system_backup'), status: "success", time: "10 minutes ago", system: "Main Server" },
    { id: 2, activity: t('admin_profile.activities.user_access_modified'), status: "warning", time: "1 hour ago", user: "John Doe" },
    { id: 3, activity: t('admin_profile.activities.security_patch_applied'), status: "success", time: "2 hours ago", system: "Security Module" },
    { id: 4, activity: t('admin_profile.activities.performance_optimization'), status: "success", time: "3 hours ago", impact: "15% improvement" },
    { id: 5, activity: t('admin_profile.activities.failed_login_attempt'), status: "error", time: "4 hours ago", user: "Unknown IP" },
    { id: 6, activity: t('admin_profile.activities.system_maintenance_scheduled'), status: "info", time: "5 hours ago", scheduled: "Tomorrow 2:00 AM" }
  ];


  const permissions = [
    { 
      category: t('admin_profile.permissions.system_administration'), 
      items: t('admin_profile.permissions.items.system_administration', { returnObjects: true }) as string[] 
    },
    { 
      category: t('admin_profile.permissions.security'), 
      items: t('admin_profile.permissions.items.security', { returnObjects: true }) as string[] 
    },
    { 
      category: t('admin_profile.permissions.monitoring'), 
      items: t('admin_profile.permissions.items.monitoring', { returnObjects: true }) as string[] 
    },
    { 
      category: t('admin_profile.permissions.data_management'), 
      items: t('admin_profile.permissions.items.data_management', { returnObjects: true }) as string[] 
    }
  ];


  const handleSave = () => {
    setEditMode(false);
    // Here you would typically save to backend
  };


  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'bg-green-500';
      case 'warning': return 'bg-yellow-500';
      case 'error': return 'bg-red-500';
      case 'info': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };


  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return '📈';
      case 'down': return '📉';
      case 'stable': return '➡️';
      default: return '➡️';
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-orange-100 to-blue-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <motion.div 
          className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 mb-8 border border-white/20 dark:border-gray-700/50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col lg:flex-row items-center gap-8">
            {/* Avatar Section */}
            <div className="relative">
              <motion.div 
                className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 flex items-center justify-center shadow-lg"
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-6xl">{profile.avatar}</span>
              </motion.div>
              <motion.button
                onClick={() => setEditMode(!editMode)}
                className="absolute -bottom-2 -right-2 w-10 h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center shadow-lg transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Edit className="w-4 h-4" />
              </motion.button>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center text-xs font-bold shadow-lg">
                <Shield className="w-3 h-3" />
              </div>
            </div>


            {/* Admin Info */}
            <div className="flex-1 text-center lg:text-left">
              {editMode ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={user?.name || "System Administrator"}
                    readOnly
                    className="text-3xl font-bold bg-transparent border-b-2 border-blue-500 text-blue-700 dark:text-yellow-100 focus:outline-none cursor-not-allowed"
                  />
                  <textarea
                    value={t('admin_profile.bio')}
                    readOnly
                    className="w-full p-3 bg-gray-100 dark:bg-gray-800 rounded-lg resize-none cursor-not-allowed"
                    rows={3}
                  />
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-center lg:justify-start gap-3 mb-2">
                    <h1 className="text-3xl font-bold text-blue-700 dark:text-yellow-100">{user?.name || t('admin_profile.title')}</h1>
                    <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
                      {t('admin_profile.admin_level')}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">{t('admin_profile.bio')}</p>
                </>
              )}


              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
                <div className="flex items-center justify-center lg:justify-start space-x-2 text-gray-600 dark:text-gray-300">
                  <Mail className="w-4 h-4" />
                  <span>{user?.email || "admin@solartrack.com"}</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start space-x-2 text-gray-600 dark:text-gray-300">
                  <Phone className="w-4 h-4" />
                  <span>{user?.phone || profile.phone}</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start space-x-2 text-gray-600 dark:text-gray-300">
                  <MapPin className="w-4 h-4" />
                  <span>{user?.location || profile.location}</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start space-x-2 text-gray-600 dark:text-gray-300">
                  <Calendar className="w-4 h-4" />
                  <span>சேர்ந்தது {formatJoinedDate(user?.joined || profile.joined)}</span> {/* Changed to Tamil */}
                </div>
                <div className="flex items-center justify-center lg:justify-start space-x-2 text-gray-600 dark:text-gray-300">
                  <Key className="w-4 h-4" />
                  <span>{t('admin_profile.access_level')}</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start space-x-2 text-gray-600 dark:text-gray-300">
                  <Activity className="w-4 h-4" />
                  <span>{t('admin_profile.last_login')}: {profile.lastLogin}</span>
                </div>
              </div>


              {editMode && (
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={handleSave}
                    className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors"
                  >
                    {t('admin_profile.save_changes')}
                  </button>
                  <button
                    onClick={() => setEditMode(false)}
                    className="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-semibold transition-colors"
                  >
                    {t('admin_profile.cancel')}
                  </button>
                </div>
              )}
            </div>
          </div>
        </motion.div>


        {/* Admin Stats Grid */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {adminStats.map((stat, index) => (
            <motion.div
              key={index}
              className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/20 dark:border-gray-700/50"
              whileHover={{ scale: 1.02, y: -2 }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`${stat.color}`}>{stat.icon}</div>
                <span className="text-2xl font-bold text-gray-800 dark:text-white">{stat.value}</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{stat.label}</p>
              <p className="text-xs text-green-600 dark:text-green-400 font-medium">{stat.change}</p>
            </motion.div>
          ))}
        </motion.div>


        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Admin Achievements Section */}
          <motion.div 
            className="lg:col-span-2 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/20 dark:border-gray-700/50"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-2xl font-bold text-blue-700 dark:text-yellow-100 mb-6 flex items-center">
              <Award className="w-6 h-6 mr-3" />
              நிர்வாக சாதனைகள் {/* Changed to Tamil */}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {adminAchievements.map((achievement) => (
                <motion.div
                  key={achievement.id}
                  className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-xl border border-blue-200 dark:border-gray-600"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl">{achievement.icon}</span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-semibold text-gray-800 dark:text-white">{achievement.title}</h4>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          achievement.impact === 'Critical' ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300' :
                          achievement.impact === 'High' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300' :
                          'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                        }`}>
                          {achievement.impact}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{achievement.description}</p>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{achievement.date}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>


          {/* System Metrics */}
          <motion.div 
            className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/20 dark:border-gray-700/50"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-purple-700 dark:text-yellow-100 mb-6 flex items-center">
              <BarChart3 className="w-6 h-6 mr-3" />
              {t('admin_profile.system_metrics')} {/* Using translation */}
            </h3>
            <div className="space-y-4">
              {systemMetrics.map((metric, index) => (
                <div key={index} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className="text-gray-600 dark:text-gray-300">{metric.icon}</div>
                      <span className="text-sm font-medium text-gray-800 dark:text-white">{metric.label}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-gray-800 dark:text-white">{metric.value}</span>
                      <span className="text-sm">{getTrendIcon(metric.trend)}</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        metric.trend === 'up' ? 'bg-red-500' :
                        metric.trend === 'down' ? 'bg-green-500' : 'bg-blue-500'
                      }`}
                      style={{ width: metric.value }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>


        {/* Second Row - Admin Activities and Permissions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          
          {/* Admin Activities */}
          <motion.div 
            className="lg:col-span-2 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/20 dark:border-gray-700/50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <h3 className="text-2xl font-bold text-green-700 dark:text-yellow-100 mb-6 flex items-center">
              <Activity className="w-6 h-6 mr-3" />
              {t('admin_profile.recent_activities')} {/* Using translation */}
            </h3>
            <div className="space-y-4">
              {adminActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className={`w-2 h-2 rounded-full mt-2 ${getStatusColor(activity.status)}`}></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800 dark:text-white">{activity.activity}</p>
                    {activity.system && (
                      <p className="text-xs text-blue-600 dark:text-blue-400">System: {activity.system}</p>
                    )}
                    {activity.user && (
                      <p className="text-xs text-purple-600 dark:text-purple-400">User: {activity.user}</p>
                    )}
                    {activity.impact && (
                      <p className="text-xs text-green-600 dark:text-green-400 font-medium">Impact: {activity.impact}</p>
                    )}
                    {activity.scheduled && (
                      <p className="text-xs text-orange-600 dark:text-orange-400">Scheduled: {activity.scheduled}</p>
                    )}
                    <p className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>


          {/* Admin Permissions */}
          <motion.div 
            className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/20 dark:border-gray-700/50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <h3 className="text-2xl font-bold text-indigo-700 dark:text-yellow-100 mb-6 flex items-center">
              <Shield className="w-6 h-6 mr-3" />
              {t('admin_profile.access_permissions')} {/* Using translation */}
            </h3>
            <div className="space-y-4">
              {permissions.map((permission, index) => (
                <div key={index} className="border-l-4 border-indigo-500 pl-4">
                  <h4 className="font-semibold text-gray-800 dark:text-white mb-2">{permission.category}</h4>
                  <ul className="space-y-1">
                    {permission.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                        <CheckCircle className="w-3 h-3 text-green-500" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};


export default AdminProfile;