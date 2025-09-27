import React from "react";
import { motion } from "framer-motion";
import { AlertTriangle, Info, CheckCircle, Clock } from "lucide-react";
import AlertAnimation from "./AlertAnimation";
import { useTranslation } from "react-i18next";

type AlertType = "warning" | "info" | "success" | "error";

type Severity = "high" | "medium" | "low";

interface AlertItem {
  id: number;
  type: AlertType;
  messageKey: string;
  timestamp: string;
  severity: Severity;
}

const alerts: AlertItem[] = [
  {
    id: 1,
    type: "warning",
    messageKey: "alerts-user.items.lowBattery",
    timestamp: "2025-09-21 10:15",
    severity: "high"
  },
  {
    id: 2,
    type: "info",
    messageKey: "alerts-user.items.maintenanceDue",
    timestamp: "2025-09-20 09:00",
    severity: "medium"
  },
  {
    id: 3,
    type: "success",
    messageKey: "alerts-user.items.systemOptimal",
    timestamp: "2025-09-21 08:00",
    severity: "low"
  },
  {
    id: 4,
    type: "error",
    messageKey: "alerts-user.items.inverterFault",
    timestamp: "2025-09-21 07:45",
    severity: "high"
  }
];

const Alerts: React.FC = () => {
  const { t } = useTranslation();

  const getAlertIcon = (type: AlertType) => {
    switch (type) {
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case "info":
        return <Info className="w-5 h-5 text-blue-500" />;
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "error":
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      default:
        return <AlertTriangle className="w-5 h-5 text-gray-400" />;
    }
  };

  const severityBadgeClasses = (sev: Severity) =>
    `px-2 py-1 rounded-full text-xs font-medium ${
      sev === "high"
        ? "bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-400"
        : sev === "medium"
        ? "bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-400"
        : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
    }`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-orange-100 to-blue-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 sm:p-6 lg:p-8 flex flex-col items-center">
      <AlertAnimation className="w-32 h-32 mb-2" />
      <div className="max-w-2xl w-full mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            {t("alerts-user.title")}
          </h2>
          <div className="space-y-4">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className={`flex items-start space-x-3 p-4 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm ${
                  alert.severity === "high"
                    ? "bg-red-50 dark:bg-red-900/20"
                    : alert.severity === "medium"
                    ? "bg-yellow-50 dark:bg-yellow-900/20"
                    : "bg-gray-50 dark:bg-gray-900/20"
                }`}
              >
                <div>{getAlertIcon(alert.type)}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                    {t(alert.messageKey)}
                  </p>
                  <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                    <Clock className="w-3 h-3" />
                    <span>{t("alerts-user.timestamp", { value: alert.timestamp })}</span>
                  </div>
                </div>
                <div className={severityBadgeClasses(alert.severity)}>
                  {t(`alerts-user.severity.${alert.severity}`)}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Alerts;
