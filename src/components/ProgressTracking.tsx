import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const mockData = [
  { date: '2023-01-01', weight: 80, bodyFat: 25, steps: 8000 },
  { date: '2023-02-01', weight: 79, bodyFat: 24, steps: 8500 },
  { date: '2023-03-01', weight: 78, bodyFat: 23, steps: 9000 },
  { date: '2023-04-01', weight: 77, bodyFat: 22, steps: 9500 },
  { date: '2023-05-01', weight: 76, bodyFat: 21, steps: 10000 },
  { date: '2023-06-01', weight: 75, bodyFat: 20, steps: 10500 },
];

const ProgressTracking = () => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6 dark:text-white">Progress Tracking</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={mockData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis yAxisId="left" />
          <YAxis yAxisId="right" orientation="right" />
          <Tooltip />
          <Legend />
          <Line yAxisId="left" type="monotone" dataKey="weight" stroke="#8884d8" name="Weight (kg)" />
          <Line yAxisId="left" type="monotone" dataKey="bodyFat" stroke="#82ca9d" name="Body Fat (%)" />
          <Line yAxisId="right" type="monotone" dataKey="steps" stroke="#ffc658" name="Daily Steps" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProgressTracking;