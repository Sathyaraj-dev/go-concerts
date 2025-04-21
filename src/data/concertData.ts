
import { Concert, Booking, User } from '../lib/types';

export const concerts: Concert[] = [
  {
    id: '1',
    title: 'Summer Rock Festival',
    artist: 'Various Artists',
    date: '2025-06-15',
    time: '17:00',
    venue: {
      id: 'v1',
      name: 'Grand Arena',
      address: '123 Main Street',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      coordinates: {
        lat: 40.7128,
        lng: -74.0060
      },
      capacity: 15000
    },
    genres: ['Rock', 'Alternative'],
    price: {
      standard: 89.99,
      vip: 199.99
    },
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    featured: true,
    description: 'Join us for the biggest rock festival of the summer featuring performances by top artists from around the world. Experience amazing music, great food, and unforgettable memories.',
    artistBio: 'This festival features an incredible lineup of rock and alternative artists, including Grammy-winning performers and emerging talents.'
  },
  {
    id: '2',
    title: 'Jazz Night',
    artist: 'Blue Note Quartet',
    date: '2025-05-20',
    time: '20:00',
    venue: {
      id: 'v2',
      name: 'The Blue Room',
      address: '456 Jazz Avenue',
      city: 'Chicago',
      state: 'IL',
      zipCode: '60601',
      coordinates: {
        lat: 41.8781,
        lng: -87.6298
      },
      capacity: 500
    },
    genres: ['Jazz', 'Blues'],
    price: {
      standard: 45.99,
      vip: 89.99
    },
    image: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80',
    description: 'Experience an intimate evening of smooth jazz with the renowned Blue Note Quartet. This candlelit performance will transport you to the golden age of jazz.',
    artistBio: 'The Blue Note Quartet has been performing together for over 15 years, combining traditional jazz elements with modern influences to create their unique sound.'
  },
  {
    id: '3',
    title: 'Pop Sensation Tour',
    artist: 'Aria Luna',
    date: '2025-07-10',
    time: '19:30',
    venue: {
      id: 'v3',
      name: 'Staples Center',
      address: '1111 S Figueroa St',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90015',
      coordinates: {
        lat: 34.0430,
        lng: -118.2673
      },
      capacity: 20000
    },
    genres: ['Pop', 'Dance'],
    price: {
      standard: 79.99,
      vip: 249.99,
      earlyBird: 59.99
    },
    image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    featured: true,
    description: 'Aria Luna brings her chart-topping hits to Los Angeles for one night only! Experience an unforgettable show with stunning choreography, special effects, and all her greatest songs.',
    artistBio: 'With three Grammy awards and over 50 million albums sold worldwide, Aria Luna is one of the biggest pop stars of her generation.'
  },
  {
    id: '4',
    title: 'Classical Symphony',
    artist: 'Metropolitan Orchestra',
    date: '2025-06-05',
    time: '19:00',
    venue: {
      id: 'v4',
      name: 'Symphony Hall',
      address: '301 Massachusetts Ave',
      city: 'Boston',
      state: 'MA',
      zipCode: '02115',
      coordinates: {
        lat: 42.3430,
        lng: -71.0853
      },
      capacity: 2600
    },
    genres: ['Classical'],
    price: {
      standard: 55.99,
      vip: 119.99
    },
    image: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    description: 'Experience the Metropolitan Orchestra perform masterpieces by Beethoven, Mozart, and Tchaikovsky under the direction of Maestro Richard Blanc.',
    artistBio: 'The Metropolitan Orchestra is one of the oldest and most prestigious classical ensembles in the country, known for their precise interpretations of classical masterpieces.'
  },
  {
    id: '5',
    title: 'Electronic Music Festival',
    artist: 'Various DJs',
    date: '2025-08-20',
    time: '16:00',
    venue: {
      id: 'v5',
      name: 'Waterfront Park',
      address: '1000 Waterfront Drive',
      city: 'Miami',
      state: 'FL',
      zipCode: '33132',
      coordinates: {
        lat: 25.7617,
        lng: -80.1918
      },
      capacity: 10000
    },
    genres: ['Electronic', 'Dance', 'House'],
    price: {
      standard: 120.99,
      vip: 299.99,
      earlyBird: 89.99
    },
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    featured: true,
    description: 'Three days of non-stop electronic music featuring world-class DJs, immersive light shows, and the best dance party of the year.',
    artistBio: 'This festival brings together over 30 top DJs and electronic music producers from around the globe.'
  },
  {
    id: '6',
    title: 'Country Music Jamboree',
    artist: 'Southern Comfort Band',
    date: '2025-09-12',
    time: '18:00',
    venue: {
      id: 'v6',
      name: 'River Ranch',
      address: '789 Country Road',
      city: 'Nashville',
      state: 'TN',
      zipCode: '37203',
      coordinates: {
        lat: 36.1627,
        lng: -86.7816
      },
      capacity: 5000
    },
    genres: ['Country', 'Folk'],
    price: {
      standard: 65.99,
      vip: 149.99
    },
    image: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    description: 'Grab your boots and hat for a night of authentic country music under the stars. Enjoy barbecue, line dancing, and great music.',
    artistBio: 'The Southern Comfort Band brings their unique blend of traditional and modern country music to this annual Nashville tradition.'
  }
];

export const bookings: Booking[] = [
  {
    id: 'b1',
    concertId: '1',
    userId: 'u1',
    ticketType: 'standard',
    quantity: 2,
    totalPrice: 179.98,
    bookingDate: '2025-03-15T12:30:00',
    status: 'confirmed',
    userDetails: {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '555-123-4567'
    }
  },
  {
    id: 'b2',
    concertId: '3',
    userId: 'u1',
    ticketType: 'vip',
    quantity: 1,
    totalPrice: 249.99,
    bookingDate: '2025-04-02T15:45:00',
    status: 'confirmed',
    userDetails: {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '555-123-4567'
    }
  }
];

export const users: User[] = [
  {
    id: 'u1',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '555-123-4567',
    bookings: ['b1', 'b2']
  }
];

// Helper functions to simulate API calls
export const getAllConcerts = (): Promise<Concert[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(concerts), 500);
  });
};

export const getConcertById = (id: string): Promise<Concert | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(concerts.find(concert => concert.id === id)), 500);
  });
};

export const getFeaturedConcerts = (): Promise<Concert[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(concerts.filter(concert => concert.featured)), 500);
  });
};

export const getFilteredConcerts = (
  location?: string,
  date?: string,
  genre?: string,
  artist?: string
): Promise<Concert[]> => {
  return new Promise((resolve) => {
    let filteredConcerts = [...concerts];
    
    if (location) {
      filteredConcerts = filteredConcerts.filter(concert => 
        concert.venue.city.toLowerCase().includes(location.toLowerCase()) || 
        concert.venue.state.toLowerCase().includes(location.toLowerCase())
      );
    }
    
    if (date) {
      filteredConcerts = filteredConcerts.filter(concert => 
        concert.date === date
      );
    }
    
    if (genre) {
      filteredConcerts = filteredConcerts.filter(concert => 
        concert.genres.some(g => g.toLowerCase().includes(genre.toLowerCase()))
      );
    }
    
    if (artist) {
      filteredConcerts = filteredConcerts.filter(concert => 
        concert.artist.toLowerCase().includes(artist.toLowerCase()) ||
        concert.title.toLowerCase().includes(artist.toLowerCase())
      );
    }
    
    setTimeout(() => resolve(filteredConcerts), 500);
  });
};

export const getUserBookings = (userId: string): Promise<Booking[]> => {
  return new Promise((resolve) => {
    const userBookings = bookings.filter(booking => booking.userId === userId);
    setTimeout(() => resolve(userBookings), 500);
  });
};

export const createBooking = (booking: Omit<Booking, 'id' | 'bookingDate' | 'status'>): Promise<Booking> => {
  return new Promise((resolve) => {
    const newBooking: Booking = {
      ...booking,
      id: `b${bookings.length + 1}`,
      bookingDate: new Date().toISOString(),
      status: 'confirmed'
    };
    
    setTimeout(() => resolve(newBooking), 1000);
  });
};

// Mock authentication
export const getCurrentUser = (): Promise<User | null> => {
  return new Promise((resolve) => {
    // In a real app, this would check session/tokens
    setTimeout(() => resolve(users[0]), 300);
  });
};
