import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { MapPin, Calendar, Clock, Ticket } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Badge from '@/components/ui/Badge';
import Loading from '@/components/ui/Loading';
import { Button } from '@/components/ui/button';
import { Concert } from '@/lib/types';
import { getConcertById } from '@/data/concertData';
import { formatDate, createMapUrl } from '@/lib/utils';
import { useBooking } from '@/contexts/BookingContext';

const ConcertDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [concert, setConcert] = useState<Concert | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { setSelectedConcert } = useBooking();

  useEffect(() => {
    const fetchConcert = async () => {
      if (!id) return;
      
      setLoading(true);
      try {
        const data = await getConcertById(id);
        if (data) {
          setConcert(data);
        } else {
          setError('Concert not found');
        }
      } catch (err) {
        setError('Failed to load concert details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchConcert();
  }, [id]);

  const handleBooking = () => {
    if (concert) {
      setSelectedConcert(concert);
      navigate(`/booking/${concert.id}`);
    }
  };

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

  if (error || !concert) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex flex-col items-center justify-center">
          <h2 className="text-2xl font-bold mb-4">Error</h2>
          <p className="text-gray-600 mb-6">{error || 'Concert not found'}</p>
          <Link to="/concerts" className="btn-primary">
            Back to Concerts
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-72 md:h-96">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
            <img 
              src={concert.image} 
              alt={concert.title} 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="container mx-auto px-4 relative h-full z-20 flex flex-col justify-end pb-10">
            <div className="flex flex-wrap gap-2 mb-4">
              {concert.genres.map((genre) => (
                <Badge key={genre} variant="outline" className="border-white text-white">
                  {genre}
                </Badge>
              ))}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{concert.title}</h1>
            <p className="text-xl text-white/90">{concert.artist}</p>
          </div>
        </section>
        
        {/* Content Section */}
        <section className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-2xl font-bold mb-4">Event Details</h2>
                <p className="text-gray-700 mb-6">{concert.description}</p>
                
                {concert.artistBio && (
                  <>
                    <h3 className="text-xl font-bold mb-3">About the Artist</h3>
                    <p className="text-gray-700 mb-6">{concert.artistBio}</p>
                  </>
                )}
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-4">Venue Information</h2>
                <div className="aspect-video mb-4">
                  <iframe 
                    src={createMapUrl(concert.venue.coordinates.lat, concert.venue.coordinates.lng)}
                    className="w-full h-full rounded-md border-0"
                    allowFullScreen
                    loading="lazy"
                    title="Concert venue location"
                  ></iframe>
                </div>
                
                <h3 className="text-xl font-semibold mb-2">{concert.venue.name}</h3>
                <p className="text-gray-600 mb-4">
                  {concert.venue.address}, {concert.venue.city}, {concert.venue.state} {concert.venue.zipCode}
                </p>
                
                {concert.venue.capacity && (
                  <p className="text-gray-600">
                    <span className="font-semibold">Capacity:</span> {concert.venue.capacity.toLocaleString()} people
                  </p>
                )}
              </div>
            </div>
            
            <div>
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                <h2 className="text-2xl font-bold mb-6">Ticket Information</h2>
                
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-purple-700" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Date</p>
                    <p className="font-medium">{formatDate(concert.date)}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <Clock className="h-5 w-5 text-purple-700" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Time</p>
                    <p className="font-medium">{concert.time}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-purple-700" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-medium">{concert.venue.city}, {concert.venue.state}</p>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-6 mb-6">
                  <h3 className="text-xl font-bold mb-4">Ticket Prices</h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Standard</span>
                      <span className="font-semibold">₹{concert.price.standard}</span>
                    </div>
                    
                    {concert.price.vip && (
                      <div className="flex justify-between">
                        <span>VIP</span>
                        <span className="font-semibold">₹{concert.price.vip}</span>
                      </div>
                    )}
                    
                    {concert.price.earlyBird && (
                      <div className="flex justify-between">
                        <span>Early Bird</span>
                        <span className="font-semibold">₹{concert.price.earlyBird}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <Button 
                  size="lg" 
                  className="w-full"
                  onClick={handleBooking}
                >
                  <Ticket className="h-4 w-4 mr-2" />
                  Book Tickets
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default ConcertDetails;
