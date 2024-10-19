import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Utensils, Activity, Brain, Heart, Droplet, Scale, Cigarette, Wine } from 'lucide-react';

const Recommendations = ({ userData }) => {
  const getRecommendations = () => {
    const recommendations = [];

    // BMI-based recommendations
    const bmi = calculateBMI(userData.weight, userData.height);
    if (bmi < 18.5) {
      recommendations.push({
        title: 'Weight Management',
        icon: Scale,
        content: "Your BMI indicates you're underweight. Focus on nutrient-dense foods and consult a nutritionist for a personalized meal plan.",
        image: "https://example.com/healthy-meal-image.jpg"
      });
    } else if (bmi >= 25) {
      recommendations.push({
        title: 'Weight Management',
        icon: Scale,
        content: "Your BMI indicates you're overweight. Aim to increase physical activity and adopt a balanced diet rich in fruits, vegetables, and lean proteins.",
        image: "https://example.com/balanced-diet-image.jpg"
      });
    }

    // Exercise recommendations
    if (userData.exerciseFrequency < 3) {
      recommendations.push({
        title: 'Physical Activity',
        icon: Activity,
        content: "Aim for at least 150 minutes of moderate-intensity exercise per week. Start with activities you enjoy, like brisk walking or swimming.",
        image: "https://example.com/exercise-image.jpg",
        video: "https://example.com/beginner-workout-video.mp4"
      });
    }

    // Sleep recommendations
    if (userData.averageSleep < 7 || userData.averageSleep > 9) {
      recommendations.push({
        title: 'Sleep Hygiene',
        icon: Brain,
        content: "Aim for 7-9 hours of sleep per night. Establish a consistent sleep schedule and create a relaxing bedtime routine.",
        image: "https://example.com/sleep-hygiene-image.jpg"
      });
    }

    // Stress management
    if (userData.stressLevel > 7) {
      recommendations.push({
        title: 'Stress Management',
        icon: Brain,
        content: "Your stress levels are high. Practice stress-reduction techniques like meditation, deep breathing, or yoga for at least 15 minutes daily.",
        image: "https://example.com/stress-management-image.jpg",
        video: "https://example.com/guided-meditation-video.mp4"
      });
    }

    // Hydration
    if (userData.hydrationLevel < 2.7) {
      recommendations.push({
        title: 'Hydration',
        icon: Droplet,
        content: "Increase your water intake to at least 2.7 liters per day. Keep a water bottle with you and set reminders to drink regularly.",
        image: "https://example.com/hydration-image.jpg"
      });
    }

    // Heart health
    if (userData.bloodPressure > 120 || userData.heartRate > 100) {
      recommendations.push({
        title: 'Heart Health',
        icon: Heart,
        content: "Your blood pressure or heart rate is elevated. Focus on cardiovascular exercises, reduce sodium intake, and manage stress to improve heart health.",
        image: "https://example.com/heart-health-image.jpg"
      });
    }

    // Smoking
    if (userData.smokingStatus !== 'Non-smoker') {
      recommendations.push({
        title: 'Smoking Cessation',
        icon: Cigarette,
        content: "Quitting smoking is one of the best things you can do for your health. Seek support for smoking cessation and consider nicotine replacement therapy.",
        image: "https://example.com/quit-smoking-image.jpg"
      });
    }

    // Alcohol consumption
    if (userData.alcoholConsumption > 14) {
      recommendations.push({
        title: 'Alcohol Moderation',
        icon: Wine,
        content: "Your alcohol consumption is above recommended levels. Aim to reduce intake and have alcohol-free days each week.",
        image: "https://example.com/alcohol-moderation-image.jpg"
      });
    }

    return recommendations;
  };

  const recommendations = getRecommendations();

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6 dark:text-white">Personalized Health Recommendations</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {recommendations.map((rec, index) => (
          <Card key={index} className="overflow-hidden">
            <CardHeader className="bg-blue-100 dark:bg-blue-900">
              <CardTitle className="flex items-center">
                <rec.icon className="mr-2 h-6 w-6" />
                {rec.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <p className="mb-4">{rec.content}</p>
              <img src={rec.image} alt={rec.title} className="w-full h-40 object-cover rounded-md mb-4" />
              {rec.video && (
                <video controls className="w-full rounded-md">
                  <source src={rec.video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

const calculateBMI = (weight, height) => {
  const heightInMeters = height / 100;
  return weight / (heightInMeters * heightInMeters);
};

export default Recommendations;