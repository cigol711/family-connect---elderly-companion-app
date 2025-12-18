
import { Contact } from '../types';

const STORAGE_KEY = 'family_connect_contacts';

export const saveContacts = (contacts: Contact[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
};

export const loadContacts = (): Contact[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return [];
  try {
    return JSON.parse(data);
  } catch (e) {
    console.error('Failed to parse contacts', e);
    return [];
  }
};
