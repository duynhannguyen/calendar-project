import { useContext } from 'react';
import { Context } from '../context/Event';

export const EVENT_COLORS = ['red', 'green', 'blue'] as const;

export const UseEvents = () => {
  const value = useContext(Context);
  if (value == null) {
    throw new Error('useEvent must be used within an EventsProvider');
  }
  return value;
};
