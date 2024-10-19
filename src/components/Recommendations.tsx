import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Utensils, Activity, Brain, Heart, Droplet } from 'lucide-react';

const Recommendations = ({ predictionData }) => {
  const getRecommendations = () => {
    if (!predictionData) return null;

    const { age, weight, height, exerciseFrequency, sleepHours, stressLevel, dietQuality, waterIntake } = predictionData;
    const bmi = weight / ((height / 100) ** 2);

    const recommendations = [
      {
        title: 'Diet',
        icon: Utensils,
        content: dietQuality < 7 ? 
          "Improve your diet by incorporating more fruits, vegetables, and whole grains. Limit processed foods and sugary drinks." :
          "Great job on maintaining a healthy diet! Keep it up and consider adding more variety to your meals.",
        image: "https://example.com/balanced-diet-image.jpg"
      },
      {
        title: 'Exercise',
        icon: Activity,
        content: exerciseFrequency < 3 ?
          "Aim for at least 150 minutes of moderate-intensity exercise per week. Start with activities you enjoy, like brisk walking or swimming." :
          "You're doing well with your exercise routine! Consider adding strength training if you haven't already.",
        image: "https://example.com/exercise-image.jpg",
        video: "https://example.com/exercise-video.mp4"
      },
      {
        title: 'Stress Management',
        icon: Brain,
        content: stressLevel > 7 ?
          "Practice stress-reduction techniques like meditation, deep breathing, or yoga for at least 15 minutes daily." :
          "You're managing stress well. Keep up your current practices and consider trying new relaxation techniques.",
        image: "https://example.com/stress-management-image.jpg"
      },
      {
        title: 'Sleep',
        icon: Heart,
        content: sleepHours < 7 ?
          "Aim for 7-9 hours of sleep per night. Establish a consistent sleep schedule and create a relaxing bedtime routine." :
          "You're getting good sleep. Maintain your current sleep habits for optimal health.",
        image: "https://example.com/sleep-image.jpg"
      },
      {
        title: 'Hydration',
        icon: Droplet,
        content: waterIntake < 8 ?
          "Increase your water intake to at least 8 glasses per day. Keep a water bottle with you and set reminders to drink regularly." :
          "Great job staying hydrated! Continue your current water intake habits.",
        image: "https://example.com/hydration-image.jpg"
      }
    ];

    return recommendations;
  };

  const recommendations = getRecommendations();

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6 dark:text-white">Health Recommendations</h2>
      {recommendations ? (
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
      ) : (
        <p>Please submit your lifestyle information to receive personalized recommendations.</p>
      )}
    </div>
  );
};

export default Recommendations;