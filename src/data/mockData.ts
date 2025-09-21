export const mockSolarData = {
  currentStats: {
    powerOutput: 4.2, // kW
    voltage: 48.3, // V
    current: 87.1, // A
    efficiency: 92.4, // %
    batteryLevel: 78.5, // %
    irradiance: 850, // W/m²
    temperature: 28, // °C
    co2Saved: 2.3, // tons today
    energyGenerated: 34.7 // kWh today
  },
  
  liveData: [
    { time: '06:00', power: 0.5 },
    { time: '07:00', power: 1.2 },
    { time: '08:00', power: 2.8 },
    { time: '09:00', power: 3.5 },
    { time: '10:00', power: 4.1 },
    { time: '11:00', power: 4.6 },
    { time: '12:00', power: 4.8 },
    { time: '13:00', power: 4.7 },
    { time: '14:00', power: 4.2 },
    { time: '15:00', power: 3.8 },
    { time: '16:00', power: 3.2 },
    { time: '17:00', power: 2.1 },
    { time: '18:00', power: 0.8 }
  ],

  weeklyData: [
    { day: 'Mon', energy: 28.5, efficiency: 89.2 },
    { day: 'Tue', energy: 32.1, efficiency: 91.8 },
    { day: 'Wed', energy: 29.8, efficiency: 88.7 },
    { day: 'Thu', energy: 35.2, efficiency: 93.1 },
    { day: 'Fri', energy: 31.7, efficiency: 90.4 },
    { day: 'Sat', energy: 33.9, efficiency: 92.6 },
    { day: 'Sun', energy: 34.7, efficiency: 92.4 }
  ],

  alerts: [
    {
      id: 1,
      type: 'warning',
      message: 'Panel 3 efficiency below optimal (87%)',
      timestamp: '2 hours ago',
      severity: 'medium'
    },
    {
      id: 2,
      type: 'info',
      message: 'Maintenance scheduled for tomorrow',
      timestamp: '4 hours ago',
      severity: 'low'
    },
    {
      id: 3,
      type: 'success',
      message: 'Daily energy target achieved!',
      timestamp: '6 hours ago',
      severity: 'low'
    }
  ],

  weather: {
    current: {
      condition: 'Sunny',
      temperature: 28,
      humidity: 45,
      windSpeed: 12
    },
    forecast: [
      { day: 'Today', condition: 'Sunny', high: 30, low: 22, icon: '☀️' },
      { day: 'Tomorrow', condition: 'Partly Cloudy', high: 28, low: 20, icon: '⛅' },
      { day: 'Wednesday', condition: 'Sunny', high: 32, low: 24, icon: '☀️' }
    ]
  }
};

export const generateLiveData = () => {
  const now = new Date();
  const hour = now.getHours();
  const minute = now.getMinutes();
  
  // Simulate power curve based on time of day
  let basePower = 0;
  if (hour >= 6 && hour <= 18) {
    const timeFromSunrise = hour - 6 + minute / 60;
    const peakTime = 6; // 12 PM is peak
    basePower = 4.8 * Math.exp(-0.5 * Math.pow((timeFromSunrise - peakTime) / 3, 2));
  }
  
  // Add some randomness
  const randomVariation = (Math.random() - 0.5) * 0.5;
  return Math.max(0, basePower + randomVariation);
};