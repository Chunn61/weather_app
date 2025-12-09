import React, { useMemo } from 'react';
import { City, WeatherData } from '../types';
import { WeatherIcon } from './Icons';

interface HeroProps {
  city: City;
  weather: WeatherData | null;
  loading: boolean;
}

const Hero: React.FC<HeroProps> = ({ city, weather, loading }) => {
  // Generate a consistent image URL
  const imageUrl = useMemo(() => {
    const seed = city.name.replace(/\s/g, '').toLowerCase();
    return `https://picsum.photos/seed/${seed}/600/400`;
  }, [city.name]);

  if (loading || !weather) {
    return (
      <section className="bg-gray-100 w-full h-[600px] animate-pulse flex flex-col p-6 pt-24 space-y-4">
        <div className="h-8 bg-gray-200 rounded w-1/2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        <div className="flex-grow"></div>
        <div className="h-32 bg-gray-200 rounded-xl w-full"></div>
      </section>
    );
  }

  return (
    <section className="bg-gray-100 w-full flex flex-col relative px-6 pt-28 pb-8 rounded-b-[2rem] shadow-inner">
      
      {/* Top Section: City Name & Icon */}
      <div className="flex justify-between items-start mb-2">
        <div className="animate-fade-in-down">
          <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
            {city.name}
          </h2>
          <p className="text-gray-500 font-medium text-lg mt-1 tracking-wide">
            {city.countryCode}
          </p>
        </div>
        
        {/* Weather Icon - Circular container top right */}
        <div className="flex items-center justify-center bg-white shadow-lg rounded-full w-20 h-20 animate-scale-in">
           <WeatherIcon code={weather.weatherCode} className="w-10 h-10 text-gray-800" />
        </div>
      </div>

      {/* Temperature Section */}
      <div className="mt-8 mb-8 animate-fade-in-up">
        <span className="text-[140px] leading-none font-bold text-gray-900 tracking-tighter block -ml-2">
          {Math.round(weather.temperature)}°
        </span>
        <p className="text-gray-400 font-medium text-xl ml-2 capitalize">
          {/* Mapping code to text could go here, for now just visual spacing */}
          Current Weather
        </p>
      </div>

      {/* City Image Block - Bottom of Hero Section */}
      <div className="w-full h-48 md:h-56 rounded-3xl overflow-hidden shadow-xl mt-auto relative group animate-fade-in">
        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
        <img 
          src={imageUrl} 
          alt={city.name} 
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute bottom-4 left-4 z-20">
          <span className="text-white/90 text-xs font-bold tracking-widest uppercase bg-black/30 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
            Live Cam
          </span>
        </div>
      </div>

    </section>
  );
};

export default Hero;