import React from 'react';
import { City } from '../types';

interface HeaderProps {
  cities: City[];
  selectedCity: City;
  onCityChange: (city: City) => void;
}

const Header: React.FC<HeaderProps> = ({ cities, selectedCity, onCityChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const cityName = e.target.value;
    const city = cities.find(c => c.name === cityName);
    if (city) {
      onCityChange(city);
    }
  };

  return (
    <header className="absolute top-0 left-0 right-0 z-50 px-6 py-6 flex justify-between items-center">
      <div className="flex items-center">
        <h1 className="text-xs font-bold tracking-widest text-gray-500 uppercase">
          MY WEATHER APP
        </h1>
      </div>
      
      <div className="relative group">
        <select
          value={selectedCity.name}
          onChange={handleChange}
          className="appearance-none bg-white/80 backdrop-blur-md border border-gray-200/50 text-gray-800 text-sm font-semibold rounded-full pl-4 pr-10 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400 hover:bg-white transition-all cursor-pointer"
          aria-label="Select City"
        >
          {cities.map((city) => (
            <option key={city.name} value={city.name}>
              Select City: {city.name}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-600">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
          </svg>
        </div>
      </div>
    </header>
  );
};

export default Header;