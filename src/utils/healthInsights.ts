import { HealthData } from './mockDataGenerator';

export interface Insight {
  type: 'warning' | 'achievement' | 'suggestion';
  message: string;
}

export const generateInsights = (data: HealthData[] | null): Insight[] => {
  const insights: Insight[] = [];

  // Check if data is null or empty
  if (!data || data.length === 0) {
    return [{ type: 'suggestion', message: 'Start tracking your health data to receive insights.' }];
  }

  // Check for decreasing step count
  const recentSteps = data.slice(-7).map(d => d.steps);
  if (recentSteps.every((val, i, arr) => i === 0 || val <= arr[i - 1])) {
    insights.push({
      type: 'warning',
      message: 'Your step count has been decreasing over the past week. Try to increase your daily activity.',
    });
  }

  // Check for improving sleep pattern
  const recentSleep = data.slice(-7).map(d => d.sleepHours);
  if (recentSleep.every((val, i, arr) => i === 0 || val >= arr[i - 1])) {
    insights.push({
      type: 'achievement',
      message: 'Great job! Your sleep duration has been consistently improving.',
    });
  }

  // Suggest increasing water intake if it's consistently low
  const averageWaterIntake = data.reduce((sum, d) => sum + d.waterIntake, 0) / data.length;
  if (averageWaterIntake < 6) {
    insights.push({
      type: 'suggestion',
      message: 'Try to increase your daily water intake to at least 8 glasses for better hydration.',
    });
  }

  return insights;
};