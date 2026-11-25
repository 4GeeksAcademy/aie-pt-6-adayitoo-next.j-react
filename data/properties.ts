export type Property = {
  id: string;
  title: string;
  location: string;
  pricePerNight: number;
  previousPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  badge?: string;
};

export const properties: Property[] = [
  {
    id: "mountain-house",
    title: "Casa de montana con vistas",
    location: "Asturias, Espana",
    pricePerNight: 138,
    previousPrice: 165,
    rating: 4.96,
    reviewCount: 128,
    image: "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?auto=format&fit=crop&w=1200&q=85",
    badge: "Favorito entre clientes",
  },
  {
    id: "design-apartment",
    title: "Apartamento luminoso en el centro",
    location: "Barcelona, Espana",
    pricePerNight: 112,
    rating: 4.91,
    reviewCount: 86,
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: "beach-villa",
    title: "Villa tranquila junto al mar",
    location: "Ibiza, Espana",
    pricePerNight: 245,
    rating: 4.98,
    reviewCount: 64,
    image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=1200&q=85",
    badge: "Favorito entre clientes",
  },
  {
    id: "countryside-cabin",
    title: "Refugio rodeado de naturaleza",
    location: "Girona, Espana",
    pricePerNight: 96,
    previousPrice: 120,
    rating: 4.88,
    reviewCount: 52,
    image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: "city-loft",
    title: "Loft industrial con terraza",
    location: "Madrid, Espana",
    pricePerNight: 154,
    rating: 4.93,
    reviewCount: 103,
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: "forest-cottage",
    title: "Casona rustica entre bosques",
    location: "Navarra, Espana",
    pricePerNight: 174,
    rating: 4.97,
    reviewCount: 71,
    image: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: "coastal-suite",
    title: "Suite con terraza al Atlantico",
    location: "Canarias, Espana",
    pricePerNight: 205,
    rating: 4.95,
    reviewCount: 91,
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: "historic-home",
    title: "Casa historica reformada",
    location: "Toledo, Espana",
    pricePerNight: 126,
    rating: 4.89,
    reviewCount: 47,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85",
  },
];
