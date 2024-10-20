import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Utensils, Activity, Brain, Heart, Droplet, Scale, Cigarette, Wine } from 'lucide-react';

const recommendationCategories = [
  { title: 'Weight Management', icon: Scale },
  { title: 'Physical Activity', icon: Activity },
  { title: 'Sleep Hygiene', icon: Brain },
  { title: 'Stress Management', icon: Brain },
  { title: 'Hydration', icon: Droplet },
  { title: 'Heart Health', icon: Heart },
  { title: 'Smoking Cessation', icon: Cigarette },
  { title: 'Alcohol Moderation', icon: Wine },
  { title: 'Nutrition', icon: Utensils },
];

const Recommendations = ({ userData }) => {
  const getRecommendations = () => {
    if (!userData) return [];

    const recommendations = [];

    // BMI-based recommendations
    const bmi = calculateBMI(userData.weight, userData.height);
    if (bmi < 18.5) {
      recommendations.push({
        title: 'Weight Management',
        content: "Your BMI indicates you're underweight. Focus on nutrient-dense foods and consult a nutritionist for a personalized meal plan.",
      });
    } else if (bmi >= 25) {
      recommendations.push({
        title: 'Weight Management',
        content: "Your BMI indicates you're overweight. Aim to increase physical activity and adopt a balanced diet rich in fruits, vegetables, and lean proteins.",
      });
    }

    // Exercise recommendations
    if (userData.exerciseFrequency < 3) {
      recommendations.push({
        title: 'Physical Activity',
        content: "Aim for at least 150 minutes of moderate-intensity exercise per week. Start with activities you enjoy, like brisk walking or swimming.",
      });
    }

    // Sleep recommendations
    if (userData.sleepHours < 7 || userData.sleepHours > 9) {
      recommendations.push({
        title: 'Sleep Hygiene',
        content: "Aim for 7-9 hours of sleep per night. Establish a consistent sleep schedule and create a relaxing bedtime routine.",
      });
    }

    // Stress management
    if (userData.stressLevel > 7) {
      recommendations.push({
        title: 'Stress Management',
        content: "Your stress levels are high. Practice stress-reduction techniques like meditation, deep breathing, or yoga for at least 15 minutes daily.",
      });
    }

    // Hydration
    if (userData.waterIntake < 8) {
      recommendations.push({
        title: 'Hydration',
        content: "Increase your water intake to at least 8 glasses per day. Keep a water bottle with you and set reminders to drink regularly.",
      });
    }

    // Heart health
    if (userData.bloodPressure > 120 || userData.heartRate > 100) {
      recommendations.push({
        title: 'Heart Health',
        content: "Your blood pressure or heart rate is elevated. Focus on cardiovascular exercises, reduce sodium intake, and manage stress to improve heart health.",
      });
    }

    // Smoking
    if (userData.smokingFrequency > 0) {
      recommendations.push({
        title: 'Smoking Cessation',
        content: "Quitting smoking is one of the best things you can do for your health. Seek support for smoking cessation and consider nicotine replacement therapy.",
      });
    }

    // Alcohol consumption
    if (userData.alcoholConsumption > 14) {
      recommendations.push({
        title: 'Alcohol Moderation',
        content: "Your alcohol consumption is above recommended levels. Aim to reduce intake and have alcohol-free days each week.",
      });
    }

    // Nutrition
    if (userData.dietQuality < 6) {
      recommendations.push({
        title: 'Nutrition',
        content: "Your diet quality could be improved. Focus on incorporating more fruits, vegetables, whole grains, and lean proteins into your meals.",
      });
    }

    return recommendations;
  };

  const recommendations = getRecommendations();

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6 dark:text-white">Personalized Health Recommendations</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {recommendationCategories.map((category, index) => {
          const recommendation = recommendations.find(rec => rec.title === category.title);
          
          // If user data exists and there's no recommendation for this category, don't render it
          if (userData && !recommendation) {
            return null;
          }

          return (
            <Card key={index} className="overflow-hidden">
              <CardHeader className="bg-blue-100 dark:bg-blue-900">
                <CardTitle className="flex items-center">
                  <category.icon className="mr-2 h-6 w-6" />
                  {category.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                {userData ? (
                  recommendation ? (
                    <p>{recommendation.content}</p>
                  ) : null
                ) : (
                  <p>
                    No specific {category.title.toLowerCase()} recommendations at this time. 
                    Input your health data to receive personalized advice.
                  </p>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

const calculateBMI = (weight, height) => {
  const heightInMeters = height / 100;
  return weight / (heightInMeters * heightInMeters);
};

export default Recommendations;
