import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Activity, Heart, Droplet, Scale, Moon, AlertTriangle } from 'lucide-react';

const HealthDashboard = ({ userData, predictionData }) => {
  if (!userData) {
    return <div>Loading user data...</div>;
  }

  const activityData = [
    { day: 'Mon', steps: userData.dailySteps, calories: 300, activityTime: 45 },
    { day: 'Tue', steps: userData.dailySteps, calories: 400, activityTime: 60 },
    { day: 'Wed', steps: userData.dailySteps, calories: 350, activityTime: 55 },
    { day: 'Thu', steps: userData.dailySteps, calories: 450, activityTime: 70 },
    { day: 'Fri', steps: userData.dailySteps, calories: 380, activityTime: 50 },
    { day: 'Sat', steps: userData.dailySteps, calories: 500, activityTime: 80 },
    { day: 'Sun', steps: userData.dailySteps, calories: 280, activityTime: 40 },
  ];

  // Health metrics data
  const healthMetrics = [
    { name: 'Heart Rate', value: userData.heartRate },
    { name: 'Blood Pressure', value: userData.bloodPressure },
    { name: 'BMI', value: calculateBMI(userData.weight, userData.height) },
    { name: 'Body Fat', value: userData.bodyFatPercentage },
    { name: 'Cholesterol', value: userData.cholesterolLevel },
  ];

  // Water intake data
  const waterIntakeData = [
    { name: 'Consumed', value: userData.waterIntake },
    { name: 'Remaining', value: 8 - userData.waterIntake }, // Assuming 8 glasses is the daily goal
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
          <HealthRiskAssessment predictionData={predictionData} />
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
    <StatCard icon={Scale} title="BMI" value={calculateBMI(userData.weight, userData.height).toFixed(1)} bgColor="bg-blue-100" />
    <StatCard icon={Activity} title="Daily Steps" value={userData.dailySteps ? userData.dailySteps.toLocaleString() : 'N/A'} bgColor="bg-green-100" />
    <StatCard icon={Moon} title="Sleep Time" value={`${userData.sleepHours || 'N/A'}h`} bgColor="bg-indigo-100" />
    <StatCard icon={Heart} title="Resting Heart Rate" value={`${userData.heartRate || 'N/A'} bpm`} bgColor="bg-red-100" />
  </div>
);

const StatCard = ({ icon: Icon, title, value, bgColor }) => (
  <Card className={`${bgColor} transition-colors hover:bg-opacity-80`}>
    <CardContent className="flex items-center p-4">
      <Icon className="h-8 w-8 text-gray-600 mr-4" />
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
      </div>
    </CardContent>
  </Card>
);

const HealthRiskAssessment = ({ predictionData }) => (
  <div className="mt-6">
    <h3 className="text-xl font-semibold mb-4 flex items-center">
      <AlertTriangle className="mr-2 text-yellow-500" />
      Health Risk Assessment
    </h3>
    <div className="bg-yellow-50 dark:bg-yellow-900 p-4 rounded-lg">
      <p className="font-medium mb-2">Possible Health Risks:</p>
      <ul className="list-disc list-inside mb-4">
        {predictionData.possibleDiseases.map((disease, index) => (
          <li key={index}>{disease}</li>
        ))}
      </ul>
      <p className="font-medium">
        Overall Risk Level: <span className="text-red-600 dark:text-red-400">{predictionData.riskLevel}</span>
      </p>
    </div>
  </div>
);

const calculateBMI = (weight, height) => {
  const heightInMeters = height / 100;
  return weight / (heightInMeters * heightInMeters);
};

export default HealthDashboard;
