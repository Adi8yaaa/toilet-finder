export interface Toilet {
  id: string | number;
  lat: number;
  lon: number;
  name?: string;

  // Optional fields (added later features)
  distance?: number; // km
}