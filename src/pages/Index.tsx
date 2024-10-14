import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import LifestyleForm from '../components/LifestyleForm';
import HealthDashboard from '../components/HealthDashboard';

const queryClient = new QueryClient();

const Index = () => {
  const [predictionData, setPredictionData] = useState(null);

  const handlePredictionUpdate = (data) => {
    setPredictionData(data);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">Health Predictor</h1>
          </div>
        </header>
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <LifestyleForm onPredictionUpdate={handlePredictionUpdate} />
              <HealthDashboard predictionData={predictionData} />
            </div>
          </div>
        </main>
      </div>
    </QueryClientProvider>
  );
};

export default Index;