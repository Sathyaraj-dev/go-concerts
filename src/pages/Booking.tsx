
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, Plus, Minus } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Loading from '@/components/ui/Loading';
import { Button } from '@/components/ui/button';
import { useBooking } from '@/contexts/BookingContext';
import { getConcertById, createBooking } from '@/data/concertData';
import { formatDate, calculateTotalPrice } from '@/lib/utils';

const Booking = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { selectedConcert, setSelectedConcert, bookingData, updateBookingData } = useBooking();
  const [loading, setLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  
  // Calculate total price
  const totalPrice = selectedConcert 
    ? calculateTotalPrice(
        selectedConcert.price.standard,
        bookingData.quantity,
        bookingData.ticketType,
        selectedConcert.price
      )
    : 0;

  useEffect(() => {
    const fetchConcertIfNeeded = async () => {
      if (!selectedConcert && id) {
        setLoading(true);
        try {
          const concertData = await getConcertById(id);
          if (!concertData) {
            navigate('/concerts');
            return;
          }
          setSelectedConcert(concertData);
        } catch (error) {
          console.error('Error fetching concert:', error);
          navigate('/concerts');
        } finally {
          setLoading(false);
        }
      }
    };
    
    fetchConcertIfNeeded();
  }, [id, selectedConcert, setSelectedConcert, navigate]);

  const handleQuantityChange = (amount: number) => {
    const newQuantity = Math.max(1, Math.min(10, bookingData.quantity + amount));
    updateBookingData({ quantity: newQuantity });
  };

  const handleTicketTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateBookingData({ ticketType: e.target.value as 'standard' | 'vip' | 'earlyBird' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateBookingData({ [name]: value } as any);
  };

  const validateStep1 = () => {
    // Ticket selection is always valid as we have defaults
    setCurrentStep(2);
    window.scrollTo(0, 0);
  };

  const validateStep2 = () => {
    // Validate user details
    if (!bookingData.name || !bookingData.email || !bookingData.phone) {
      alert('Please fill in all required fields');
      return;
    }
    
    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(bookingData.email)) {
      alert('Please enter a valid email address');
      return;
    }
    
    setCurrentStep(3);
    window.scrollTo(0, 0);
  };

  const handleSubmit = async () => {
    if (!selectedConcert) return;
    
    setIsProcessing(true);
    try {
      const booking = await createBooking({
        concertId: selectedConcert.id,
        userId: 'u1', // Hardcoded user ID for demo
        ticketType: bookingData.ticketType,
        quantity: bookingData.quantity,
        totalPrice,
        userDetails: {
          name: bookingData.name,
          email: bookingData.email,
          phone: bookingData.phone
        }
      });
      
      // Navigate to confirmation page
      navigate('/confirmation', { state: { booking, concert: selectedConcert } });
    } catch (error) {
      console.error('Error creating booking:', error);
      alert('There was an error processing your booking. Please try again.');
    } finally {
      setIsProcessing(false);
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
  
  if (!selectedConcert) {
    return null; // This should never happen due to the useEffect
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-gray-50">
        <section className="container mx-auto px-4 py-10">
          <div className="max-w-4xl mx-auto">
            {/* Progress Steps */}
            <div className="mb-8">
              <div className="flex items-center justify-center">
                <div className={`flex items-center ${currentStep > 1 ? 'text-purple-700' : 'text-gray-500'}`}>
                  <div className={`w-8 h-8 flex items-center justify-center rounded-full ${
                    currentStep >= 1 ? 'bg-purple-700 text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    1
                  </div>
                  <span className="ml-2 text-sm">Tickets</span>
                </div>
                <div className={`w-12 h-1 mx-2 ${currentStep > 1 ? 'bg-purple-700' : 'bg-gray-200'}`}></div>
                
                <div className={`flex items-center ${currentStep > 2 ? 'text-purple-700' : 'text-gray-500'}`}>
                  <div className={`w-8 h-8 flex items-center justify-center rounded-full ${
                    currentStep >= 2 ? 'bg-purple-700 text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    2
                  </div>
                  <span className="ml-2 text-sm">Details</span>
                </div>
                <div className={`w-12 h-1 mx-2 ${currentStep > 2 ? 'bg-purple-700' : 'bg-gray-200'}`}></div>
                
                <div className={`flex items-center ${currentStep > 3 ? 'text-purple-700' : 'text-gray-500'}`}>
                  <div className={`w-8 h-8 flex items-center justify-center rounded-full ${
                    currentStep >= 3 ? 'bg-purple-700 text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    3
                  </div>
                  <span className="ml-2 text-sm">Payment</span>
                </div>
              </div>
            </div>
            
            {/* Booking Content */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Header */}
              <div className="bg-purple-700 text-white p-6">
                <h1 className="text-2xl font-bold">{selectedConcert.title}</h1>
                <div className="flex items-center mt-2">
                  <Calendar className="h-5 w-5 mr-2" />
                  <span>{formatDate(selectedConcert.date)} • {selectedConcert.time}</span>
                </div>
              </div>
              
              {/* Step 1: Ticket Selection */}
              {currentStep === 1 && (
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-6">Select Your Tickets</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Ticket Type
                      </label>
                      <select
                        value={bookingData.ticketType}
                        onChange={handleTicketTypeChange}
                        className="w-full p-3 border border-gray-300 rounded-md"
                      >
                        <option value="standard">Standard - ${selectedConcert.price.standard}</option>
                        {selectedConcert.price.vip && (
                          <option value="vip">VIP - ${selectedConcert.price.vip}</option>
                        )}
                        {selectedConcert.price.earlyBird && (
                          <option value="earlyBird">Early Bird - ${selectedConcert.price.earlyBird}</option>
                        )}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Quantity
                      </label>
                      <div className="flex items-center">
                        <button
                          type="button"
                          onClick={() => handleQuantityChange(-1)}
                          className="p-2 bg-gray-100 rounded-l-md border border-gray-300"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <div className="px-6 py-2 border-t border-b border-gray-300 text-center min-w-[60px]">
                          {bookingData.quantity}
                        </div>
                        <button
                          type="button"
                          onClick={() => handleQuantityChange(1)}
                          className="p-2 bg-gray-100 rounded-r-md border border-gray-300"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="mt-2 text-sm text-gray-500">
                        Maximum 10 tickets per order
                      </p>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-4 mt-6">
                      <div className="flex justify-between font-semibold text-lg">
                        <span>Total:</span>
                        <span>${totalPrice.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <Button size="lg" className="w-full" onClick={validateStep1}>
                      Continue to Details
                    </Button>
                  </div>
                </div>
              )}
              
              {/* Step 2: User Details */}
              {currentStep === 2 && (
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-6">Your Details</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={bookingData.name}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-md"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={bookingData.email}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-md"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={bookingData.phone}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-md"
                        required
                      />
                    </div>
                    
                    <div className="border-t border-gray-200 pt-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-700">
                          {bookingData.quantity} x {bookingData.ticketType} ticket{bookingData.quantity > 1 ? 's' : ''}
                        </span>
                        <span className="font-medium">
                          ${totalPrice.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 flex flex-col sm:flex-row gap-4">
                    <Button 
                      variant="outline" 
                      size="lg" 
                      className="flex-1"
                      onClick={() => setCurrentStep(1)}
                    >
                      Back to Tickets
                    </Button>
                    <Button 
                      size="lg" 
                      className="flex-1"
                      onClick={validateStep2}
                    >
                      Continue to Payment
                    </Button>
                  </div>
                </div>
              )}
              
              {/* Step 3: Payment */}
              {currentStep === 3 && (
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-6">Payment Details</h2>
                  
                  <div className="space-y-6">
                    <p className="text-gray-700 mb-4">
                      This is a demo application. No real payment will be processed.
                    </p>
                    
                    <div className="border p-4 rounded-md bg-gray-50">
                      <h3 className="font-medium mb-3">Order Summary</h3>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Event:</span>
                          <span className="font-semibold">{selectedConcert.title}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Date:</span>
                          <span className="font-semibold">{formatDate(selectedConcert.date)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Time:</span>
                          <span className="font-semibold">{selectedConcert.time}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Venue:</span>
                          <span className="font-semibold">{selectedConcert.venue.name}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Ticket Type:</span>
                          <span className="font-semibold">{bookingData.ticketType}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Quantity:</span>
                          <span className="font-semibold">{bookingData.quantity}</span>
                        </div>
                        
                        <div className="pt-2 mt-2 border-t border-gray-200">
                          <div className="flex justify-between font-medium">
                            <span>Total:</span>
                            <span>${totalPrice.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-3">Customer Information</h3>
                      <p className="text-sm">
                        <span className="font-medium">Name:</span> {bookingData.name}<br />
                        <span className="font-medium">Email:</span> {bookingData.email}<br />
                        <span className="font-medium">Phone:</span> {bookingData.phone}
                      </p>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-4 flex items-center">
                      <input 
                        type="checkbox" 
                        id="terms" 
                        className="rounded text-purple-700 mr-2" 
                        defaultChecked 
                      />
                      <label htmlFor="terms" className="text-sm text-gray-700">
                        I agree to the <a href="#" className="text-purple-700 hover:underline">Terms and Conditions</a>
                      </label>
                    </div>
                  </div>
                  
                  <div className="mt-8 flex flex-col sm:flex-row gap-4">
                    <Button 
                      variant="outline" 
                      size="lg" 
                      className="flex-1"
                      onClick={() => setCurrentStep(2)}
                    >
                      Back to Details
                    </Button>
                    <Button 
                      size="lg" 
                      className="flex-1"
                      onClick={handleSubmit}
                      disabled={isProcessing}
                    >
                      {isProcessing ? <Loading size="small" color="text-white" /> : 'Complete Purchase'}
                    </Button>
                  </div>
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

export default Booking;
