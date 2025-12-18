
import React, { useState, useEffect } from 'react';
import HeaderWidget from './components/HeaderWidget';
import ContactCard from './components/ContactCard';
import CallModal from './components/CallModal';
import AddContactForm from './components/AddContactForm';
import { Contact, View } from './types';
import { loadContacts, saveContacts } from './services/storage';

const App: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [view, setView] = useState<View>('home');
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);

  useEffect(() => {
    setContacts(loadContacts());
  }, []);

  const handleAddContact = (newContact: Contact) => {
    const updated = [...contacts, newContact];
    setContacts(updated);
    saveContacts(updated);
    setView('home');
  };

  const handleUpdateContact = (updatedContact: Contact) => {
    const updated = contacts.map(c => c.id === updatedContact.id ? updatedContact : c);
    setContacts(updated);
    saveContacts(updated);
    setView('home');
    setEditingContact(null);
  };

  const handleDeleteContact = (id: string) => {
    if (confirm('确定要删除这位联系人吗？')) {
      const updated = contacts.filter(c => c.id !== id);
      setContacts(updated);
      saveContacts(updated);
      setView('home');
      setEditingContact(null);
    }
  };

  const openCallModal = (contact: Contact) => {
    setSelectedContact(contact);
  };

  const openEditForm = (contact: Contact) => {
    setEditingContact(contact);
    setSelectedContact(null);
    setView('edit');
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-black overflow-x-hidden relative flex flex-col">
      {view === 'home' && (
        <div className="flex-1 pb-24">
          <HeaderWidget onSettingsClick={() => setView('add')} />
          
          <div className="px-4 grid grid-cols-2 gap-4">
            {contacts.map(contact => (
              <ContactCard 
                key={contact.id} 
                contact={contact} 
                onClick={() => openCallModal(contact)} 
              />
            ))}
            <ContactCard 
              isAdd 
              onClick={() => setView('add')} 
            />
          </div>

          <div className="mt-8 flex justify-center gap-2">
            <div className="w-2 h-2 rounded-full bg-white" />
            <div className="w-2 h-2 rounded-full bg-white/30" />
            <div className="w-2 h-2 rounded-full bg-white/30" />
          </div>
        </div>
      )}

      {view === 'add' && (
        <AddContactForm 
          onSave={handleAddContact} 
          onCancel={() => setView('home')} 
        />
      )}

      {view === 'edit' && editingContact && (
        <AddContactForm 
          initialContact={editingContact}
          onSave={handleUpdateContact} 
          onCancel={() => {
            setView('home');
            setEditingContact(null);
          }} 
          onDelete={handleDeleteContact}
        />
      )}

      {selectedContact && (
        <CallModal 
          contact={selectedContact} 
          onClose={() => setSelectedContact(null)} 
          onEdit={openEditForm}
        />
      )}
    </div>
  );
};

export default App;
