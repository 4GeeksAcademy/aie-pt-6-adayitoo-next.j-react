export type RoomDetail = {
  id: string;
  title: string;
  location: string;
  rating: number;
  reviewCount: number;
  pricePerNight: number;
  host: { name: string; yearsHosting: number; avatar: string };
  amenities: { icon: string; label: string }[];
  photos: string[];
};
