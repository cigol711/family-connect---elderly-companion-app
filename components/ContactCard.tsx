
import React from 'react';
import { Plus } from 'lucide-react';
import { Contact } from '../types';

interface ContactCardProps {
  contact?: Contact;
  onClick: () => void;
  isAdd?: boolean;
}

const ContactCard: React.FC<ContactCardProps> = ({ contact, onClick, isAdd = false }) => {
  if (isAdd) {
    return (
      <button
        onClick={onClick}
        className="w-full aspect-[4/5] bg-neutral-800 rounded-3xl flex flex-col items-center overflow-hidden active:opacity-80 transition-opacity"
      >
        <div className="flex-1 w-full flex items-center justify-center p-4">
          <div className="w-24 h-24 bg-neutral-700 rounded-full flex items-center justify-center">
            <Plus className="w-12 h-12 text-neutral-400" />
          </div>
        </div>
        <div className="w-full bg-neutral-600 py-3 text-center">
          <span className="text-2xl font-bold text-neutral-300">添加</span>
        </div>
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      className="w-full aspect-[4/5] bg-neutral-800 rounded-3xl flex flex-col overflow-hidden active:scale-95 transition-transform"
    >
      <div className="flex-1 w-full relative">
        <img 
          src={contact?.avatar || 'https://picsum.photos/400/500'} 
          alt={contact?.name} 
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      <div className="w-full bg-neutral-600 py-3 text-center">
        <span className="text-2xl font-bold">{contact?.name}</span>
      </div>
    </button>
  );
};

export default ContactCard;
