import React, { useState, useEffect, useCallback } from 'react';
import { CITIES, DEFAULT_CITY } from './constants';
import { City, WeatherData } from './types';
import { fetchWeatherData } from './services/weatherService';
import Header from './components/Header';
import Hero from './components/Hero';
import InfoList from './components/InfoList';

const App: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState<City>(DEFAULT_CITY);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadWeather = useCallback(async (city: City) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWeatherData(city.lat, city.lng);
      setWeatherData(data);
    } catch (err) {
      setError('Failed to load weather data. Please try again.');
    } finally {
      setTimeout(() => setLoading(false), 300);
    }
  }, []);

  // Initial load
  useEffect(() => {
    loadWeather(selectedCity);
  }, []);

  const handleCityChange = (city: City) => {
    setSelectedCity(city);
    loadWeather(city);
  };

  return (
    <div className="w-full h-full md:max-w-md md:h-[90vh] md:my-auto bg-white md:rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col relative font-sans">
      
      <Header 
        cities={CITIES} 
        selectedCity={selectedCity} 
        onCityChange={handleCityChange} 
      />

      <main className="flex-grow overflow-y-auto scrollbar-hide">
        {error ? (
          <div className="flex flex-col items-center justify-center h-full p-10 text-center text-red-500 bg-red-50">
            <p className="font-bold text-xl mb-4">{error}</p>
            <button 
              onClick={() => loadWeather(selectedCity)}
              className="px-6 py-3 bg-white border border-red-200 shadow-sm hover:shadow-md rounded-full text-red-600 font-medium transition-all"
            >
              Retry
            </button>
          </div>
        ) : (
          <div className="flex flex-col min-h-full">
            <Hero 
              city={selectedCity} 
              weather={weatherData} 
              loading={loading} 
            />
            
            <InfoList 
              weather={weatherData} 
            />
            
            <footer className="py-6 text-center text-gray-300 text-xs bg-white">
              <p>Powered by Open-Meteo</p>
            </footer>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;