import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import LifestyleForm from '../components/LifestyleForm';
import HealthDashboard from '../components/HealthDashboard';
import Profile from '../components/Profile';
import Settings from '../components/Settings';
import Activity from '../components/Activity';
import ProgressTracking from '../components/ProgressTracking';
import Recommendations from '../components/Recommendations';
import { Button } from '@/components/ui/button';
import { Menu, Home, User, Activity as ActivityIcon, BarChart, LineChart } from 'lucide-react';
import { ThemeProvider } from 'next-themes';

const queryClient = new QueryClient();

const Index = () => {
  const [predictionData, setPredictionData] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handlePredictionUpdate = (data) => {
    setPredictionData(data);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const sidebarItems = [
    { name: 'Dashboard', icon: Home },
    { name: 'Profile', icon: User },
    { name: 'Health Insights', icon: ActivityIcon },
    { name: 'Activity', icon: BarChart },
    { name: 'Progress Tracking', icon: LineChart },
    { name: 'Recommendations', icon: LineChart },
  ];

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class">
        <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
          {/* Sidebar */}
          <aside className="w-64 bg-white dark:bg-gray-800 shadow-md">
            <div className="p-4">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">SEVA</h1>
            </div>
            <nav className="mt-6">
              {sidebarItems.map((item) => (
                <Button
                  key={item.name}
                  variant={activeTab === item.name.toLowerCase().replace(' ', '-') ? 'secondary' : 'ghost'}
                  onClick={() => setActiveTab(item.name.toLowerCase().replace(' ', '-'))}
                  className="w-full justify-start px-4 py-2 text-left"
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.name}
                </Button>
              ))}
            </nav>
          </aside>

          {/* Main content */}
          <main className="flex-1 p-8">
            {activeTab === 'dashboard' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <LifestyleForm onPredictionUpdate={handlePredictionUpdate} />
                <HealthDashboard predictionData={predictionData} />
              </div>
            )}
            {activeTab === 'profile' && <Profile />}
            {activeTab === 'health-insights' && <Settings />}
            {activeTab === 'activity' && <Activity />}
            {activeTab === 'progress-tracking' && <ProgressTracking />}
            {activeTab === 'recommendations' && <Recommendations />}
          </main>
        </div>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default Index;