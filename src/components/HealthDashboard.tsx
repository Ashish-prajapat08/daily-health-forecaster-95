import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Activity, Heart, Droplet, Scale, Moon } from 'lucide-react';

const HealthDashboard = ({ userData, predictionData }) => {
  if (!userData) {
    return <div>Loading user data...</div>;
  }

  // Weekly activity data (example, replace with actual user data)
  const activityData = [
    { day: 'Mon', steps: 8000, calories: 300, activityTime: 45 },
    { day: 'Tue', steps: 10000, calories: 400, activityTime: 60 },
    { day: 'Wed', steps: 9000, calories: 350, activityTime: 55 },
    { day: 'Thu', steps: 11000, calories: 450, activityTime: 70 },
    { day: 'Fri', steps: 9500, calories: 380, activityTime: 50 },
    { day: 'Sat', steps: 12000, calories: 500, activityTime: 80 },
    { day: 'Sun', steps: 7000, calories: 280, activityTime: 40 },
  ];

  // Health metrics data (example, replace with actual user data)
  const healthMetrics = [
    { name: 'Heart Rate', value: userData.heartRate },
    { name: 'Blood Pressure', value: userData.bloodPressure },
    { name: 'BMI', value: calculateBMI(userData.weight, userData.height) },
    { name: 'Blood Sugar', value: userData.bloodSugar },
    { name: 'Cholesterol', value: userData.cholesterol },
  ];

  // Water intake data (example, replace with actual user data)
  const waterIntakeData = [
    { name: 'Consumed', value: userData.hydrationLevel },
    { name: 'Remaining', value: 3.7 - userData.hydrationLevel }, // Assuming 3.7L is the daily goal
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Health Prediction Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <WeeklyActivityChart data={activityData} />
            <HealthMetricsChart data={healthMetrics} />
            <WaterIntakeChart data={waterIntakeData} />
          </div>
          <AnalyticalStatistics userData={userData} />
        </CardContent>
      </Card>
    </div>
  );
};

const WeeklyActivityChart = ({ data }) => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center"><Activity className="mr-2" /> Weekly Activity</CardTitle>
    </CardHeader>
    <CardContent>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
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
);

const HealthMetricsChart = ({ data }) => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center"><Heart className="mr-2" /> Health Metrics</CardTitle>
    </CardHeader>
    <CardContent>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
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
);

const WaterIntakeChart = ({ data }) => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center"><Droplet className="mr-2" /> Water Intake</CardTitle>
    </CardHeader>
    <CardContent>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
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
);

const AnalyticalStatistics = ({ userData }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
    <StatCard icon={Scale} title="BMI" value={calculateBMI(userData.weight, userData.height).toFixed(1)} />
    <StatCard icon={Activity} title="Daily Steps" value={userData.stepsPerDay.toLocaleString()} />
    <StatCard icon={Moon} title="Sleep Time" value={`${userData.averageSleep}h`} />
    <StatCard icon={Heart} title="Resting Heart Rate" value={`${userData.heartRate} bpm`} />
  </div>
);

const StatCard = ({ icon: Icon, title, value }) => (
  <Card>
    <CardContent className="flex items-center p-4">
      <Icon className="h-8 w-8 text-blue-500 mr-4" />
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </CardContent>
  </Card>
);

const calculateBMI = (weight, height) => {
  const heightInMeters = height / 100;
  return weight / (heightInMeters * heightInMeters);
};

export default HealthDashboard;