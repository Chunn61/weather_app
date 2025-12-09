import { WeatherData } from '../types';

interface OpenMeteoResponse {
  current_weather: {
    temperature: number;
    windspeed: number;
    weathercode: number;
    time: string;
  };
  hourly: {
    time: string[];
    relativehumidity_2m: number[];
    precipitation_probability: number[];
    windspeed_10m: number[];
  };
  daily: {
    sunrise: string[];
    sunset: string[];
  };
}

export const fetchWeatherData = async (lat: number, lng: number): Promise<WeatherData> => {
  try {
    const params = new URLSearchParams({
      latitude: lat.toString(),
      longitude: lng.toString(),
      current_weather: 'true',
      hourly: 'relativehumidity_2m,precipitation_probability,windspeed_10m',
      daily: 'sunrise,sunset',
      timezone: 'auto',
    });

    const response = await fetch(`https://api.open-meteo.com/v1/forecast?${params.toString()}`);

    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }

    const data: OpenMeteoResponse = await response.json();

    // Determine current hour index to fetch hourly specific data
    // Open-Meteo returns hourly data starting from 00:00 today.
    const currentHour = new Date().getHours();
    
    // Safety check for array bounds
    const hourIndex = currentHour >= 0 && currentHour < 24 ? currentHour : 0;

    const formatTime = (isoString: string) => {
      if (!isoString) return '--:--';
      const date = new Date(isoString);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
    };

    return {
      temperature: data.current_weather.temperature,
      weatherCode: data.current_weather.weathercode,
      // Spec says use hourly for wind, but current_weather also has it. 
      // Using hourly is more consistent with other lists if available, but let's stick to current for "Hero" consistency 
      // and hourly array for the list details if they differ. 
      // However, spec specifically says "hourly parameters used for Info List... Wind Speed".
      windSpeed: data.hourly.windspeed_10m[hourIndex] ?? data.current_weather.windspeed,
      humidity: data.hourly.relativehumidity_2m[hourIndex] ?? 0,
      precipitationProbability: data.hourly.precipitation_probability[hourIndex] ?? 0,
      sunrise: formatTime(data.daily.sunrise[0]),
      sunset: formatTime(data.daily.sunset[0]),
    };
  } catch (error) {
    console.error("Weather Service Error:", error);
    throw error;
  }
};
