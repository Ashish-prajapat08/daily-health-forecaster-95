import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Activity, Heart, Droplet, Scale, Moon, AlertTriangle, Award, Lightbulb } from 'lucide-react';
import { generateInsights, Insight } from '../utils/healthInsights';
import { Button } from '@/components/ui/button';

interface ProgressTrackingProps {
  userData: any; // Replace 'any' with a more specific type if available
}

const ProgressTracking: React.FC<ProgressTrackingProps> = ({ userData }) => {
  const [insights, setInsights] = useState<Insight[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month'>('week');

  useEffect(() => {
    if (userData) {
      setInsights(generateInsights([userData])); // Wrap userData in an array if it's not already one
    }
  }, [userData]);

  // Create an array of data points for charts
  const createDataArray = () => {
    if (!userData) return [];
    const dataArray = [];
    for (let i = 0; i < 7; i++) { // Create 7 data points for a week
      dataArray.push({
        date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        ...userData
      });
    }
    return dataArray;
  };

  const chartData = createDataArray();
  const filteredData = selectedPeriod === 'week' ? chartData : chartData;

  const renderInsightIcon = (type: Insight['type']) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="text-yellow-500" />;
      case 'achievement':
        return <Award className="text-green-500" />;
      case 'suggestion':
        return <Lightbulb className="text-blue-500" />;
    }
  };

  if (!userData) {
    return <div>No data available. Please input your health data in the dashboard.</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold dark:text-white">Progress Tracking</h2>
        <div>
          <Button
            variant={selectedPeriod === 'week' ? 'default' : 'outline'}
            onClick={() => setSelectedPeriod('week')}
            className="mr-2"
          >
            Week
          </Button>
          <Button
            variant={selectedPeriod === 'month' ? 'default' : 'outline'}
            onClick={() => setSelectedPeriod('month')}
          >
            Month
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>AI-Powered Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {insights.map((insight, index) => (
              <li key={index} className="flex items-center">
                {renderInsightIcon(insight.type)}
                <span className="ml-2">{insight.message}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center"><Scale className="mr-2" /> Weight and Body Fat</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={filteredData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="weight" stroke="#8884d8" name="Weight (kg)" />
              <Line yAxisId="right" type="monotone" dataKey="bodyFatPercentage" stroke="#82ca9d" name="Body Fat (%)" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center"><Activity className="mr-2" /> Daily Steps vs Calories Burned</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={filteredData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="dailySteps" stroke="#8884d8" name="Steps" />
              <Line yAxisId="right" type="monotone" dataKey="calories" stroke="#82ca9d" name="Calories Burned" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center"><Heart className="mr-2" /> Heart Rate and Stress Level</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={filteredData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="heartRate" stroke="#ff7300" name="Heart Rate (bpm)" />
              <Line yAxisId="right" type="monotone" dataKey="stressLevel" stroke="#413ea0" name="Stress Level" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center"><Moon className="mr-2" /> Sleep Hours</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={filteredData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="sleepHours" fill="#82ca9d" name="Sleep (hours)" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center"><Droplet className="mr-2" /> Water Intake</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={filteredData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="waterIntake" stroke="#8884d8" name="Water (glasses)" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProgressTracking;