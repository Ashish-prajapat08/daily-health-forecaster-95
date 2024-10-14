import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const HealthDashboard = ({ predictionData }) => {
  const mockData = [
    { name: 'Exercise', value: 3 },
    { name: 'Sleep', value: 7 },
    { name: 'Stress', value: 5 },
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

      <Card>
        <CardHeader>
          <CardTitle>Lifestyle Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={mockData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default HealthDashboard;