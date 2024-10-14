import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import LifestyleForm from '../components/LifestyleForm';
import HealthDashboard from '../components/HealthDashboard';
import Profile from '../components/Profile';
import Settings from '../components/Settings';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
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

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class">
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
          <header className="bg-white dark:bg-gray-800 shadow">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">SEVA</h1>
              <Button variant="ghost" onClick={toggleMenu} className="md:hidden">
                <Menu size={24} />
              </Button>
            </div>
          </header>
          <nav className={`bg-gray-800 ${isMenuOpen ? 'block' : 'hidden'} md:block`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <div className="flex items-center">
                  <div className="hidden md:block">
                    <div className="ml-10 flex items-baseline space-x-4">
                      {['Dashboard', 'Profile', 'Settings', 'Activity'].map((item) => (
                        <Button
                          key={item}
                          variant={activeTab === item.toLowerCase() ? 'secondary' : 'ghost'}
                          onClick={() => setActiveTab(item.toLowerCase())}
                          className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                        >
                          {item}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {['Dashboard', 'Profile', 'Settings', 'Activity'].map((item) => (
                  <Button
                    key={item}
                    variant={activeTab === item.toLowerCase() ? 'secondary' : 'ghost'}
                    onClick={() => {
                      setActiveTab(item.toLowerCase());
                      setIsMenuOpen(false);
                    }}
                    className="block text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium w-full text-left transition-colors duration-200"
                  >
                    {item}
                  </Button>
                ))}
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
              {activeTab === 'profile' && <Profile />}
              {activeTab === 'settings' && <Settings />}
              {activeTab === 'activity' && <div>Activity Content</div>}
            </div>
          </main>
        </div>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default Index;