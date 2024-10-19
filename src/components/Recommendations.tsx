import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const recommendations = [
  { title: 'Increase Daily Steps', description: 'Aim for at least 10,000 steps per day to improve cardiovascular health.' },
  { title: 'Improve Sleep Quality', description: 'Try to get 7-9 hours of sleep per night and maintain a consistent sleep schedule.' },
  { title: 'Balanced Diet', description: 'Include more fruits, vegetables, and whole grains in your diet. Limit processed foods.' },
  { title: 'Stress Management', description: 'Practice mindfulness or meditation for 10-15 minutes daily to reduce stress levels.' },
  { title: 'Regular Exercise', description: 'Engage in moderate-intensity exercise for at least 150 minutes per week.' },
];

const Recommendations = () => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6 dark:text-white">Health Recommendations</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {recommendations.map((rec, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{rec.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{rec.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Recommendations;