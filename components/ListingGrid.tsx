import { ListingCard } from "@/components/ListingCard";
import type { Property } from "@/data/properties";

type Props = { properties: Property[]; isLoading: boolean; activeCategory: string };

export const ListingGrid = ({ properties, isLoading, activeCategory }: Props) => (
  <section className="property-section">
    <div className="section-heading">
      <h2>{activeCategory === "Todas" ? "Alojamientos disponibles" : activeCategory}</h2>
    </div>
    {isLoading ? (
      <div className="property-grid loading-grid" aria-label="Cargando alojamientos" aria-live="polite">
        {Array.from({ length: 8 }).map((_, index) => (
          <div className="listing-skeleton" key={index}><div className="skeleton-image" /><div className="skeleton-line skeleton-line-wide" /><div className="skeleton-line" /></div>
        ))}
      </div>
    ) : properties.length > 0 ? (
      <div className="property-grid">
        {properties.map((property) => <ListingCard property={property} key={property.id} />)}
      </div>
    ) : (
      <div className="empty-state"><h3>No encontramos alojamientos</h3><p>Prueba con otro destino o cambia la categoria.</p></div>
    )}
  </section>
);
