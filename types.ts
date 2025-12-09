export interface City {
  name: string;
  lat: number;
  lng: number;
  countryCode: string; // Used for flag or image seeding
}

export interface WeatherData {
  temperature: number;
  weatherCode: number;
  humidity: number;
  windSpeed: number;
  sunrise: string; // HH:MM
  sunset: string; // HH:MM
  precipitationProbability: number;
}

// Mapped from Open-Meteo WMO Weather interpretation codes
export enum WeatherCondition {
  Clear = 'Clear',
  Cloudy = 'Cloudy',
  Fog = 'Fog',
  Drizzle = 'Drizzle',
  Rain = 'Rain',
  Snow = 'Snow',
  Thunderstorm = 'Thunderstorm',
  Unknown = 'Unknown'
}