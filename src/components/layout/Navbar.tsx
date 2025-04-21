
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-heading font-bold text-purple-800">
            VibeCheck
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-gray-700 hover:text-purple-700 transition-colors">
            Home
          </Link>
          <Link to="/concerts" className="text-gray-700 hover:text-purple-700 transition-colors">
            Concerts
          </Link>
          <Link to="/account" className="text-gray-700 hover:text-purple-700 transition-colors">
            My Tickets
          </Link>
          <Button>
            Sign In
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-gray-700">
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white w-full py-4 px-4 shadow-lg">
          <nav className="flex flex-col space-y-4">
            <Link to="/" className="text-gray-700 hover:text-purple-700 transition-colors py-2" onClick={toggleMenu}>
              Home
            </Link>
            <Link to="/concerts" className="text-gray-700 hover:text-purple-700 transition-colors py-2" onClick={toggleMenu}>
              Concerts
            </Link>
            <Link to="/account" className="text-gray-700 hover:text-purple-700 transition-colors py-2" onClick={toggleMenu}>
              My Tickets
            </Link>
            <Button className="w-full">
              Sign In
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
