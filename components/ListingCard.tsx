"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Property } from "@/data/properties";

export const ListingCard = ({ property }: { property: Property }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <article className="property-card">
      <Link className="listing-card-link" href={`/rooms/${property.id}`} aria-label={`Ver ${property.title}`}>
        <div className="property-image-wrap">
          <Image className="property-image" src={property.image} alt={property.title} fill sizes="(max-width: 767px) 100vw, (max-width: 1199px) 50vw, 25vw" />
          {property.badge && <span className="property-badge">{property.badge}</span>}
        </div>
        <div className="property-info">
          <div className="property-title-row">
            <h3>{property.title}</h3>
            <span className="property-rating">★ {property.rating}</span>
          </div>
          <p>{property.location}</p>
          <p className="property-reviews">{property.reviewCount} opiniones</p>
          <p className="property-price">
            {property.previousPrice && <span className="previous-price">{property.previousPrice} €</span>}
            <strong>{property.pricePerNight} €</strong> noche
          </p>
        </div>
      </Link>
      <button
        className="favorite-button"
        type="button"
        aria-label={isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
        aria-pressed={isFavorite}
        onClick={() => setIsFavorite((favorite) => !favorite)}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 21s-7-4.35-9.33-8.5C.7 9.2 2.2 5.5 6 4.7A5.6 5.6 0 0 1 12 7a5.6 5.6 0 0 1 6-2.3c3.8.8 5.3 4.5 3.33 7.8C19 16.65 12 21 12 21Z" fill={isFavorite ? "#ff385c" : "rgba(0,0,0,.18)"} stroke="white" strokeWidth="1.8" />
        </svg>
      </button>
    </article>
  );
};
