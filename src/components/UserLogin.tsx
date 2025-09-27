import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useUser } from "../contexts/UserContext";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Phone, MapPin } from "lucide-react";
import LottieAnimation from "./LottieAnimation";
import loginAnimation from "../assets/animations/login.json";

interface UserLoginProps {
  setActiveTab: (tab: string) => void;
  onBackToRoleSelection: () => void;
}

const UserLogin: React.FC<UserLoginProps> = ({ setActiveTab, onBackToRoleSelection }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [activeAuthTab, setActiveAuthTab] = useState("login"); // login or signup
  const { t } = useTranslation();
  const { setUser } = useUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Validation
    if (!email || !password || (activeAuthTab === "signup" && (!name || !phone || !location))) {
  setError(t("please_fill_required", "Please fill in all required fields."));
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setError(t("password_min_length", "Password must be at least 6 characters long."));
      setIsLoading(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      if (activeAuthTab === "signup") {
        setUser({
          name,
          email,
          phone,
          location,
          role: 'user',
          joined: new Date().toISOString(),
        });
        setActiveTab('profile');
      } else {
        setUser({
          name: "Solar User",
          email,
          phone: "+91 98765 43210",
          location: "Coimbatore, Tamil Nadu",
          role: 'user',
          joined: "2024-03-15",
        });
        setActiveTab('profile');
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-orange-100 to-blue-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 sm:p-6 lg:p-8 flex flex-col items-center justify-center relative overflow-hidden">
      
      {/* Background Decorative Elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-yellow-300/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-orange-300/20 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-blue-300/20 rounded-full blur-2xl"></div>

      {/* Main Content */}
      <motion.div 
        className="w-full max-w-5xl z-10"
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
              {t("solartrack_welcome", "Welcome to SolarTrack")}
            </motion.h1>
            <motion.p 
              className="text-lg text-blue-800 dark:text-blue-200 mb-6 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              {t("solartrack_desc", "Your intelligent solar energy management platform. Monitor, optimize, and maximize your renewable energy potential with advanced analytics and real-time insights.")}
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
                <span className="text-gray-700 dark:text-gray-200 font-medium">{t("real_time_analytics", "Real-time Analytics")}</span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg backdrop-blur-sm">
                <span className="text-2xl">🔋</span>
                <span className="text-gray-700 dark:text-gray-200 font-medium">{t("energy_optimization", "Energy Optimization")}</span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg backdrop-blur-sm">
                <span className="text-2xl">💰</span>
                <span className="text-gray-700 dark:text-gray-200 font-medium">{t("cost_savings", "Cost Savings")}</span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg backdrop-blur-sm">
                <span className="text-2xl">🌱</span>
                <span className="text-gray-700 dark:text-gray-200 font-medium">{t("eco_friendly", "Eco-Friendly")}</span>
              </div>
            </motion.div>
          </div>

          {/* Right Side - Login/Signup Form */}
          <motion.div 
            className="flex-1 w-full max-w-md"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20 dark:border-gray-700/50">
              
              {/* Tab Switcher */}
              <div className="flex bg-gray-100 dark:bg-gray-800 rounded-xl p-1 mb-8">
                <button
                  onClick={() => setActiveAuthTab("login")}
                  className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
                    activeAuthTab === "login" 
                      ? "bg-white dark:bg-gray-700 text-orange-600 dark:text-yellow-100 shadow-md" 
                      : "text-gray-600 dark:text-gray-300 hover:text-orange-600 dark:hover:text-yellow-300"
                  }`}
                >
                  {t("login", "Login")}
                </button>
                <button
                  onClick={() => setActiveAuthTab("signup")}
                  className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
                    activeAuthTab === "signup" 
                      ? "bg-white dark:bg-gray-700 text-orange-600 dark:text-yellow-100 shadow-md" 
                      : "text-gray-600 dark:text-gray-300 hover:text-orange-600 dark:hover:text-yellow-300"
                  }`}
                >
                  {t("signup", "Sign Up")}
                </button>
              </div>

              {/* Form Header */}
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-orange-700 dark:text-yellow-100 mb-2">
                  {activeAuthTab === "login" ? t("user_login", "User Login") : t("user_registration", "User Registration")}
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  {activeAuthTab === "login" 
                    ? t("sign_in_dashboard", "Sign in to access your solar dashboard")
                    : t("create_account_journey", "Create your account and start your solar journey")
                  }
                </p>
              </div>

              {/* Error Message */}
              {error && (
                <motion.div 
                  className="mb-6 p-3 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-600 text-red-700 dark:text-red-300 rounded-lg text-sm"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {error}
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Name, Phone, Location Fields (only for signup) */}
                {activeAuthTab === "signup" && (
                  <>
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      transition={{ duration: 0.3 }}
                    >
                      <label className="block text-gray-700 dark:text-gray-200 mb-2 font-medium">
                        {t("full_name", "Full Name")}
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          value={name}
                          onChange={e => setName(e.target.value)}
                          className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all"
                          placeholder={t("full_name_placeholder", "Enter your full name")}
                          required
                        />
                      </div>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      transition={{ duration: 0.3 }}
                    >
                      <label className="block text-gray-700 dark:text-gray-200 mb-2 font-medium">
                        {t("phone_number", "Phone Number")}
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          value={phone}
                          onChange={e => setPhone(e.target.value)}
                          className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all"
                          placeholder={t("phone_number_placeholder", "Enter your phone number")}
                          required
                        />
                      </div>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      transition={{ duration: 0.3 }}
                    >
                      <label className="block text-gray-700 dark:text-gray-200 mb-2 font-medium">
                        {t("location", "Location")}
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          value={location}
                          onChange={e => setLocation(e.target.value)}
                          className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all"
                          placeholder={t("location_placeholder", "Enter your location")}
                          required
                        />
                      </div>
                    </motion.div>
                  </>
                )}

                {/* Email Field */}
                <div>
                  <label className="block text-gray-700 dark:text-gray-200 mb-2 font-medium">
                    {t("email_address", "Email Address")}
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all"
                      placeholder={t("email_placeholder", "Enter your email")}
                      required
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <label className="block text-gray-700 dark:text-gray-200 mb-2 font-medium">
                    {t("password", "Password")}
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      className="w-full pl-11 pr-12 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all"
                      placeholder={t("password_placeholder", "Enter your password")}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Remember Me & Forgot Password */}
                {activeAuthTab === "login" && (
                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={e => setRememberMe(e.target.checked)}
                        className="w-4 h-4 accent-orange-500 rounded"
                      />
                      <span className="text-gray-600 dark:text-gray-300">{t("remember_me", "Remember me")}</span>
                    </label>
                    <a href="#" className="text-orange-600 dark:text-yellow-400 hover:underline font-medium">
                      {t("forgot_password", "Forgot password?")}
                    </a>
                  </div>
                )}

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-4 bg-gradient-to-r from-orange-500 to-yellow-400 hover:from-orange-600 hover:to-yellow-500 text-white rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-[1.02] shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isLoading ? (
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <span>{activeAuthTab === "login" ? t("sign_in", "Sign In") : t("create_account", "Create Account")}</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </motion.button>
              </form>

              {/* Back to Role Selection */}
              <div className="mt-6 text-center">
                <button
                  onClick={onBackToRoleSelection}
                  className="text-orange-600 dark:text-yellow-400 hover:underline font-medium"
                >
                  ← {t("back_to_role_selection", "Back to role selection")}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default UserLogin;
