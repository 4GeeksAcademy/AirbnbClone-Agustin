export interface Listing {
  id: string;
  title: string;
  price: number;
  rating: number;
  category: string;
  image: string;
  location: string;
  coordinates: { lat: number; lng: number };
  reviews: number;
  host: Host;
  amenities: string[];
  photos: string[];
  maxGuests: number;
}

export interface Host {
  name: string;
  avatar: string;
  yearsHosting: number;
}

export type SortOrder = "asc" | "desc";