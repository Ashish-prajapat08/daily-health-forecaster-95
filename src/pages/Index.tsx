import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import LifestyleForm from '../components/LifestyleForm';
import HealthDashboard from '../components/HealthDashboard';
import Profile from '../components/Profile';
import Settings from '../components/Settings';
import Activity from '../components/Activity';
import ProgressTracking from '../components/ProgressTracking';
import Recommendations from '../components/Recommendations';
import Sidebar from '../components/Sidebar';
import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';
import { ThemeProvider } from 'next-themes';

const queryClient = new QueryClient();

const Index = () => {
  const [predictionData, setPredictionData] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handlePredictionUpdate = (data) => {
    setPredictionData(data);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class">
        <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
          <Sidebar
            isOpen={isSidebarOpen}
            toggleSidebar={toggleSidebar}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          <main className={`flex-1 p-8 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-16'}`}>
            <div className="flex justify-end mb-4">
              <Button variant="ghost">
                <User className="h-6 w-6" />
              </Button>
            </div>
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