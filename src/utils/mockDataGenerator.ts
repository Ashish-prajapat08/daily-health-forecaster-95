import { addDays, format } from 'date-fns';

export interface HealthData {
  date: string;
  weight: number;
  bodyFat: number;
  steps: number;
  heartRate: number;
  sleepHours: number;
  waterIntake: number;
  stress: number;
  calories: number;
}

export const generateMockData = (days = 30): HealthData[] => {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  return Array.from({ length: days }, (_, index) => {
    const date = addDays(startDate, index);
    return {
      date: format(date, 'yyyy-MM-dd'),
      weight: 75 + Math.random() * 5,
      bodyFat: 20 + Math.random() * 5,
      steps: 5000 + Math.floor(Math.random() * 7000),
      heartRate: 60 + Math.floor(Math.random() * 30),
      sleepHours: 6 + Math.random() * 3,
      waterIntake: 4 + Math.random() * 4,
      stress: 1 + Math.random() * 9,
      calories: 1800 + Math.random() * 500,
    };
  });
};