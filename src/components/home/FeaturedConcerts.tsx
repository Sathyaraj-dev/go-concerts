
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Concert } from '@/lib/types';
import { getFeaturedConcerts } from '@/data/concertData';
import ConcertCard from '@/components/concert/ConcertCard';
import Loading from '@/components/ui/Loading';
import { Button } from '@/components/ui/button';

const FeaturedConcerts = () => {
  const [concerts, setConcerts] = useState<Concert[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadConcerts = async () => {
      try {
        const data = await getFeaturedConcerts();
        setConcerts(data);
      } catch (error) {
        console.error('Error fetching featured concerts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadConcerts();
  }, []);

  if (isLoading) {
    return (
      <div className="py-20">
        <Loading size="large" className="mx-auto" />
      </div>
    );
  }

  return (
    <section id="featured" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center">
          <h2 className="text-4xl font-bold mb-4">Featured Events</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Don't miss out on these highly anticipated concerts and musical experiences.
          </p>
        </div>
        
        {concerts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {concerts.map((concert) => (
                <ConcertCard key={concert.id} concert={concert} featured={true} />
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <Button size="lg" asChild>
                <Link to="/concerts">View All Concerts</Link>
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-500">No featured concerts available at the moment.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedConcerts;
