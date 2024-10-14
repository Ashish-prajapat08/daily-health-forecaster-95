import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

const predictHealth = async (data) => {
  // TODO: Implement actual API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        possibleDiseases: ['Hypertension', 'Type 2 Diabetes'],
        riskLevel: 'Moderate',
      });
    }, 1000);
  });
};

const LifestyleForm = () => {
  const [formData, setFormData] = useState({
    age: '',
    weight: '',
    height: '',
    exerciseFrequency: 3,
    sleepHours: 7,
    stressLevel: 5,
  });

  const [notification, setNotification] = useState('');

  const mutation = useMutation({
    mutationFn: predictHealth,
    onSuccess: (data) => {
      setNotification('Your health prediction has been updated.');
      // TODO: Update dashboard with prediction results
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSliderChange = (name: string, value: number[]) => {
    setFormData({ ...formData, [name]: value[0] });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-bold mb-6">Your Lifestyle Information</h2>
      {notification && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">{notification}</span>
        </div>
      )}
      <div className="mb-4">
        <Label htmlFor="age">Age</Label>
        <Input
          id="age"
          name="age"
          type="number"
          value={formData.age}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="mb-4">
        <Label htmlFor="weight">Weight (kg)</Label>
        <Input
          id="weight"
          name="weight"
          type="number"
          value={formData.weight}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="mb-4">
        <Label htmlFor="height">Height (cm)</Label>
        <Input
          id="height"
          name="height"
          type="number"
          value={formData.height}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="mb-4">
        <Label htmlFor="exerciseFrequency">Exercise Frequency (days per week)</Label>
        <Slider
          id="exerciseFrequency"
          min={0}
          max={7}
          step={1}
          value={[formData.exerciseFrequency]}
          onValueChange={(value) => handleSliderChange('exerciseFrequency', value)}
        />
        <span className="text-sm text-gray-500">{formData.exerciseFrequency} days</span>
      </div>
      <div className="mb-4">
        <Label htmlFor="sleepHours">Average Sleep (hours per night)</Label>
        <Slider
          id="sleepHours"
          min={4}
          max={12}
          step={0.5}
          value={[formData.sleepHours]}
          onValueChange={(value) => handleSliderChange('sleepHours', value)}
        />
        <span className="text-sm text-gray-500">{formData.sleepHours} hours</span>
      </div>
      <div className="mb-6">
        <Label htmlFor="stressLevel">Stress Level (1-10)</Label>
        <Slider
          id="stressLevel"
          min={1}
          max={10}
          step={1}
          value={[formData.stressLevel]}
          onValueChange={(value) => handleSliderChange('stressLevel', value)}
        />
        <span className="text-sm text-gray-500">{formData.stressLevel}</span>
      </div>
      <Button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? 'Predicting...' : 'Predict Health'}
      </Button>
    </form>
  );
};

export default LifestyleForm;
