
export interface Concert {
  id: string;
  title: string;
  artist: string;
  date: string;
  time: string;
  venue: Venue;
  genres: string[];
  price: {
    standard: number;
    vip?: number;
    earlyBird?: number;
  };
  image: string;
  featured?: boolean;
  description: string;
  artistBio?: string;
}

export interface Venue {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  capacity?: number;
}

export interface Booking {
  id: string;
  concertId: string;
  userId: string;
  ticketType: 'standard' | 'vip' | 'earlyBird';
  quantity: number;
  totalPrice: number;
  bookingDate: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  userDetails: {
    name: string;
    email: string;
    phone: string;
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  bookings: string[]; // Array of booking IDs
}

export interface BookingFormData {
  ticketType: 'standard' | 'vip' | 'earlyBird';
  quantity: number;
  name: string;
  email: string;
  phone: string;
}

export interface FilterOptions {
  location: string;
  date: string;
  genre: string;
  artist: string;
}
