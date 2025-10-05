import React from 'react';
import { Phone, Heart, Building2 } from 'lucide-react';
import ContactCard from './ContactCard';
import { Contact } from '../../types';

const EmergencyContacts = () => {
  const contacts: Contact[] = [
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      relation: 'Primary Physician',
      phone: '(555) 123-4567',
      type: 'medical'
    },
    {
      id: '2',
      name: 'Memorial Hospital',
      relation: 'Emergency Room',
      phone: '(555) 999-9999',
      type: 'emergency'
    }
  ];

  const getIcon = (type: Contact['type']) => {
    switch (type) {
      case 'medical': return <Building2 className="h-5 w-5 text-blue-500" />;
      case 'emergency': return <Heart className="h-5 w-5 text-red-500" />;
      default: return <Phone className="h-5 w-5 text-green-500" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Emergency Contacts</h2>
      <div className="space-y-4">
        {contacts.map(contact => (
          <ContactCard 
            key={contact.id} 
            contact={contact} 
            icon={getIcon(contact.type)} 
          />
        ))}
      </div>
    </div>
  );
};

export default EmergencyContacts;