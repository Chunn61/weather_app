import { City } from './types';

// Pre-defined list of cities as suggested in the Spec for simplicity
// Using a static list instead of calling REST Countries API for every keystroke to ensure stability and performance
export const CITIES: City[] = [
  { name: 'Taipei City', lat: 25.0330, lng: 121.5654, countryCode: 'TW' },
  { name: 'London', lat: 51.5074, lng: -0.1278, countryCode: 'GB' },
  { name: 'New York', lat: 40.7128, lng: -74.0060, countryCode: 'US' },
  { name: 'Tokyo', lat: 35.6762, lng: 139.6503, countryCode: 'JP' },
  { name: 'Sydney', lat: -33.8688, lng: 151.2093, countryCode: 'AU' },
  { name: 'Paris', lat: 48.8566, lng: 2.3522, countryCode: 'FR' },
  { name: 'Berlin', lat: 52.5200, lng: 13.4050, countryCode: 'DE' },
  { name: 'Singapore', lat: 1.3521, lng: 103.8198, countryCode: 'SG' },
];

export const DEFAULT_CITY = CITIES[0];
