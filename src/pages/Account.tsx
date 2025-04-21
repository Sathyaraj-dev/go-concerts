
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Ticket } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Loading from '@/components/ui/Loading';
import Badge from '@/components/ui/Badge';
import { Button } from '@/components/ui/button';
import { Booking, Concert } from '@/lib/types';
import { getUserBookings, getConcertById } from '@/data/concertData';
import { formatDate, formatCurrency } from '@/lib/utils';

type BookingWithConcert = Booking & {
  concertDetails: Concert;
};

const Account = () => {
  const [bookings, setBookings] = useState<BookingWithConcert[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      try {
        // Fetch bookings using mock user ID "u1"
        const userBookings = await getUserBookings('u1');
        
        // Fetch concert details for each booking
        const bookingsWithConcerts = await Promise.all(
          userBookings.map(async (booking) => {
            const concertDetails = await getConcertById(booking.concertId);
            return {
              ...booking,
              concertDetails: concertDetails!
            };
          })
        );
        
        setBookings(bookingsWithConcerts);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchBookings();
  }, []);

  // Filter bookings based on active tab
  const filteredBookings = bookings.filter((booking) => {
    const eventDate = new Date(booking.concertDetails.date);
    const now = new Date();
    return activeTab === 'upcoming' ? eventDate >= now : eventDate < now;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <Loading size="large" />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-gray-50">
        <section className="py-10 bg-purple-900 text-white">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold text-center">My Account</h1>
          </div>
        </section>
        
        <section className="container mx-auto px-4 py-10">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-bold mb-6">Personal Information</h2>
              
              {/* Mock user data */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <p className="text-gray-900">John Doe</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <p className="text-gray-900">john@example.com</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <p className="text-gray-900">555-123-4567</p>
                </div>
              </div>
              
              <Button variant="outline">Edit Profile</Button>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-6">My Bookings</h2>
              
              <div className="flex border-b border-gray-200 mb-6">
                <button
                  className={`pb-3 px-4 ${activeTab === 'upcoming' ? 'border-b-2 border-purple-700 font-semibold' : 'text-gray-500'}`}
                  onClick={() => setActiveTab('upcoming')}
                >
                  Upcoming
                </button>
                <button
                  className={`pb-3 px-4 ${activeTab === 'past' ? 'border-b-2 border-purple-700 font-semibold' : 'text-gray-500'}`}
                  onClick={() => setActiveTab('past')}
                >
                  Past
                </button>
              </div>
              
              {filteredBookings.length === 0 ? (
                <div className="text-center py-10">
                  <Ticket className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-gray-700 mb-2">
                    No {activeTab} bookings
                  </h3>
                  <p className="text-gray-500 mb-6">
                    {activeTab === 'upcoming'
                      ? "You don't have any upcoming concerts booked."
                      : "You haven't attended any concerts yet."}
                  </p>
                  {activeTab === 'upcoming' && (
                    <Button asChild>
                      <Link to="/concerts">Browse Concerts</Link>
                    </Button>
                  )}
                </div>
              ) : (
                <div className="space-y-6">
                  {filteredBookings.map((booking) => (
                    <div 
                      key={booking.id} 
                      className="border border-gray-200 rounded-lg overflow-hidden flex flex-col md:flex-row"
                    >
                      <div className="md:w-40 h-32 md:h-auto">
                        <img
                          src={booking.concertDetails.image}
                          alt={booking.concertDetails.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="flex-1 p-4 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start">
                            <h3 className="text-lg font-bold">
                              {booking.concertDetails.title}
                            </h3>
                            <Badge variant={booking.status === 'confirmed' ? 'success' : 'default'}>
                              {booking.status}
                            </Badge>
                          </div>
                          
                          <p className="text-gray-700 mb-2">{booking.concertDetails.artist}</p>
                          
                          <div className="flex items-center text-gray-600 text-sm mb-2">
                            <Calendar className="h-4 w-4 mr-1" />
                            {formatDate(booking.concertDetails.date)} • {booking.concertDetails.time}
                          </div>
                          
                          <div className="flex flex-wrap gap-2 items-center text-sm">
                            <span className="font-medium">
                              {booking.quantity} x {booking.ticketType}
                            </span>
                            <span className="text-gray-500">|</span>
                            <span className="font-medium">
                              Total: {formatCurrency(booking.totalPrice)}
                            </span>
                          </div>
                        </div>
                        
                        <div className="mt-4 flex flex-wrap gap-3">
                          <Button size="sm" variant="outline" asChild>
                            <Link to={`/concerts/${booking.concertDetails.id}`}>
                              View Event
                            </Link>
                          </Button>
                          <Button size="sm">
                            View Tickets
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Account;
