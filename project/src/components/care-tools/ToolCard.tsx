import React from 'react';
import { Tool } from 'lucide-react';

interface CareToolProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
}

const ToolCard: React.FC<CareToolProps> = ({ title, description, icon, onClick }) => (
  <button
    onClick={onClick}
    className="bg-white rounded-lg shadow-md p-6 text-left w-full hover:shadow-lg transition-shadow"
  >
    <div className="flex items-center mb-4">
      {icon}
      <h3 className="text-xl font-semibold ml-2">{title}</h3>
    </div>
    <p className="text-gray-600">{description}</p>
  </button>
);

export default ToolCard;