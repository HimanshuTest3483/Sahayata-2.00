import React from 'react';
import ActivityCard from '../components/self-care/ActivityCard';
import MoodTracker from '../components/self-care/MoodTracker';

const SelfCare = () => {
  const activities = [
    {
      title: 'Guided Meditation',
      duration: '10 minutes',
      description: 'A calming meditation session to help reduce stress and anxiety.',
      type: 'Mindfulness'
    },
    {
      title: 'Gentle Yoga',
      duration: '20 minutes',
      description: 'Easy stretching exercises to improve flexibility and reduce tension.',
      type: 'Exercise'
    },
    {
      title: 'Journaling Session',
      duration: '15 minutes',
      description: 'Guided journaling prompts for emotional expression and reflection.',
      type: 'Emotional Wellness'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12"
         style={{
           backgroundImage: 'url("https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80")',
           backgroundSize: 'cover',
           backgroundPosition: 'center',
           backgroundAttachment: 'fixed'
         }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/90 backdrop-blur-sm rounded-xl p-8 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Self-Care Center</h1>
          <p className="text-gray-600 mb-6">Take time for yourself with these wellness activities</p>
          <MoodTracker />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activities.map((activity, index) => (
            <ActivityCard key={index} {...activity} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SelfCare;