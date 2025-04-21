
import React, { createContext, useContext, useState } from 'react';
import { Concert, BookingFormData } from '@/lib/types';

type BookingContextType = {
  selectedConcert: Concert | null;
  bookingData: BookingFormData;
  setSelectedConcert: (concert: Concert | null) => void;
  updateBookingData: (data: Partial<BookingFormData>) => void;
  resetBooking: () => void;
};

const defaultBookingData: BookingFormData = {
  ticketType: 'standard',
  quantity: 1,
  name: '',
  email: '',
  phone: ''
};

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedConcert, setSelectedConcert] = useState<Concert | null>(null);
  const [bookingData, setBookingData] = useState<BookingFormData>(defaultBookingData);

  const updateBookingData = (data: Partial<BookingFormData>) => {
    setBookingData(prev => ({ ...prev, ...data }));
  };

  const resetBooking = () => {
    setSelectedConcert(null);
    setBookingData(defaultBookingData);
  };

  return (
    <BookingContext.Provider
      value={{
        selectedConcert,
        bookingData,
        setSelectedConcert,
        updateBookingData,
        resetBooking
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
