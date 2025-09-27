import React, { useState, useEffect } from 'react';
import { Zap, Battery, Gauge, Leaf, Download, FileText, Sun, Cloud, CloudRain } from 'lucide-react';
import { useTranslation } from 'react-i18next';

// Mock data
const mockSolarData = {
  currentStats: {
    powerOutput: 4.2,
    voltage: 240,
    current: 17.5,
    efficiency: 87.3,
    batteryLevel: 85,
    irradiance: 850,
    temperature: 25,
    co2Saved: 2.4,
    energyGenerated: 28.5
  },
  weeklyData: [
    { day: 'Mon', energy: 45.2, efficiency: 88.1 },
    { day: 'Tue', energy: 42.8, efficiency: 85.6 },
    { day: 'Wed', energy: 48.1, efficiency: 90.2 },
    { day: 'Thu', energy: 39.7, efficiency: 82.4 },
    { day: 'Fri', energy: 51.3, efficiency: 92.8 },
    { day: 'Sat', energy: 46.9, efficiency: 89.3 },
    { day: 'Sun', energy: 44.5, efficiency: 87.7 }
  ],
  alerts: [
    { type: 'warning', message: 'Panel cleaning recommended for optimal performance', timestamp: '2024-03-15 10:30', severity: 'Medium' },
    { type: 'info', message: 'Battery maintenance scheduled for next week', timestamp: '2024-03-15 09:15', severity: 'Low' },
    { type: 'success', message: 'System performance is optimal', timestamp: '2024-03-15 08:00', severity: 'Low' }
  ],
  weather: {
    current: { condition: 'Sunny', temperature: 28, humidity: 65, windSpeed: 12 },
    forecast: [
      { day: 'Today', condition: 'Sunny', high: 28, low: 18 },
      { day: 'Tomorrow', condition: 'Partly Cloudy', high: 26, low: 16 },
      { day: 'Day 3', condition: 'Cloudy', high: 24, low: 15 }
    ]
  }
};

// Generate live data
const generateLiveData = () => parseFloat((Math.random() * 2 + 3).toFixed(1));

// Initial live data
const initialLiveData = Array.from({ length: 12 }, (_, i) => ({
  time: new Date(Date.now() - (11 - i) * 5 * 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  power: generateLiveData()
}));

const StatCard = ({ title, value, unit, icon: Icon, change, changeType }) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 transform hover:scale-105 transition-all duration-200">
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
          <Icon className="w-6 h-6 text-orange-600 dark:text-orange-400" />
        </div>
        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</h3>
      </div>
    </div>
    <div className="flex items-end justify-between">
      <div>
        <p className="text-2xl font-bold text-gray-900 dark:text-white">
          {value}
          <span className="text-lg font-normal text-gray-500 dark:text-gray-400 ml-1">{unit}</span>
        </p>
        <p className={`text-sm font-medium ${changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>{change}</p>
      </div>
    </div>
  </div>
);

const ChartCard = ({ title, subtitle, data, type, dataKey, xAxisKey, color }) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
    <div className="mb-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400">{subtitle}</p>
    </div>
    <div className="h-64">
      {type === 'line' ? (
        <div className="w-full h-full relative">
          <svg viewBox="0 0 400 200" className="w-full h-full">
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={color} stopOpacity="0.3"/>
                <stop offset="100%" stopColor={color} stopOpacity="0.1"/>
              </linearGradient>
            </defs>
            {data.map((point, index) => {
              const x = (index / (data.length - 1)) * 350 + 25;
              const y = 180 - (point[dataKey] / 6) * 150;
              return (
                <g key={index}>
                  <circle cx={x} cy={y} r="3" fill={color} />
                  {index > 0 && (
                    <line
                      x1={(index - 1) / (data.length - 1) * 350 + 25}
                      y1={180 - (data[index - 1][dataKey] / 6) * 150}
                      x2={x}
                      y2={y}
                      stroke={color}
                      strokeWidth="2"
                    />
                  )}
                </g>
              );
            })}
          </svg>
        </div>
      ) : (
        <div className="w-full h-full flex items-end space-x-2">
          {data.map((item, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div
                className="w-full rounded-t"
                style={{
                  height: `${(item[dataKey] / 55) * 100}%`,
                  backgroundColor: color,
                  minHeight: '4px'
                }}
              />
              <span className="text-xs text-gray-600 dark:text-gray-400 mt-2">{item[xAxisKey]}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
);

// Helpers to convert conditions and severities to localized labels and icons
const getLocalizedCondition = (raw: string, t: any) => {
  const condition = (raw || '').toLowerCase();
  const mapping = {
    'partly cloudy': 'weather.partlyCloudy',
    'sunny': 'weather.sunny',
    'rain': 'weather.rainy',
    'cloudy': 'weather.cloudy'
  };

  for (const [key, value] of Object.entries(mapping)) {
    if (condition.includes(key)) {
      return t(value);
    }
  }

  return t('weather.unknown');
};

const getConditionIcon = (raw) => {
  const c = (raw || '').toLowerCase();
  if (c.includes('partly') && c.includes('cloud')) return <Cloud className="w-8 h-8 text-gray-500" />;
  if (c.includes('sun')) return <Sun className="w-8 h-8 text-yellow-500" />;
  if (c.includes('rain')) return <CloudRain className="w-8 h-8 text-blue-500" />;
  if (c.includes('cloud')) return <Cloud className="w-8 h-8 text-gray-600" />;
  return <Sun className="w-8 h-8 text-yellow-500" />;
};

const getSeverityBadge = (sev) => {
  if ((sev || '').toLowerCase() === 'medium') return 'bg-yellow-100 text-yellow-800';
  if ((sev || '').toLowerCase() === 'high') return 'bg-red-100 text-red-800';
  return 'bg-gray-100 text-gray-800';
};

const AlertsPanel = ({ alerts, title }) => {
  const { t } = useTranslation();
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{title || t('admin_alerts_title')}</h3>
      <div className="space-y-3">
        {alerts.map((alert, index) => {
          let severityText = alert.severity.toLowerCase();
          let severityTranslation = 
            severityText === 'high' ? t('alerts-dashboard.severityHigh') :
            severityText === 'medium' ? t('alerts-dashboard.severityMedium') :
            t('alerts-dashboard.severityLow');
          
          let messageTranslation = 
            alert.message.includes('Panel cleaning') ? t('alerts-dashboard.panelCleaning') :
            alert.message.includes('Battery maintenance') ? t('alerts-dashboard.batteryMaintenance') :
            t('alerts-dashboard.systemOptimal');
          
          return (
            <div
              key={index}
              className={`p-4 rounded-lg border-l-4 ${
                alert.type === 'warning'
                  ? 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-400'
                  : alert.type === 'success'
                  ? 'bg-green-50 dark:bg-green-900/20 border-green-400'
                  : 'bg-blue-50 dark:bg-blue-900/20 border-blue-400'
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{messageTranslation}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {t('report.timestamp')}: {alert.timestamp}
                  </p>
                </div>
                <span className={`px-2 py-1 text-xs rounded ${getSeverityBadge(alert.severity)}`}>
                  {t('report.severity')}: {severityTranslation}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const WeatherWidget = () => {
  const { t } = useTranslation();
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{t('dashboard-users.weather')}</h3>

      <div className="mb-6">
        <div className="flex items-center space-x-4">
          {getConditionIcon(mockSolarData.weather.current.condition)}
          <div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {mockSolarData.weather.current.temperature}°C
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {getLocalizedCondition(mockSolarData.weather.current.condition, t)}
            </p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">{t('weather.humidity')}</p>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              {mockSolarData.weather.current.humidity}%
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">{t('weather.windSpeed')}</p>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              {mockSolarData.weather.current.windSpeed} {t('weather.windSpeedUnit')}
            </p>
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">{t('weather.forecast')}</h4>
        <div className="space-y-2">
          {mockSolarData.weather.forecast.map((day, index) => {
            let dayLabel = t('weather.today');
            if (index === 1) dayLabel = t('weather.tomorrow');
            if (index === 2) dayLabel = t('weather.day3');
            
            return (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">{dayLabel}</span>
                <div className="flex items-center space-x-2">
                  {getConditionIcon(day.condition)}
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {getLocalizedCondition(day.condition, t)} • {day.high}°/{day.low}°
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// Main Dashboard Component
const Dashboard = () => {
  const { t } = useTranslation();
  const [liveData, setLiveData] = useState(initialLiveData);
  const [currentPower, setCurrentPower] = useState(mockSolarData.currentStats.powerOutput);

  // simulate live data updates
  useEffect(() => {
    const interval = setInterval(() => {
      const newPower = generateLiveData();
      setCurrentPower(newPower);
      setLiveData(prev => {
        const newData = [...prev.slice(1)];
        const now = new Date();
        const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        newData.push({ time: timeString, power: newPower });
        return newData;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleDownloadReport = (format: 'csv' | 'pdf') => {
    const timestamp = new Date().toISOString().split('T')[0];
    const filename = `solar-report-${timestamp}`;
    if (format === 'csv') downloadCSV(filename);
    if (format === 'pdf') downloadPDF(filename);
  };

  const downloadCSV = (filename: string) => {
    const csvData = [
      [t('dashboard.title'), ''],
      ['Generated Date', new Date().toLocaleString()],
      ['', ''],
      ['Current Statistics', ''],
      ['Metric', 'Value', 'Unit'],
      [t('dashboard.powerOutput'), mockSolarData.currentStats.powerOutput, 'kW'],
      [t('dashboard.batteryLevel'), mockSolarData.currentStats.batteryLevel, '%'],
      [t('dashboard.efficiency'), mockSolarData.currentStats.efficiency, '%'],
      [t('dashboard.co2Saved'), mockSolarData.currentStats.co2Saved, 'tons'],
      ['', ''],
      [t('dashboard.livePower'), ''],
      ['Time', `${t('dashboard.powerOutput')} (kW)`],
      ...liveData.map(item => [item.time, item.power]),
      ['', ''],
      [t('dashboard.weeklyEnergy'), ''],
      ['Day', 'Energy (kWh)', 'Efficiency (%)'],
      ...mockSolarData.weeklyData.map(item => [item.day, item.energy, item.efficiency]),
      ['', ''],
      [t('dashboard.alerts'), ''],
      [t('dashboard.timestamp'), t('dashboard.severity'), 'Message'],
      ...mockSolarData.alerts.map(a => [a.timestamp, a.severity, a.message]),
      ['', ''],
      [t('dashboard.weather'), ''],
      [t('dashboard.temperature'), `${mockSolarData.weather.current.temperature}°C`],
      [t('dashboard.humidity'), `${mockSolarData.weather.current.humidity}%`],
      [t('dashboard.wind'), `${mockSolarData.weather.current.windSpeed} ${t('dashboard.windSpeedUnit')}`],
      ['', ''],
      [t('dashboard.forecast3Day'), ''],
      [t('dashboard.day'), t('dashboard.condition'), `${t('dashboard.high')} (°C)`, `${t('dashboard.low')} (°C)`],
      ...mockSolarData.weather.forecast.map(f => [
        f.day,
        getLocalizedCondition(f.condition, t),
        f.high,
        f.low
      ])
    ];

    const csvString = csvData.map(row => row.map(field => `"${field}"`).join(',')).join('\n');
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadPDF = (filename: string) => {
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>${t('report.title')}</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          h1 { color: #f97316; }
          h2 { color: #333; border-bottom: 2px solid #f97316; padding-bottom: 5px; }
          table { width: 100%; border-collapse: collapse; margin: 10px 0; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          th { background-color: #f97316; color: white; }
        </style>
      </head>
      <body>
        <h1>${t('report.title')}</h1>
        <p><strong>${t('report.generatedDate')}:</strong> ${new Date().toLocaleString()}</p>

        <h2>${t('kpi.section')}</h2>
        <p><strong>${t('dashboard-users.powerOutput')}:</strong> ${mockSolarData.currentStats.powerOutput} kW</p>
        <p><strong>${t('dashboard-users.batteryLevel')}:</strong> ${mockSolarData.currentStats.batteryLevel}%</p>
        <p><strong>${t('dashboard-users.efficiency')}:</strong> ${mockSolarData.currentStats.efficiency}%</p>
        <p><strong>${t('dashboard-users.co2Saved')}:</strong> ${mockSolarData.currentStats.co2Saved} tons</p>

        <h2>${t('dashboard-users.alerts')}</h2>
        <table>
          <thead><tr><th>${t('report.timestamp')}</th><th>${t('report.severity')}</th><th>${t('report.message')}</th></tr></thead>
          <tbody>
            ${mockSolarData.alerts.map(a => 
              `<tr><td>${a.timestamp}</td><td>${a.severity}</td><td>${
                a.message.includes('Panel cleaning') ? t('alerts-dashboard.panelCleaning') :
                a.message.includes('Battery maintenance') ? t('alerts-dashboard.batteryMaintenance') :
                t('alerts-dashboard.systemOptimal')
              }</td></tr>`
            ).join('')}
          </tbody>
        </table>

        <h2>${t('dashboard-users.weather')}</h2>
        <table>
          <tbody>
            <tr><td>${t('output.temperature')}</td><td>${mockSolarData.weather.current.temperature}°C</td></tr>
            <tr><td>${t('weather.humidity')}</td><td>${mockSolarData.weather.current.humidity}%</td></tr>
            <tr><td>${t('weather.windSpeed')}</td><td>${mockSolarData.weather.current.windSpeed} ${t('weather.windSpeedUnit')}</td></tr>
          </tbody>
        </table>

        <h2>${t('weather.forecast')}</h2>
        <table>
          <thead>
            <tr><th>${t('report.day')}</th><th>${t('weather.condition')}</th><th>${t('report.high')} (°C)</th><th>${t('report.low')} (°C)</th></tr>
          </thead>
          <tbody>
            ${mockSolarData.weather.forecast.map((f, index) => {
              let dayLabel = index === 0 ? t('weather.today') :
                          index === 1 ? t('weather.tomorrow') :
                          t('weather.day3');
              return `<tr><td>${dayLabel}</td><td>${getLocalizedCondition(f.condition, t)}</td><td>${f.high}</td><td>${f.low}</td></tr>`;
            }).join('')}
          </tbody>
        </table>
      </body>
      </html>
    `;

    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}.html`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Styles for header language buttons
  const langBtn = (active: boolean) =>
    `px-3 py-2 rounded-md text-sm font-medium border ${
      active
        ? 'bg-orange-600 text-white border-orange-700'
        : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 hover:bg-orange-50 dark:hover:bg-gray-700'
    }`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-orange-100 to-blue-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{t('dashboard-users.title')}</h1>
              <p className="text-gray-600 dark:text-gray-400">{t('dashboard-users.subtitle')}</p>
            </div>

            <div className="flex items-center space-x-2 mt-4 sm:mt-0">
              <button
                onClick={() => handleDownloadReport('csv')}
                className="flex items-center space-x-2 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>{t('dashboard-users.csvReport')}</span>
              </button>

              <button
                onClick={() => handleDownloadReport('pdf')}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
              >
                <FileText className="w-4 h-4" />
                <span>{t('dashboard-users.pdfReport')}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard title={t('dashboard-users.powerOutput')} value={currentPower} unit="kW" icon={Zap} change="+2.3%" changeType="positive" />
          <StatCard title={t('dashboard-users.batteryLevel')} value={mockSolarData.currentStats.batteryLevel} unit="%" icon={Battery} change="+5.1%" changeType="positive" />
          <StatCard title={t('dashboard-users.efficiency')} value={mockSolarData.currentStats.efficiency} unit="%" icon={Gauge} change="-0.8%" changeType="negative" />
          <StatCard title={t('dashboard-users.co2Saved')} value={mockSolarData.currentStats.co2Saved} unit="tons" icon={Leaf} change="+12.5%" changeType="positive" />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <ChartCard title={t('dashboard-users.livePower')} subtitle={t('output.liveData')} data={liveData} type="line" dataKey="power" xAxisKey="time" color="#f97316" />
          <ChartCard title={t('dashboard-users.weeklyEnergy')} subtitle={t('report.weeklyProduction')} data={mockSolarData.weeklyData} type="bar" dataKey="energy" xAxisKey="day" color="#eab308" />
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <AlertsPanel alerts={mockSolarData.alerts} title={t('dashboard-users.alerts')} />
          </div>
          <WeatherWidget />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
