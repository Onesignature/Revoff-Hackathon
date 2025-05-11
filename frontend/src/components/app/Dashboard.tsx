import React, { useState, useRef, useEffect } from 'react';
import { ArrowUp, Info } from 'lucide-react';

const Dashboard: React.FC = () => {  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [carResults, setCarResults] = useState<any[]>([]);
  const [currentQuery, setCurrentQuery] = useState<string>('');
  const [reasoning, setReasoning] = useState<string>('');
  const [chatHistory, setChatHistory] = useState<{role: string, content: string}[]>([]);
  const [selectedCar, setSelectedCar] = useState<any>(null);
  
  const userId = useRef(`user-${Math.random().toString(36).substring(2, 9)}`);
  const inputRef = useRef<HTMLInputElement>(null);  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    try {
      setIsSearching(true);
      setCurrentQuery(searchQuery);
      
      // Add user message to chat history
      setChatHistory(prev => [...prev, { role: 'user', content: searchQuery }]);
      
      const response = await fetch('/api/chat/car-search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId.current,
          query: searchQuery,
        }),
      });
      
      const data = await response.json();
      
      if (data.matches && Array.isArray(data.matches) && data.matches.length > 0) {
        // Ensure all car objects have the required fields
        const processedResults = data.matches.map((car: any) => ({
          id: car.id || `car-${Math.random().toString(36).substring(2, 9)}`,
          name: car.name || 'Unknown Model',
          type: car.type || 'Vehicle',
          basePrice: car.basePrice || car.price || 300000,
          price: car.price || car.basePrice || 300000,
          imageUrl: car.imageUrl || 'mercedes/cle.jpg',
          description: car.description || 'No description available',
          monthlyRent: car.monthlyRent || Math.round((car.price || car.basePrice || 300000) * 0.03)
        }));
        
        setCarResults(processedResults);
        setReasoning(data.reasoning || 'Here are some cars that match your criteria.');
        setSelectedCar(processedResults[0]); // Select the first car by default
        
        // Add AI response to chat history
        const aiResponseText = data.reasoning || 'Here are some cars that match your criteria.';
        setChatHistory(prev => [...prev, { role: 'assistant', content: aiResponseText }]);
      } else {
        setChatHistory(prev => [...prev, { 
          role: 'assistant', 
          content: 'Sorry, I couldn\'t find any matches for your search criteria.' 
        }]);
        setCarResults([]);
        setSelectedCar(null);
      }
    } catch (error) {
      console.error('Error searching for cars:', error);
      setChatHistory(prev => [...prev, { 
        role: 'assistant', 
        content: 'Sorry, there was an error processing your request.' 
      }]);
      setCarResults([]);
      setSelectedCar(null);
    } finally {
      setIsSearching(false);
      setSearchQuery('');
    }
  };
  const handleSelectCar = (car: any) => {
    setSelectedCar(car);
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Revenue Card */}
        <div className="bg-white rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-100 rounded-lg">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="14" x="2" y="5" rx="2" />
                  <line x1="2" x2="22" y1="10" y2="10" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-600">Revenue breakdown</p>
                <p className="text-xs text-gray-500">01.07.24</p>
              </div>
            </div>
            <button className="p-2 hover:bg-gray-50 rounded-lg transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 7h10v10" />
                <path d="M7 17 17 7" />
              </svg>
            </button>
          </div>
          <p className="text-2xl font-semibold mb-4">AED 368,385.31</p>
          <div className="h-2 bg-red-600 rounded-full mb-2" style={{ width: '70%' }} />
          <div className="flex justify-between text-sm">
            <span>AED 257,869.72</span>
            <span>AED 110,515.59</span>
          </div>
        </div>

        {/* Sales Trends Card */}
        <div className="bg-white rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-100 rounded-lg">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 3v18h18" />
                  <path d="m19 9-5 5-4-4-3 3" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-600">Sales trends</p>
                <p className="text-xs text-gray-500">01.07.24 - 07.07.24</p>
              </div>
            </div>
            <button className="p-2 hover:bg-gray-50 rounded-lg transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 7h10v10" />
                <path d="M7 17 17 7" />
              </svg>
            </button>
          </div>
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-2xl font-semibold">+35.21%</span>
            <span className="text-sm text-gray-500">/ in a week</span>
          </div>
          <div className="grid grid-cols-7 gap-2 items-end h-24">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
              <div key={day} className="flex flex-col items-center gap-2">
                <div 
                  className={`w-full ${i === 5 ? 'bg-red-600' : 'bg-gray-100'} rounded-full`}
                  style={{ height: i === 5 ? '100%' : '40%' }}
                />
                <span className="text-xs text-gray-500">{day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Paid Amount Card */}
        <div className="bg-white rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-100 rounded-lg">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-600">Paid amount</p>
                <p className="text-xs text-gray-500">№82161</p>
              </div>
            </div>
            <button className="p-2 hover:bg-gray-50 rounded-lg transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 7h10v10" />
                <path d="M7 17 17 7" />
              </svg>
            </button>
          </div>
          <p className="text-2xl font-semibold mb-4">AED 90,809.59</p>
          <div className="relative">
            <div className="h-2 bg-red-600 rounded-full mb-2" />
            <div className="flex justify-between text-sm text-gray-500">
              <span>05.07.2024</span>
              <span>12.07.2024</span>
            </div>
            <div className="flex justify-between text-sm mt-1">
              <span>AED 0</span>
              <span>AED 90,809.59</span>
            </div>
          </div>
        </div>
      </div>      {/* AI Search Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-100 rounded-lg">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12a9 9 0 0 0-9-9 9 9 0 0 0-9 9c0 3.2 2.8 7 5.9 9l3.1 2 3.1-2c3.1-2 5.9-5.8 5.9-9Z" />
                  <path d="M12 12v.01" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-600">Search for a car</p>
                <p className="text-xs text-gray-500">AI assistant</p>
              </div>
            </div>
            <button className="p-2 hover:bg-gray-50 rounded-lg transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 7h10v10" />
                <path d="M7 17 17 7" />
              </svg>
            </button>
          </div>
          
          <div className="max-h-72 overflow-y-auto mb-6">
            {chatHistory.length === 0 ? (
              <p className="text-lg">
                Ask me to help you find a car based on your preferences
                <span className="text-gray-400"> (e.g., "Find a Mercedes under AED 36,000")</span>
              </p>
            ) : (
              chatHistory.map((message, index) => (
                <div key={index} className={`mb-4 ${message.role === 'user' ? 'text-right' : ''}`}>
                  <div className={`inline-block p-3 rounded-lg ${
                    message.role === 'user' 
                      ? 'bg-gray-100 text-left' 
                      : 'bg-red-600 text-white'
                  }`}>
                    <p>{message.content}</p>
                  </div>
                </div>
              ))
            )}
          </div>          {carResults.length > 0 && (
            <div className="grid grid-cols-2 gap-4 mb-6">
              {carResults.map((car) => (
                <div 
                  key={car.id} 
                  className={`${car.id === (selectedCar?.id || carResults[0].id) ? 'bg-red-600 text-white' : 'bg-white border border-gray-100'} rounded-xl p-4 cursor-pointer transition-colors`}
                  onClick={() => handleSelectCar(car)}
                >                  <img 
                    src={`/${car.imageUrl || 'mercedes/cle.jpg'}`} 
                    alt={car.name || 'Car'} 
                    className="w-full h-32 object-cover rounded-lg mb-3"
                  />
                  <h3 className="font-medium">{car.name || 'Unknown Model'}</h3>
                  <p className="text-lg font-semibold">AED {(car.price || car.basePrice || 0).toLocaleString()}</p>
                </div>
              ))}
            </div>
          )}

          <form onSubmit={handleSearch} className="flex mt-6 gap-4">
            <button 
              type="button"
              className="w-12 h-12 flex items-center justify-center border border-gray-200 rounded-full hover:bg-gray-50 transition-colors"
            >
              <Info size={20} />
            </button>
            <div className="flex-1 flex items-center gap-4 px-6 border border-gray-200 rounded-full">
              <div className="flex-1">
                <input 
                  type="text" 
                  placeholder="Type your car search query..." 
                  className="w-full bg-transparent focus:outline-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  ref={inputRef}
                />
              </div>
              <button 
                type="submit"
                className="w-10 h-10 flex items-center justify-center bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
                disabled={isSearching}
              >
                {isSearching ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <ArrowUp size={20} />
                )}
              </button>
            </div>
          </form>
        </div>        {/* Car Details Section */}
        <div className="bg-white rounded-xl p-6">
          {selectedCar ? (
            <>              <div className="flex items-center gap-3 mb-6">
                <h2 className="text-xl font-medium">{selectedCar?.name || 'Unknown Model'}</h2>
                <span className="text-sm text-gray-500">{selectedCar?.type || 'Vehicle'}</span>
              </div>

              <div className="relative mb-6 h-[300px]">
                <img 
                  src={`/${selectedCar?.imageUrl || 'mercedes/cle.jpg'}`} 
                  alt={selectedCar?.name || 'Car'} 
                  className="w-full h-full object-cover rounded-xl"
                />
              </div><div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <p className="text-4xl font-semibold">AED {(selectedCar.basePrice || selectedCar.price || 0).toLocaleString()}</p>
                  <p className="text-gray-500">Price</p>
                </div>
                <div>
                  <p className="text-4xl font-semibold">AED {Math.round(((selectedCar.basePrice || selectedCar.price || 0) * 0.25)).toLocaleString()}</p>
                  <p className="text-gray-500">Delivery</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium">{Math.floor(Math.random() * 20000) + 5000} km</p>
                    <p className="text-xs text-gray-500">Mileage of the car</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium">{selectedCar.type.includes('Electric') ? 'Electric' : '2.0L · Turbocharged'}</p>
                    <p className="text-xs text-gray-500">The engine</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2v8" />
                      <path d="m4.93 10.93 1.41 1.41" />
                      <path d="M2 18h2" />
                      <path d="M20 18h2" />
                      <path d="m19.07 10.93-1.41 1.41" />
                      <path d="M22 22H2" />
                      <path d="m16 6-4 4-4-4" />
                      <path d="M16 18a4 4 0 0 0-8 0" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium">city {Math.floor(Math.random() * 5) + 8} · route {Math.floor(Math.random() * 3) + 5}</p>
                    <p className="text-xs text-gray-500">Fuel consumption</p>
                  </div>
                </div>
              </div>              <div className="mt-6">
                <p className="text-sm text-gray-700 mb-4">{selectedCar.description || 'No description available'}</p>
              </div>

              <div className="mt-2 p-4 bg-gray-50 rounded-xl flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Monthly rent</p>
                  <p className="text-lg font-semibold">AED {(selectedCar.monthlyRent || 0).toLocaleString()}</p>
                </div>
                <button className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
                  View details
                </button>
              </div>
            </>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-6">
              <div className="p-4 bg-gray-100 rounded-full mb-4">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12a9 9 0 0 0-9-9 9 9 0 0 0-9 9c0 3.2 2.8 7 5.9 9l3.1 2 3.1-2c3.1-2 5.9-5.8 5.9-9Z" />
                  <path d="M12 12v.01" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-2">Find your perfect car</h3>
              <p className="text-gray-500 mb-8">
                Use the AI assistant to search for cars based on your preferences like budget, brand, features, or type.
              </p>
              <p className="text-sm text-gray-400">
                Example queries:
              </p>
              <ul className="text-sm text-gray-500 mt-2">
                <li>"Mercedes under AED 400,000"</li>
                <li>"Luxury cars with high ROI"</li>
                <li>"Sports cars with good market trend"</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;