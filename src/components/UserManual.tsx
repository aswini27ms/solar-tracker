import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Info, Settings, AlertTriangle, BarChart3, HelpCircle, Phone, Mail } from "lucide-react";

const sections = [
  {
    title: "Introduction",
    icon: <Info className="w-6 h-6 text-orange-500 mr-2" />,
    content: (
      <>
        <p>Welcome to the Smart Microgrid Management System.<br />
        This platform enables users to monitor, control, and optimize energy generation, storage, and consumption within a microgrid.<br />
        The system supports multiple energy sources (solar, battery, and grid), provides real-time monitoring, alerts, and data-driven insights for efficient operation.</p>
        <ul className="list-disc ml-6 mt-2">
          <li><b>Purpose:</b> Ensure uninterrupted power supply, optimize energy usage and cost savings, provide users with actionable insights and alerts.</li>
          <li><b>Target Users:</b> Admin (manages system/users), Operators (monitor/handle operations), Consumers (view usage/receive alerts).</li>
        </ul>
      </>
    )
  },
  {
    title: "System Overview",
    icon: <Settings className="w-6 h-6 text-blue-500 mr-2" />,
    content: (
      <>
        <b>Components:</b>
        <ul className="list-disc ml-6">
          <li>Energy Sources: Solar panels, grid supply</li>
          <li>Energy Storage: Battery bank</li>
          <li>Load Management: Appliances</li>
          <li>Controller: Microgrid Control Unit with IoT sensors</li>
          <li>User Interface: Web & Mobile Dashboard</li>
        </ul>
        <b className="block mt-2">Features:</b>
        <ul className="list-disc ml-6">
          <li>Real-time monitoring of energy flow</li>
          <li>Automatic switching between grid and battery</li>
          <li>Smart alerts for faults, overload, or maintenance</li>
          <li>Data analytics for performance and savings</li>
        </ul>
      </>
    )
  },
  {
    title: "Installation & Setup",
    icon: <Settings className="w-6 h-6 text-green-500 mr-2" />,
    content: (
      <>
        <b>Hardware Setup:</b>
        <ul className="list-disc ml-6">
          <li>Install solar panels and connect to charge controller</li>
          <li>Connect battery bank to controller</li>
          <li>Connect loads through control unit</li>
          <li>Ensure proper grounding and safety checks</li>
        </ul>
        <b className="block mt-2">Software Setup:</b>
        <ul className="list-disc ml-6">
          <li>Power ON the control unit</li>
          <li>Connect to Wi-Fi/LoRa</li>
          <li>Access the web app: <a href="https://www.microgrid-system.com" className="text-blue-600 underline">www.microgrid-system.com</a></li>
          <li>Log in with your username and password provided by the admin</li>
        </ul>
      </>
    )
  },
  {
    title: "User Roles & Access",
    icon: <BookOpen className="w-6 h-6 text-purple-500 mr-2" />,
    content: (
      <>
        <ul className="list-disc ml-6">
          <li><b>Admin:</b> Add/remove users, configure thresholds, access all data/reports/logs</li>
          <li><b>Operator:</b> Monitor energy flow, acknowledge/resolve alerts</li>
          <li><b>Consumer/User:</b> View real-time usage, check bills/savings/alerts</li>
        </ul>
      </>
    )
  },
  {
    title: "Using the Dashboard",
    icon: <BarChart3 className="w-6 h-6 text-orange-500 mr-2" />,
    content: (
      <>
        <b>Homepage:</b> Energy Flow Diagram → Generation → Storage → Consumption.<br />
        <b>Key Metrics:</b> Solar generation, battery status, grid usage, load demand.<br />
        <b>Settings Page:</b> Configure battery limits, set load priority, change alert preferences.<br />
        <b>Alerts Page:</b> View live notifications (Low Battery, Overload, Fault, Grid outage), acknowledge/resolve alerts.<br />
        <b>Reports & Analytics:</b> Daily/monthly usage, cost savings, efficiency, carbon footprint reduction.
      </>
    )
  },
  {
    title: "Alerts & Notifications",
    icon: <AlertTriangle className="w-6 h-6 text-yellow-500 mr-2" />,
    content: (
      <>
        <table className="w-full text-sm mb-2 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="p-2">Alert</th>
              <th className="p-2">Meaning</th>
              <th className="p-2">Action Required</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="p-2">⚠ Low Battery</td>
              <td className="p-2">Battery level &lt; 20%</td>
              <td className="p-2">Switch to grid or reduce load</td>
            </tr>
            <tr className="border-t">
              <td className="p-2">⚡ Overload</td>
              <td className="p-2">Load exceeds limit</td>
              <td className="p-2">Disconnect non-critical loads</td>
            </tr>
            <tr className="border-t">
              <td className="p-2">🔌 Grid Disconnection</td>
              <td className="p-2">No grid supply</td>
              <td className="p-2">System running on battery</td>
            </tr>
            <tr className="border-t">
              <td className="p-2">🛠 Maintenance Due</td>
              <td className="p-2">Scheduled servicing</td>
              <td className="p-2">Contact technician</td>
            </tr>
          </tbody>
        </table>
      </>
    )
  },
  {
    title: "Troubleshooting Guide",
    icon: <HelpCircle className="w-6 h-6 text-red-500 mr-2" />,
    content: (
      <>
        <ul className="list-disc ml-6">
          <li>Dashboard not showing data → Check internet/Wi-Fi</li>
          <li>False alert triggered → Recalibrate sensors</li>
          <li>Battery not charging → Inspect solar panel/charge controller</li>
          <li>Emergency → Press “System Shutdown” button or use hardware kill switch</li>
        </ul>
      </>
    )
  },
  {
    title: "Safety Instructions",
    icon: <AlertTriangle className="w-6 h-6 text-yellow-500 mr-2" />,
    content: (
      <>
        <ul className="list-disc ml-6">
          <li>Do not touch exposed wires while system is active</li>
          <li>Ensure proper earthing before operation</li>
          <li>Only authorized personnel should perform repairs</li>
          <li>Disconnect main supply before maintenance</li>
        </ul>
      </>
    )
  },
  {
    title: "Maintenance Guidelines",
    icon: <Settings className="w-6 h-6 text-green-500 mr-2" />,
    content: (
      <>
        <ul className="list-disc ml-6">
          <li>Clean solar panels once a month</li>
          <li>Check battery health monthly</li>
          <li>Inspect wiring/connections quarterly</li>
          <li>Back up data logs regularly</li>
        </ul>
      </>
    )
  },
  {
    title: "FAQs",
    icon: <HelpCircle className="w-6 h-6 text-blue-500 mr-2" />,
    content: (
      <>
        <ul className="list-disc ml-6">
          <li><b>Q1:</b> Can the system work without internet? <br />Yes, local monitoring works offline. Data syncs when internet is restored.</li>
          <li><b>Q2:</b> Can I add more solar panels later? <br />Yes, system is scalable. Update configuration in the Settings page.</li>
          <li><b>Q3:</b> How do I reset the system? <br />Press the reset button on the controller or use “Factory Reset” in the web app.</li>
        </ul>
      </>
    )
  },
  {
    title: "Contact Support",
    icon: <Phone className="w-6 h-6 text-green-500 mr-2" />,
    content: (
      <>
        <div className="flex flex-col space-y-1">
          <span><b>📞 Helpline:</b> +91-XXXXXXXXXX</span>
          <span><b>📧 Email:</b> <a href="mailto:support@microgrid.com" className="text-blue-600 underline">support@microgrid.com</a></span>
          <span><b>🌐 Website:</b> <a href="https://solar-tracker-zeta.vercel.app/" className="text-blue-600 underline">www.microgrid-system.com</a></span>
        </div>
      </>
    )
  },
];

const UserManual: React.FC = () => (
  <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-orange-100 to-blue-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 sm:p-6 lg:p-8">
    <div className="max-w-5xl mx-auto">
      <motion.div 
        className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 mb-8 border border-white/20 dark:border-gray-700/50 flex items-center gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <BookOpen className="w-10 h-10 text-orange-500" />
        <h1 className="text-3xl sm:text-4xl font-bold text-orange-700 dark:text-yellow-100">User Manual Guide</h1>
      </motion.div>
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

export default UserManual;
