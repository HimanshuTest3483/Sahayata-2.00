import React from 'react';
import { Activity } from 'lucide-react';

interface SelfCareActivityProps {
  title: string;
  duration: string;
  description: string;
  type: string;
}

const ActivityCard: React.FC<SelfCareActivityProps> = ({ title, duration, description, type }) => (
  <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
    <div className="flex items-center mb-4">
      <Activity className="h-6 w-6 text-rose-600 mr-2" />
      <h3 className="text-xl font-semibold">{title}</h3>
    </div>
    <div className="space-y-2">
      <p className="text-sm text-gray-600">{duration}</p>
      <p className="text-gray-700">{description}</p>
      <span className="inline-block px-2 py-1 text-xs font-semibold text-rose-600 bg-rose-100 rounded-full">
        {type}
      </span>
    </div>
  </div>
);

export default ActivityCard;