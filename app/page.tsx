"use client";

import { useEffect, useState } from "react";
import AppHeader from "@/components/AppHeader";
import { CategoryFilters } from "@/components/CategoryFilters";
import { ListingGrid } from "@/components/ListingGrid";
import { properties as mockProperties, type Property } from "@/data/properties";

const categoryByPropertyId: Record<string, string> = {
  "mountain-house": "Montana",
  "design-apartment": "Tendencias",
  "beach-villa": "Playa",
  "countryside-cabin": "Montana",
  "city-loft": "Tendencias",
  "forest-cottage": "Montana",
  "coastal-suite": "Playa",
  "historic-home": "Mansiones",
};

export const Home = () => {
  const [listings, setListings] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Todas");

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setListings(mockProperties);
      setIsLoading(false);
    }, 1000);

    return () => window.clearTimeout(timer);
  }, []);

  const normalizedQuery = searchQuery.trim().toLowerCase();
  const filteredListings = listings.filter((property) => {
    const matchesSearch = !normalizedQuery
      || `${property.title} ${property.location}`.toLowerCase().includes(normalizedQuery);
    const matchesCategory = activeCategory === "Todas"
      || categoryByPropertyId[property.id] === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <AppHeader searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <main className="home-main">
        <CategoryFilters activeCategory={activeCategory} onChange={setActiveCategory} />
        <ListingGrid properties={filteredListings} isLoading={isLoading} activeCategory={activeCategory} />
      </main>
    </>
  );
};

export default Home;

