import { Concert, Booking, User } from '../lib/types';

export const concerts: Concert[] = [
  {
    id: '1',
    title: 'Marina Music Festival',
    artist: 'Chennai Rhythms',
    date: '2025-11-15',
    time: '17:00',
    venue: {
      id: 'v1',
      name: 'Jawaharlal Nehru Indoor Stadium',
      address: 'Periyamet, Sydenhams Rd',
      city: 'Chennai',
      state: 'Tamil Nadu',
      zipCode: '600003',
      coordinates: {
        lat: 13.0827,
        lng: 80.2707
      },
      capacity: 8000
    },
    genres: ['Carnatic', 'Fusion'],
    price: {
      standard: 999,
      vip: 2499
    },
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    featured: true,
    description: 'Enjoy a magical evening of Carnatic fusion by leading Chennai musicians at the historic Nehru Stadium.',
    artistBio: 'Chennai Rhythms brings together classical Carnatic maestros and modern fusion artists for a dazzling celebration.'
  },
  {
    id: '2',
    title: 'Jazz in Madras',
    artist: 'Southside Sax Quartet',
    date: '2025-11-25',
    time: '19:00',
    venue: {
      id: 'v2',
      name: 'Music Academy',
      address: 'Old No. 306, TTK Rd, Alwarpet',
      city: 'Chennai',
      state: 'Tamil Nadu',
      zipCode: '600018',
      coordinates: {
        lat: 13.0443,
        lng: 80.2518
      },
      capacity: 1600
    },
    genres: ['Jazz', 'Blues'],
    price: {
      standard: 799,
      vip: 1800
    },
    image: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80',
    description: 'Chennai’s coolest jazz gathering with India’s best saxophonists.',
    artistBio: 'With roots in both Madras and Mumbai, Southside Sax Quartet brings bluesy jazz magic to the city.'
  },
  {
    id: '3',
    title: 'Kollywood Pop Night',
    artist: 'A.R. Anirudh Live',
    date: '2025-12-15',
    time: '18:30',
    venue: {
      id: 'v3',
      name: 'Chennai Trade Centre',
      address: 'Nandambakkam',
      city: 'Chennai',
      state: 'Tamil Nadu',
      zipCode: '600089',
      coordinates: {
        lat: 13.0157,
        lng: 80.1641
      },
      capacity: 3000
    },
    genres: ['Pop', 'Film', 'Tamil'],
    price: {
      standard: 1200,
      vip: 3200,
      earlyBird: 899
    },
    image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    featured: true,
    description: 'A.R. Anirudh brings the biggest Tamil hits in this Chennai exclusive concert.',
    artistBio: 'Known for show-stopping Kollywood numbers, A.R. Anirudh energizes the Chennai crowd!'
  },
  {
    id: '4',
    title: 'Classical Nirvana',
    artist: 'MS Rajan Orchestra',
    date: '2025-12-20',
    time: '19:00',
    venue: {
      id: 'v4',
      name: 'Vani Mahal',
      address: 'G.N. Chetty Rd, T Nagar',
      city: 'Chennai',
      state: 'Tamil Nadu',
      zipCode: '600017',
      coordinates: {
        lat: 13.0426,
        lng: 80.2331
      },
      capacity: 800
    },
    genres: ['Classical'],
    price: {
      standard: 650,
      vip: 1500
    },
    image: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    description: 'A mesmerizing night dedicated to Indian classical music by the renowned MS Rajan Orchestra.',
    artistBio: 'The MS Rajan Orchestra, with decades of classical expertise, returns for a rare South India performance.'
  },
  {
    id: '5',
    title: 'EDM Chennai Beach Fest',
    artist: 'DJ Raga',
    date: '2025-12-05',
    time: '17:00',
    venue: {
      id: 'v5',
      name: 'Elliots Beach',
      address: 'Besant Nagar',
      city: 'Chennai',
      state: 'Tamil Nadu',
      zipCode: '600090',
      coordinates: {
        lat: 13.0025,
        lng: 80.2598
      },
      capacity: 2000
    },
    genres: ['Electronic', 'Dance'],
    price: {
      standard: 1400,
      vip: 3500,
      earlyBird: 1000
    },
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    featured: true,
    description: 'Experience the thrill of EDM right by the shores of Chennai.',
    artistBio: 'Top Indian DJ Raga brings his energy to the heart of Chennai’s party beach.'
  },
  {
    id: '6',
    title: 'Folk Fest Tamil Nadu',
    artist: 'Nataka Mandram Ensemble',
    date: '2025-11-10',
    time: '18:00',
    venue: {
      id: 'v6',
      name: 'Kalakshetra Foundation',
      address: 'Thiruvanmiyur',
      city: 'Chennai',
      state: 'Tamil Nadu',
      zipCode: '600041',
      coordinates: {
        lat: 12.9986,
        lng: 80.2596
      },
      capacity: 1200
    },
    genres: ['Folk', 'Tamil'],
    price: {
      standard: 700,
      vip: 1700
    },
    image: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    description: 'A festival of Tamil Nadu folk music and dance, highlighting rural traditions.',
    artistBio: 'The Nataka Mandram Ensemble specializes in classic and modern Tamil Nadu folk arts.'
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
