import React from 'react';
import { Clock } from 'lucide-react';
import { Medication } from '../../types';

interface MedicationListProps {
  medications: Medication[];
}

const MedicationList: React.FC<MedicationListProps> = ({ medications }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center mb-4">
        <Clock className="h-6 w-6 text-rose-600 mr-2" />
        <h2 className="text-xl font-semibold">Medication Schedule</h2>
      </div>
      <div className="space-y-4">
        {medications.map(medication => (
          <div key={medication.id} className="border-l-4 border-rose-500 pl-4">
            <h3 className="font-medium">{medication.name}</h3>
            <p className="text-sm text-gray-600">{medication.dosage} - {medication.frequency}</p>
            <p className="text-sm text-gray-600">Time: {medication.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MedicationList;