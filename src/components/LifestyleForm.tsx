import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Heart, Droplet, Activity, Thermometer, User, PieChart, Cigarette, Wine, Smile } from 'lucide-react';
import { toast } from 'sonner';

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

  const mutation = useMutation({
    mutationFn: predictHealth,
    onSuccess: (data) => {
      toast.success('Your health prediction has been updated.');
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

  const inputFields = [
    { name: 'age', label: 'Age', icon: User, type: 'number' },
    { name: 'weight', label: 'Weight (kg)', icon: Activity, type: 'number' },
    { name: 'height', label: 'Height (cm)', icon: User, type: 'number' },
    { name: 'heartRate', label: 'Heart Rate (bpm)', icon: Heart, type: 'number' },
    { name: 'waterIntake', label: 'Water Intake (glasses)', icon: Droplet, type: 'number' },
    { name: 'dailySteps', label: 'Daily Steps', icon: Activity, type: 'number' },
    { name: 'bloodPressure', label: 'Blood Pressure (systolic)', icon: Thermometer, type: 'number' },
    { name: 'bodyFatPercentage', label: 'Body Fat Percentage', icon: User, type: 'number' },
    { name: 'cholesterolLevel', label: 'Cholesterol Level (mg/dL)', icon: PieChart, type: 'number' },
    { name: 'smokingFrequency', label: 'Smoking Frequency (per day)', icon: Cigarette, type: 'number' },
    { name: 'alcoholConsumption', label: 'Alcohol Consumption (per week)', icon: Wine, type: 'number' },
  ];

  const sliderFields = [
    { name: 'exerciseFrequency', label: 'Exercise Frequency', icon: Activity, min: 0, max: 7 },
    { name: 'sleepHours', label: 'Sleep Hours', icon: User, min: 4, max: 12 },
    { name: 'stressLevel', label: 'Stress Level', icon: Activity, min: 1, max: 10 },
    { name: 'dietQuality', label: 'Diet Quality', icon: PieChart, min: 1, max: 10 },
    { name: 'mentalWellbeingScore', label: 'Mental Well-being Score', icon: Smile, min: 1, max: 10 },
  ];

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 overflow-y-auto max-h-[calc(100vh-200px)]">
      <h2 className="text-2xl font-bold mb-6 dark:text-white">Your Lifestyle Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {inputFields.map((field) => (
          <div key={field.name} className="mb-4">
            <Label htmlFor={field.name} className="flex items-center">
              <field.icon className="mr-2 h-4 w-4" />
              {field.label}
            </Label>
            <Input
              id={field.name}
              name={field.name}
              type={field.type}
              value={formData[field.name]}
              onChange={handleInputChange}
              className="mt-1"
              required
            />
          </div>
        ))}
        {sliderFields.map((field) => (
          <div key={field.name} className="mb-4">
            <Label htmlFor={field.name} className="flex items-center">
              <field.icon className="mr-2 h-4 w-4" />
              {field.label}
            </Label>
            <Slider
              id={field.name}
              min={field.min}
              max={field.max}
              step={1}
              value={[formData[field.name]]}
              onValueChange={(value) => handleSliderChange(field.name, value)}
              className="mt-2"
            />
            <span className="text-sm text-gray-500 dark:text-gray-400 mt-1 block">
              {formData[field.name]}
            </span>
          </div>
        ))}
      </div>
      <Button type="submit" className="mt-6 w-full" disabled={mutation.isPending}>
        {mutation.isPending ? 'Updating...' : 'Update Health Prediction'}
      </Button>
    </form>
  );
};

export default LifestyleForm;
