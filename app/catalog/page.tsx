"use client";

import { useMemo, useState } from "react";
import AppHeader from "@/components/AppHeader";
import { ListingCard } from "@/components/ListingCard";
import { properties } from "@/data/properties";
import { propertyCoordinates } from "@/data/propertyCoordinates";

const filters = ["Todo", "Vistas increibles", "Frente al mar", "Casas", "Cabanas", "Centro"];
type SortOrder = "recommended" | "price-asc" | "price-desc";

export const CatalogPage = () => {
  const [sortOrder, setSortOrder] = useState<SortOrder>("recommended");

  const sortedProperties = useMemo(() => {
    const result = [...properties];
    if (sortOrder === "price-asc") return result.sort((a, b) => a.pricePerNight - b.pricePerNight);
    if (sortOrder === "price-desc") return result.sort((a, b) => b.pricePerNight - a.pricePerNight);
    return result;
  }, [sortOrder]);

  return (
    <>
      <AppHeader />
      <main className="catalog-main">
        <div className="catalog-toolbar">
          {filters.map((filter, index) => (
            <button className={index === 0 ? "active" : ""} type="button" key={filter}>{filter}</button>
          ))}
        </div>

        <div className="catalog-heading">
          <div>
            <p>Espana</p>
            <h1>Mostrando {sortedProperties.length} alojamientos</h1>
          </div>
          <label className="sort-control">
            <span>Ordenar por</span>
            <select value={sortOrder} onChange={(event) => setSortOrder(event.target.value as SortOrder)}>
              <option value="recommended">Recomendados</option>
              <option value="price-asc">Precio: ascendente</option>
              <option value="price-desc">Precio: descendente</option>
            </select>
          </label>
        </div>

        <div className="catalog-layout">
          <div className="catalog-list" aria-live="polite">
            <div className="property-grid catalog-grid">
              {sortedProperties.map((property) => (
                <ListingCard property={property} key={property.id} />
              ))}
            </div>
          </div>
          <aside className="map-placeholder" aria-label="Mapa de alojamientos">
            <span className="map-label">Mapa</span>
            {sortedProperties.map((property) => (
              <span
                className="map-pin"
                key={property.id}
                title={`${property.title}: ${propertyCoordinates[property.id].lat}, ${propertyCoordinates[property.id].lng}`}
              >
                {property.pricePerNight} €
              </span>
            ))}
          </aside>
        </div>
      </main>
    </>
  );
};

export default CatalogPage;

