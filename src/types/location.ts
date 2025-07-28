export interface Location {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  description?: string;
}

export interface LocationOption {
  value: string;
  label: string;
  location?: Location;
} 