
import { Link } from 'react-router-dom';
import { Concert } from '@/lib/types';
import { formatDate } from '@/lib/utils';
import Badge from '@/components/ui/Badge';

interface ConcertCardProps {
  concert: Concert;
  featured?: boolean;
}

const ConcertCard: React.FC<ConcertCardProps> = ({ concert, featured = false }) => {
  return (
    <Link 
      to={`/concerts/${concert.id}`} 
      className="block group hover:no-underline"
    >
      <div 
        className={`bg-white rounded-lg overflow-hidden shadow-md transition-all hover:shadow-xl ${
          featured ? 'h-full flex flex-col' : ''
        }`}
      >
        <div className="relative aspect-video overflow-hidden">
          <img 
            src={concert.image} 
            alt={concert.title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {concert.featured && (
            <div className="absolute top-4 left-4">
              <Badge variant="default">Featured</Badge>
            </div>
          )}
        </div>
        <div className="p-5">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-bold text-gray-800 group-hover:text-purple-700 transition-colors">
              {concert.title}
            </h3>
          </div>
          <p className="text-gray-600 mb-1">{concert.artist}</p>
          <div className="flex items-center justify-between mt-4">
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">
                {formatDate(concert.date)}
              </span>
              <span className="text-sm text-gray-500">
                {concert.venue.city}, {concert.venue.state}
              </span>
            </div>
            <div className="text-right">
              <span className="text-sm text-gray-500">From</span>
              <p className="text-purple-700 font-bold">
                ${concert.price.standard}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ConcertCard;
