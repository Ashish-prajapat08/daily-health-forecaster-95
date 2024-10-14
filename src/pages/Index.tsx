import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import LifestyleForm from '../components/LifestyleForm';
import HealthDashboard from '../components/HealthDashboard';
import { Button } from '@/components/ui/button';

const queryClient = new QueryClient();

const Index = () => {
  const [predictionData, setPredictionData] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');

  const handlePredictionUpdate = (data) => {
    setPredictionData(data);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">SEVA</h1>
          </div>
        </header>
        <nav className="bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <span className="text-white font-bold">SEVA</span>
                </div>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    {['Dashboard', 'Profile', 'Settings', 'Activity'].map((item) => (
                      <Button
                        key={item}
                        variant={activeTab === item.toLowerCase() ? 'secondary' : 'ghost'}
                        onClick={() => setActiveTab(item.toLowerCase())}
                        className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                      >
                        {item}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            {activeTab === 'dashboard' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <LifestyleForm onPredictionUpdate={handlePredictionUpdate} />
                <HealthDashboard predictionData={predictionData} />
              </div>
            )}
            {activeTab === 'profile' && <div>Profile Content</div>}
            {activeTab === 'settings' && <div>Settings Content</div>}
            {activeTab === 'activity' && <div>Activity Content</div>}
          </div>
        </main>
      </div>
    </QueryClientProvider>
  );
};

export default Index;