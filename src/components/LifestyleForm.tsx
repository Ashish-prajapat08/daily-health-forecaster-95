import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

const predictHealth = async (data) => {
  // Simulated prediction logic
  const risks = [];
  const { age, weight, height, exerciseFrequency, sleepHours, stressLevel, dietQuality, waterIntake, dailySteps, heartRate, bloodPressure, bodyFatPercentage, cholesterolLevel, smokingFrequency, alcoholConsumption, mentalWellbeingScore } = data;
  const bmi = weight / ((height / 100) ** 2);

  if (bmi > 25) risks.push('Obesity');
  if (bmi > 30 || stressLevel > 7) risks.push('Hypertension');
  if (bmi > 30 && exerciseFrequency < 3) risks.push('Type 2 Diabetes');
  if (sleepHours < 6 || stressLevel > 8) risks.push('Insomnia');
  if (age > 50 && exerciseFrequency < 2) risks.push('Osteoporosis');
  if (stressLevel > 7 && sleepHours < 6) risks.push('Anxiety');
  if (exerciseFrequency < 2 && age > 40) risks.push('Cardiovascular Disease');
  if (dietQuality < 5) risks.push('Nutritional Deficiency');
  if (waterIntake < 6) risks.push('Dehydration');
  if (dailySteps < 5000) risks.push('Sedentary Lifestyle');
  if (heartRate > 100) risks.push('Tachycardia');
  if (bloodPressure > 140) risks.push('Hypertension');
  if (bodyFatPercentage > 30) risks.push('Obesity');
  if (cholesterolLevel > 200) risks.push('Hypercholesterolemia');
  if (smokingFrequency > 0) risks.push('Lung Cancer');
  if (alcoholConsumption > 2) risks.push('Liver Disease');
  if (mentalWellbeingScore < 5) risks.push('Depression');

  let riskLevel = 'Low';
  if (risks.length > 2) riskLevel = 'Moderate';
  if (risks.length > 4) riskLevel = 'High';

  return {
    possibleDiseases: risks,
    riskLevel: riskLevel,
  };
};

const LifestyleForm = ({ onPredictionUpdate }) => {
  const [formData, setFormData] = useState({
    age: '',
    weight: '',
    height: '',
    exerciseFrequency: 3,
    sleepHours: 7,
    stressLevel: 5,
    dietQuality: 5,
    waterIntake: 8,
    dailySteps: 7500,
    heartRate: 70,
    bloodPressure: 120,
    bodyFatPercentage: 20,
    cholesterolLevel: 180,
    smokingFrequency: 0,
    alcoholConsumption: 1,
    mentalWellbeingScore: 7,
  });

  const [notification, setNotification] = useState('');

  const mutation = useMutation({
    mutationFn: predictHealth,
    onSuccess: (data) => {
      setNotification('Your health prediction has been updated.');
      onPredictionUpdate(data);
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
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-bold mb-6 dark:text-white">Your Lifestyle Information</h2>
      {notification && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">{notification}</span>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          <span className="text-sm text-gray-500 dark:text-gray-400">{formData.exerciseFrequency} days</span>
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
          <span className="text-sm text-gray-500 dark:text-gray-400">{formData.sleepHours} hours</span>
        </div>
        <div className="mb-4">
          <Label htmlFor="stressLevel">Stress Level (1-10)</Label>
          <Slider
            id="stressLevel"
            min={1}
            max={10}
            step={1}
            value={[formData.stressLevel]}
            onValueChange={(value) => handleSliderChange('stressLevel', value)}
          />
          <span className="text-sm text-gray-500 dark:text-gray-400">{formData.stressLevel}</span>
        </div>
        <div className="mb-4">
          <Label htmlFor="dietQuality">Diet Quality (1-10)</Label>
          <Slider
            id="dietQuality"
            min={1}
            max={10}
            step={1}
            value={[formData.dietQuality]}
            onValueChange={(value) => handleSliderChange('dietQuality', value)}
          />
          <span className="text-sm text-gray-500 dark:text-gray-400">{formData.dietQuality}</span>
        </div>
        <div className="mb-4">
          <Label htmlFor="waterIntake">Water Intake (glasses per day)</Label>
          <Slider
            id="waterIntake"
            min={0}
            max={16}
            step={1}
            value={[formData.waterIntake]}
            onValueChange={(value) => handleSliderChange('waterIntake', value)}
          />
          <span className="text-sm text-gray-500 dark:text-gray-400">{formData.waterIntake} glasses</span>
        </div>
        <div className="mb-4">
          <Label htmlFor="dailySteps">Daily Steps</Label>
          <Input
            id="dailySteps"
            name="dailySteps"
            type="number"
            value={formData.dailySteps}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="heartRate">Heart Rate (bpm)</Label>
          <Input
            id="heartRate"
            name="heartRate"
            type="number"
            value={formData.heartRate}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="bloodPressure">Blood Pressure (systolic)</Label>
          <Input
            id="bloodPressure"
            name="bloodPressure"
            type="number"
            value={formData.bloodPressure}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="bodyFatPercentage">Body Fat Percentage</Label>
          <Input
            id="bodyFatPercentage"
            name="bodyFatPercentage"
            type="number"
            value={formData.bodyFatPercentage}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="cholesterolLevel">Cholesterol Level (mg/dL)</Label>
          <Input
            id="cholesterolLevel"
            name="cholesterolLevel"
            type="number"
            value={formData.cholesterolLevel}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="smokingFrequency">Smoking Frequency (cigarettes per day)</Label>
          <Input
            id="smokingFrequency"
            name="smokingFrequency"
            type="number"
            value={formData.smokingFrequency}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="alcoholConsumption">Alcohol Consumption (drinks per week)</Label>
          <Input
            id="alcoholConsumption"
            name="alcoholConsumption"
            type="number"
            value={formData.alcoholConsumption}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="mentalWellbeingScore">Mental Well-being Score (1-10)</Label>
          <Slider
            id="mentalWellbeingScore"
            min={1}
            max={10}
            step={1}
            value={[formData.mentalWellbeingScore]}
            onValueChange={(value) => handleSliderChange('mentalWellbeingScore', value)}
          />
          <span className="text-sm text-gray-500 dark:text-gray-400">{formData.mentalWellbeingScore}</span>
        </div>
      </div>
      <Button type="submit" disabled={mutation.isPending} className="mt-4">
        {mutation.isPending ? 'Predicting...' : 'Predict Health'}
      </Button>
    </form>
  );
};

export default LifestyleForm;