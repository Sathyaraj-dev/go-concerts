
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import tamilMusiciansBanner from '@/assets/tamil-musicians-banner.jpg';

const Hero = () => {
  return (
    <section className="relative bg-purple-900 text-white overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 to-purple-700/80 z-10"></div>
      
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-60"
        style={{ backgroundImage: `url(${tamilMusiciansBanner})` }}
      ></div>
      
      {/* Hero content */}
      <div className="container mx-auto px-4 py-24 md:py-36 relative z-20">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
            Experience Live Music Like Never Before
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Discover and book tickets to the hottest concerts and music events in your area.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="bg-white text-purple-900 hover:bg-gray-100" asChild>
              <Link to="/concerts">Browse Concerts</Link>
            </Button>
            <Button size="lg" className="bg-purple-600 text-white hover:bg-purple-700 border-none" asChild>
              <Link to="#featured">Featured Events</Link>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Decorative wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 160">
          <path 
            fill="#ffffff" 
            fillOpacity="1" 
            d="M0,96L48,106.7C96,117,192,139,288,138.7C384,139,480,117,576,96C672,75,768,53,864,58.7C960,64,1056,96,1152,106.7C1248,117,1344,107,1392,101.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
