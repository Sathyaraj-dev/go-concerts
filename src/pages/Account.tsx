import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, MapPin, User, Mail, Phone, CreditCard } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/lib/utils';

interface Ticket {
  id: string;
  concertTitle: string;
  venue: string;
  date: string;
  time: string;
  price: number;
  status: string;
}

const Account = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Mock ticket data - replace with actual data fetching
    const mockTickets: Ticket[] = [
      {
        id: '1',
        concertTitle: 'Rock Concert',
        venue: 'City Arena',
        date: '2024-08-15',
        time: '20:00',
        price: 75,
        status: 'Confirmed',
      },
      {
        id: '2',
        concertTitle: 'Pop Music Fest',
        venue: 'Central Park',
        date: '2024-09-20',
        time: '19:30',
        price: 60,
        status: 'Pending',
      },
      {
        id: '3',
        concertTitle: 'Jazz Night',
        venue: 'Jazz Club',
        date: '2024-10-05',
        time: '21:00',
        price: 45,
        status: 'Cancelled',
      },
    ];

    // Simulate loading delay
    setTimeout(() => {
      setTickets(mockTickets);
      setLoading(false);
    }, 1000);
  }, []);

  const handleCancelTicket = (ticketId: string) => {
    // Implement cancellation logic here
    console.log(`Attempting to cancel ticket with ID: ${ticketId}`);
    // After successful cancellation, update the ticket status
    setTickets((prevTickets) =>
      prevTickets.map((ticket) =>
        ticket.id === ticketId ? { ...ticket, status: 'Cancelled' } : ticket
      )
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <p>Loading your tickets...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex flex-col items-center justify-center">
          <h2 className="text-2xl font-bold mb-4">Error</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Button onClick={() => navigate('/')}>
            Back to Home
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-8">
        <section className="mb-8">
          <h1 className="text-3xl font-bold mb-4">My Account</h1>
          <p className="text-gray-600">View and manage your account details and ticket bookings.</p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* User Profile */}
          <div className="md:col-span-1 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Profile Information</h2>
            <div className="flex items-center mb-4">
              <User className="h-5 w-5 mr-2 text-gray-500" />
              <span className="font-medium">John Doe</span>
            </div>
            <div className="flex items-center mb-4">
              <Mail className="h-5 w-5 mr-2 text-gray-500" />
              <span className="font-medium">john.doe@example.com</span>
            </div>
            <div className="flex items-center mb-4">
              <Phone className="h-5 w-5 mr-2 text-gray-500" />
              <span className="font-medium">+1 555-123-4567</span>
            </div>
            <Button variant="outline">Update Profile</Button>
          </div>

          {/* Payment Information */}
          <div className="md:col-span-1 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Payment Information</h2>
            <div className="flex items-center mb-4">
              <CreditCard className="h-5 w-5 mr-2 text-gray-500" />
              <span className="font-medium">**** **** **** 1234</span>
            </div>
            <Button variant="outline">Update Payment Info</Button>
          </div>

          {/* Ticket Bookings */}
          <div className="md:col-span-3 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">My Ticket Bookings</h2>
            {tickets.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Concert
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Venue
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date & Time
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {tickets.map((ticket) => (
                      <tr key={ticket.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{ticket.concertTitle}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{ticket.venue}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            {formatDate(ticket.date)} - {ticket.time}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">₹{ticket.price}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {/* <Badge variant="success">{ticket.status}</Badge> */}
                          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">{ticket.status}</Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          {ticket.status === 'Confirmed' && (
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleCancelTicket(ticket.id)}
                            >
                              Cancel
                            </Button>
                          )}
                          {ticket.status === 'Pending' && (
                            <Button variant="secondary" size="sm">
                              Pay Now
                            </Button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500">No tickets booked yet.</p>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Account;
