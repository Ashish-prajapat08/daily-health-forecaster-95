import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Mock data for the past 7 days
const activityData = [
  { day: 'Mon', exercise: 30, sleep: 7, heartRate: 72 },
  { day: 'Tue', exercise: 45, sleep: 6.5, heartRate: 75 },
  { day: 'Wed', exercise: 60, sleep: 8, heartRate: 70 },
  { day: 'Thu', exercise: 30, sleep: 7.5, heartRate: 73 },
  { day: 'Fri', exercise: 45, sleep: 7, heartRate: 74 },
  { day: 'Sat', exercise: 90, sleep: 9, heartRate: 68 },
  { day: 'Sun', exercise: 60, sleep: 8.5, heartRate: 71 },
];

const Activity = () => {
  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 dark:text-white">Activity for the Past 7 Days</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={activityData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis yAxisId="left" />
          <YAxis yAxisId="right" orientation="right" />
          <Tooltip />
          <Legend />
          <Bar yAxisId="left" dataKey="exercise" name="Exercise (minutes)" fill="#8884d8" />
          <Bar yAxisId="left" dataKey="sleep" name="Sleep (hours)" fill="#82ca9d" />
          <Bar yAxisId="right" dataKey="heartRate" name="Avg Heart Rate (bpm)" fill="#ffc658" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Activity;