import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const HealthDashboard = ({ predictionData }) => {
  // Mock data for charts (replace with actual data in a real application)
  const activityData = [
    { name: 'Mon', steps: 8000, calories: 300 },
    { name: 'Tue', steps: 10000, calories: 400 },
    { name: 'Wed', steps: 9000, calories: 350 },
    { name: 'Thu', steps: 11000, calories: 450 },
    { name: 'Fri', steps: 9500, calories: 380 },
    { name: 'Sat', steps: 12000, calories: 500 },
    { name: 'Sun', steps: 7000, calories: 280 },
  ];

  const healthMetrics = [
    { name: 'Heart Rate', value: 72 },
    { name: 'Blood Pressure', value: 120 },
    { name: 'Cholesterol', value: 180 },
  ];

  const waterIntakeData = [
    { name: 'Consumed', value: 6 },
    { name: 'Remaining', value: 4 },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Health Prediction Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          {predictionData ? (
            <>
              <p className="text-lg font-semibold">Possible Health Risks:</p>
              <ul className="list-disc list-inside">
                {predictionData.possibleDiseases.map((disease, index) => (
                  <li key={index}>{disease}</li>
                ))}
              </ul>
              <p className="mt-4 text-lg font-semibold">
                Overall Risk Level: <span className="text-yellow-500">{predictionData.riskLevel}</span>
              </p>
            </>
          ) : (
            <p>No prediction data available. Please submit the lifestyle form to see your health prediction.</p>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Weekly Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="steps" fill="#8884d8" name="Steps" />
                <Bar yAxisId="right" dataKey="calories" fill="#82ca9d" name="Calories Burned" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Health Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={healthMetrics}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Water Intake</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={waterIntakeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HealthDashboard;