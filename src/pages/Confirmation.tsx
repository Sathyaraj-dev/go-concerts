
import { useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Check, Download, Calendar, MapPin, User, Mail, Phone } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Concert, Booking } from '@/lib/types';
import { formatDate, formatCurrency } from '@/lib/utils';
import { useBooking } from '@/contexts/BookingContext';

interface LocationState {
  booking: Booking;
  concert: Concert;
}

const Confirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { resetBooking } = useBooking();
  
  // Try to get the booking and concert from location state
  const state = location.state as LocationState | undefined;
  const booking = state?.booking;
  const concert = state?.concert;
  
  useEffect(() => {
    // If no booking data, redirect to the concerts page
    if (!booking || !concert) {
      navigate('/concerts');
    }
    
    // Reset booking data when component unmounts
    return () => {
      resetBooking();
    };
  }, [booking, concert, navigate, resetBooking]);
  
  if (!booking || !concert) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-gray-50">
        <section className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto">
            {/* Success Header */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-800">Booking Confirmed!</h1>
              <p className="text-gray-600 mt-2">
                Your tickets have been booked successfully.
              </p>
            </div>
            
            {/* Ticket Details */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
              <div className="bg-purple-700 text-white p-6">
                <h2 className="text-xl font-bold">{concert.title}</h2>
                <p className="mt-1">{concert.artist}</p>
              </div>
              
              <div className="p-6">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 mb-4">Event Details</h3>
                    
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <Calendar className="h-5 w-5 text-gray-500 mr-3" />
                        <div>
                          <p className="text-sm text-gray-600">Date & Time</p>
                          <p className="font-medium">{formatDate(concert.date)} • {concert.time}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <MapPin className="h-5 w-5 text-gray-500 mr-3" />
                        <div>
                          <p className="text-sm text-gray-600">Venue</p>
                          <p className="font-medium">{concert.venue.name}</p>
                          <p className="text-sm text-gray-500">
                            {concert.venue.address}, {concert.venue.city}, {concert.venue.state}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 mb-4">Ticket Information</h3>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Booking ID:</span>
                        <span className="font-medium">{booking.id}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Ticket Type:</span>
                        <span className="font-medium">{booking.ticketType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Quantity:</span>
                        <span className="font-medium">{booking.quantity}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Unit Price:</span>
                        <span className="font-medium">
                          {formatCurrency(booking.totalPrice / booking.quantity)}
                        </span>
                      </div>
                      <div className="flex justify-between pt-2 mt-2 border-t border-gray-200">
                        <span className="font-semibold">Total Paid:</span>
                        <span className="font-bold text-purple-700">
                          {formatCurrency(booking.totalPrice)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h3 className="font-semibold text-gray-800 mb-4">Customer Details</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center">
                      <User className="h-5 w-5 text-gray-500 mr-3" />
                      <div>
                        <p className="text-sm text-gray-600">Name</p>
                        <p className="font-medium">{booking.userDetails.name}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <Mail className="h-5 w-5 text-gray-500 mr-3" />
                      <div>
                        <p className="text-sm text-gray-600">Email</p>
                        <p className="font-medium">{booking.userDetails.email}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <Phone className="h-5 w-5 text-gray-500 mr-3" />
                      <div>
                        <p className="text-sm text-gray-600">Phone</p>
                        <p className="font-medium">{booking.userDetails.phone}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Actions */}
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button variant="outline" className="flex items-center" asChild>
                <Link to="/account">
                  <User className="h-4 w-4 mr-2" />
                  View My Bookings
                </Link>
              </Button>
              
              <Button className="flex items-center">
                <Download className="h-4 w-4 mr-2" />
                Download Tickets
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Confirmation;
