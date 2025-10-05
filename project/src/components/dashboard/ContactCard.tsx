import React from 'react';
import { Contact } from '../../types';

interface ContactCardProps {
  contact: Contact;
  icon: React.ReactNode;
}

const ContactCard = ({ contact, icon }: ContactCardProps) => (
  <div className="flex items-center justify-between p-3 border rounded-lg">
    <div className="flex items-center gap-3">
      {icon}
      <div>
        <h3 className="font-medium">{contact.name}</h3>
        <p className="text-sm text-gray-600">{contact.relation}</p>
      </div>
    </div>
    <a href={`tel:${contact.phone}`} className="text-rose-600 hover:text-rose-700">
      {contact.phone}
    </a>
  </div>
);

export default ContactCard;