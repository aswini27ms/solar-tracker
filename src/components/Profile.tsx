import React, { useState, useEffect } from "react";
import { useUser } from "../contexts/UserContext";
import { motion } from "framer-motion";
import { Edit, Mail, Calendar, MapPin, Phone, Award, Zap, Sun, Battery } from "lucide-react";
import { useTranslation } from "react-i18next";

const Profile: React.FC = () => {
  const [editMode, setEditMode] = useState(false);
  const { user } = useUser();
  const { t, i18n } = useTranslation();

  // Initial localized defaults; user values will override if present
  const [profile, setProfile] = useState({
    phone: user?.phone || "+91 98765 43210",
    location: user?.location || t("profile-user.defaultLocation"),
    joined: user?.joined || "2024-03-15",
    avatar: "🌞",
    bio: user?.bio ?? t("profile-user.bioDefault"),
    systemCapacity: "5.2 kW",
    totalSavings: "₹45,280",
    carbonOffset: "2,840 kg CO₂",
    energyGenerated: "12,450 kWh"
  });

  // Re-derive localized defaults when user or language changes, without clobbering real user data
  useEffect(() => {
    setProfile((prev) => ({
      ...prev,
      phone: user?.phone ?? prev.phone,
      location:
        user?.location && user.location.trim().length > 0
          ? user.location
          : t("profile-user.defaultLocation"),
      joined: user?.joined ?? prev.joined,
      bio: user?.bio ?? t("profile-user.bioDefault")
    }));
  }, [user, i18n.resolvedLanguage, t]);

  const achievements = [
    {
      id: 1,
      title: t("profile-user.achievements.items.solarPioneer.title"),
      description: t("profile-user.achievements.items.solarPioneer.desc"),
      icon: "🏆",
      date: t("profile-user.achievements.items.solarPioneer.date")
    },
    {
      id: 2,
      title: t("profile-user.achievements.items.greenGuardian.title"),
      description: t("profile-user.achievements.items.greenGuardian.desc"),
      icon: "🌱",
      date: t("profile-user.achievements.items.greenGuardian.date")
    },
    {
      id: 3,
      title: t("profile-user.achievements.items.energyEfficient.title"),
      description: t("profile-user.achievements.items.energyEfficient.desc"),
      icon: "⚡",
      date: t("profile-user.achievements.items.energyEfficient.date")
    },
    {
      id: 4,
      title: t("profile-user.achievements.items.smartSeller.title"),
      description: t("profile-user.achievements.items.smartSeller.desc"),
      icon: "💰",
      date: t("profile-user.achievements.items.smartSeller.date")
    }
  ];

  const stats = [
    { label: t("profile-user.stats.systemCapacity"), value: profile.systemCapacity, icon: <Sun className="w-5 h-5" />, color: "text-yellow-600" },
    { label: t("profile-user.stats.totalSavings"), value: profile.totalSavings, icon: <Battery className="w-5 h-5" />, color: "text-green-600" },
    { label: t("profile-user.stats.carbonOffset"), value: profile.carbonOffset, icon: <Zap className="w-5 h-5" />, color: "text-blue-600" },
    { label: t("profile-user.stats.energyGenerated"), value: profile.energyGenerated, icon: <Award className="w-5 h-5" />, color: "text-purple-600" }
  ];

  const recentActivities = [
    { id: 1, activity: t("profile-user.activities.soldToGrid.activity"), amount: "₹127", time: t("profile-user.activities.soldToGrid.time"), type: "earning" },
    { id: 2, activity: t("profile-user.activities.maintenanceReminder.activity"), amount: "", time: t("profile-user.activities.maintenanceReminder.time"), type: "notification" },
    { id: 3, activity: t("profile-user.activities.monthlyReport.activity"), amount: "", time: t("profile-user.activities.monthlyReport.time"), type: "report" },
    { id: 4, activity: t("profile-user.activities.achievementUnlocked.activity"), amount: t("profile-user.activities.achievementUnlocked.amount"), time: t("profile-user.activities.achievementUnlocked.time"), type: "achievement" }
  ];

  const handleSave = () => {
    setEditMode(false);
    // Persist changes to backend if editing is enabled in the future
  };

  const joinedLabel = user?.joined ? new Date(user.joined) : new Date(profile.joined);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-orange-100 to-blue-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <motion.div
          className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 mb-8 border border-white/20 dark:border-gray-700/50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Avatar */}
            <div className="relative">
              <motion.div
                className="w-32 h-32 rounded-full bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 flex items-center justify-center shadow-lg"
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-6xl">{profile.avatar}</span>
              </motion.div>
              <motion.button
                onClick={() => setEditMode(!editMode)}
                className="absolute -bottom-2 -right-2 w-10 h-10 bg-orange-600 hover:bg-orange-700 text-white rounded-full flex items-center justify-center shadow-lg transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Edit className="w-4 h-4" />
              </motion.button>
            </div>

            {/* User Info */}
            <div className="flex-1 text-center md:text-left">
              {editMode ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={user?.name || t("profile-user.defaultName")}
                    readOnly
                    className="text-3xl font-bold bg-transparent border-b-2 border-orange-500 text-orange-700 dark:text-yellow-100 focus:outline-none cursor-not-allowed"
                  />
                  <textarea
                    value={profile.bio}
                    readOnly
                    className="w-full p-3 bg-gray-100 dark:bg-gray-800 rounded-lg resize-none cursor-not-allowed"
                    rows={3}
                  />
                </div>
              ) : (
                <>
                  <h1 className="text-3xl font-bold text-orange-700 dark:text-yellow-100 mb-2">
                    {user?.name || t("profile-user.defaultName")}
                  </h1>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">{profile.bio}</p>
                </>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div className="flex items-center justify-center md:justify-start space-x-2 text-gray-600 dark:text-gray-300">
                  <Mail className="w-4 h-4" />
                  <span>{user?.email || "user@email.com"}</span>
                </div>
                <div className="flex items-center justify-center md:justify-start space-x-2 text-gray-600 dark:text-gray-300">
                  <Phone className="w-4 h-4" />
                  <span>{user?.phone || profile.phone}</span>
                </div>
                <div className="flex items-center justify-center md:justify-start space-x-2 text-gray-600 dark:text-gray-300">
                  <MapPin className="w-4 h-4" />
                  <span>{user?.location || profile.location}</span>
                </div>
                <div className="flex items-center justify-center md:justify-start space-x-2 text-gray-600 dark:text-gray-300">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {t("profile-user.joinedOn", {
                      value: joinedLabel,
                      formatParams: { value: { year: "numeric", month: "long" } }
                    })}
                  </span>
                </div>
              </div>

              {editMode && (
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={handleSave}
                    className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors"
                  >
                    {t("common.saveChanges")}
                  </button>
                  <button
                    onClick={() => setEditMode(false)}
                    className="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-semibold transition-colors"
                  >
                    {t("common.cancel")}
                  </button>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/20 dark:border-gray-700/50"
              whileHover={{ scale: 1.02, y: -2 }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`${stat.color}`}>{stat.icon}</div>
                <span className="text-2xl font-bold text-gray-800 dark:text-white">{stat.value}</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Achievements */}
          <motion.div
            className="lg:col-span-2 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/20 dark:border-gray-700/50"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-2xl font-bold text-orange-700 dark:text-yellow-100 mb-6 flex items-center">
              <Award className="w-6 h-6 mr-3" />
              {t("profile-user.achievements.title")}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {achievements.map((achievement) => (
                <motion.div
                  key={achievement.id}
                  className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-gray-800 dark:to-gray-700 rounded-xl border border-yellow-200 dark:border-gray-600"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl">{achievement.icon}</span>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 dark:text-white mb-1">{achievement.title}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{achievement.description}</p>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{achievement.date}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Recent Activities */}
          <motion.div
            className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/20 dark:border-gray-700/50"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-blue-700 dark:text-yellow-100 mb-6">
              {t("profile-user.recentActivities.title")}
            </h3>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div
                    className={`w-2 h-2 rounded-full mt-2 ${
                      activity.type === "earning"
                        ? "bg-green-500"
                        : activity.type === "notification"
                        ? "bg-blue-500"
                        : activity.type === "achievement"
                        ? "bg-yellow-500"
                        : "bg-gray-500"
                    }`}
                  ></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800 dark:text-white">{activity.activity}</p>
                    {activity.amount && (
                      <p className="text-sm font-semibold text-green-600 dark:text-green-400">{activity.amount}</p>
                    )}
                    <p className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
