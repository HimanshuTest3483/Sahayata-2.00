import React, { useState } from 'react';
import { Smile, Meh, Frown } from 'lucide-react';

const MoodTracker = () => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  const moods = [
    { icon: Smile, label: 'Good', color: 'text-green-500' },
    { icon: Meh, label: 'Okay', color: 'text-yellow-500' },
    { icon: Frown, label: 'Not Great', color: 'text-red-500' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-4">How are you feeling today?</h3>
      <div className="flex justify-around">
        {moods.map(({ icon: Icon, label, color }) => (
          <button
            key={label}
            onClick={() => setSelectedMood(label)}
            className={`flex flex-col items-center p-2 rounded-lg transition-colors
              ${selectedMood === label ? 'bg-gray-100' : ''}`}
          >
            <Icon className={`h-8 w-8 ${color}`} />
            <span className="mt-1 text-sm">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MoodTracker;