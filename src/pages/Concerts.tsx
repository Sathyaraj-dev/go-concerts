
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ConcertCard from '@/components/concert/ConcertCard';
import Loading from '@/components/ui/Loading';
import { Concert } from '@/lib/types';
import { getFilteredConcerts, getAllConcerts } from '@/data/concertData';

const Concerts = () => {
  const [concerts, setConcerts] = useState<Concert[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [filters, setFilters] = useState({
    location: searchParams.get('location') || '',
    date: searchParams.get('date') || '',
    genre: searchParams.get('genre') || '',
    artist: searchParams.get('search') || ''
  });

  useEffect(() => {
    const fetchConcerts = async () => {
      setLoading(true);
      try {
        let data: Concert[];
        
        // Check if we have active filters
        if (filters.location || filters.date || filters.genre || filters.artist) {
          data = await getFilteredConcerts(
            filters.location,
            filters.date,
            filters.genre,
            filters.artist
          );
        } else {
          data = await getAllConcerts();
        }
        
        setConcerts(data);
      } catch (error) {
        console.error('Error fetching concerts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchConcerts();
  }, [filters]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Update URL search params
    if (value) {
      searchParams.set(name, value);
    } else {
      searchParams.delete(name);
    }
    
    setSearchParams(searchParams);
  };

  const clearFilters = () => {
    setFilters({
      location: '',
      date: '',
      genre: '',
      artist: ''
    });
    setSearchParams({});
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-gray-50">
        <section className="py-10 bg-purple-900 text-white">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold text-center">Discover Concerts</h1>
          </div>
        </section>
        
        <section className="container mx-auto px-4 py-8">
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-md mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  name="location"
                  value={filters.location}
                  onChange={handleFilterChange}
                  placeholder="City or state"
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                  type="date"
                  name="date"
                  value={filters.date}
                  onChange={handleFilterChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Genre</label>
                <select
                  name="genre"
                  value={filters.genre}
                  onChange={handleFilterChange}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="">All Genres</option>
                  <option value="Rock">Rock</option>
                  <option value="Pop">Pop</option>
                  <option value="Jazz">Jazz</option>
                  <option value="Classical">Classical</option>
                  <option value="Electronic">Electronic</option>
                  <option value="Country">Country</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Artist/Event</label>
                <input
                  type="text"
                  name="artist"
                  value={filters.artist}
                  onChange={handleFilterChange}
                  placeholder="Search artists or events"
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
            </div>
            
            <div className="mt-4 flex justify-end">
              <button
                onClick={clearFilters}
                className="text-purple-700 hover:text-purple-900 text-sm font-medium"
              >
                Clear Filters
              </button>
            </div>
          </div>
          
          {loading ? (
            <div className="py-20">
              <Loading size="large" className="mx-auto" />
            </div>
          ) : (
            <div>
              <div className="mb-4 flex justify-between items-center">
                <h2 className="text-xl font-semibold">
                  {concerts.length} {concerts.length === 1 ? 'Concert' : 'Concerts'} Available
                </h2>
              </div>
              
              {concerts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {concerts.map(concert => (
                    <ConcertCard key={concert.id} concert={concert} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <h3 className="text-xl font-medium text-gray-700 mb-2">No concerts found</h3>
                  <p className="text-gray-500">Try adjusting your filters to find more results</p>
                </div>
              )}
            </div>
          )}
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Concerts;
