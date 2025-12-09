import React from 'react';
import { WeatherData } from '../types';

interface InfoListProps {
  weather: WeatherData | null;
}

const InfoRow = ({ label, value, delay, icon }: { label: string, value: string, delay: number, icon: React.ReactNode }) => (
  <div 
    className="flex justify-between items-center py-4 border-b border-gray-100 last:border-0 group"
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="flex items-center gap-3">
      <div className="p-2 bg-gray-50 rounded-lg text-gray-400 group-hover:text-blue-500 group-hover:bg-blue-50 transition-colors">
        {icon}
      </div>
      <span className="text-gray-500 font-medium text-sm md:text-base">{label}</span>
    </div>
    <span className="text-gray-900 font-bold text-lg md:text-xl">{value}</span>
  </div>
);

// SVG Icons for the list
const Icons = {
  Humidity: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>,
  Wind: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>, // Generic icon replacement for wind
  Sunrise: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>,
  Sunset: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>,
  Rain: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg> // Arrow down for precip or umbrella
};

const InfoList: React.FC<InfoListProps> = ({ weather }) => {
  if (!weather) return null;

  return (
    <section className="bg-white px-8 py-8 w-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="h-8 w-1 bg-blue-500 rounded-full"></div>
        <h3 className="text-gray-900 font-bold text-xl tracking-tight">
          Weather Details
        </h3>
      </div>
      
      <div className="flex flex-col">
        <InfoRow 
          label="Humidity" 
          value={`${weather.humidity}%`} 
          delay={100}
          icon={Icons.Humidity}
        />
        <InfoRow 
          label="Wind Speed" 
          value={`${weather.windSpeed} km/h`} 
          delay={200}
          icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}
        />
        <InfoRow 
          label="Sunrise" 
          value={weather.sunrise} 
          delay={300}
          icon={Icons.Sunrise}
        />
        <InfoRow 
          label="Sunset" 
          value={weather.sunset} 
          delay={400}
          icon={Icons.Sunset}
        />
        <InfoRow 
          label="Precipitation" 
          value={`${weather.precipitationProbability}%`} 
          delay={500}
          icon={Icons.Rain}
        />
      </div>
    </section>
  );
};

export default InfoList;