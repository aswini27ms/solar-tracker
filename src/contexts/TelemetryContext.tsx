import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Alert {
  id: string;
  severity: 'critical' | 'warning' | 'info';
  message: string;
  timestamp: Date;
  category: string;
  acknowledged: boolean;
}

interface TelemetryContextType {
  alerts: Alert[];
  acknowledgeAlert: (id: string) => void;
  acknowledgeAllAlerts: () => void;
  addAlert: (alert: Omit<Alert, 'id' | 'timestamp' | 'acknowledged'>) => void;
}

const TelemetryContext = createContext<TelemetryContextType | undefined>(undefined);

export const useTelemetry = () => {
  const context = useContext(TelemetryContext);
  if (!context) {
    throw new Error('useTelemetry must be used within a TelemetryProvider');
  }
  return context;
};

interface TelemetryProviderProps {
  children: ReactNode;
}

export const TelemetryProvider: React.FC<TelemetryProviderProps> = ({ children }) => {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  // Simulate live telemetry data with mock alerts
  useEffect(() => {
    // Initial mock alerts
    const initialAlerts: Alert[] = [
      {
        id: '1',
        severity: 'critical',
        message: 'Battery temperature exceeding safe threshold',
        timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
        category: 'Battery',
        acknowledged: false
      },
      {
        id: '2',
        severity: 'warning',
        message: 'Solar panel efficiency below optimal range',
        timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
        category: 'Solar',
        acknowledged: false
      },
      {
        id: '3',
        severity: 'info',
        message: 'System maintenance scheduled for tomorrow',
        timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
        category: 'System',
        acknowledged: false
      }
    ];
    setAlerts(initialAlerts);

    // Simulate new alerts coming in
    const interval = setInterval(() => {
      if (Math.random() > 0.7) { // 30% chance every 10 seconds
        const severities: ('critical' | 'warning' | 'info')[] = ['critical', 'warning', 'info'];
        const categories = ['Battery', 'Solar', 'System', 'Grid', 'Inverter'];
        const messages = [
          'Unusual power fluctuation detected',
          'System performance optimization available',
          'Component requires attention',
          'Energy production below expected',
          'System operating normally'
        ];

        const newAlert: Omit<Alert, 'id' | 'timestamp' | 'acknowledged'> = {
          severity: severities[Math.floor(Math.random() * severities.length)],
          message: messages[Math.floor(Math.random() * messages.length)],
          category: categories[Math.floor(Math.random() * categories.length)]
        };

        addAlert(newAlert);
      }
    }, 10000); // Every 10 seconds

    return () => clearInterval(interval);
  }, []);

  const acknowledgeAlert = (id: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === id ? { ...alert, acknowledged: true } : alert
    ));
  };

  const acknowledgeAllAlerts = () => {
    setAlerts(prev => prev.map(alert => ({ ...alert, acknowledged: true })));
  };

  const addAlert = (alert: Omit<Alert, 'id' | 'timestamp' | 'acknowledged'>) => {
    const newAlert: Alert = {
      ...alert,
      id: Date.now().toString(),
      timestamp: new Date(),
      acknowledged: false
    };
    setAlerts(prev => [newAlert, ...prev]);
  };

  const value: TelemetryContextType = {
    alerts: alerts.filter(alert => !alert.acknowledged),
    acknowledgeAlert,
    acknowledgeAllAlerts,
    addAlert
  };

  return (
    <TelemetryContext.Provider value={value}>
      {children}
    </TelemetryContext.Provider>
  );
};
