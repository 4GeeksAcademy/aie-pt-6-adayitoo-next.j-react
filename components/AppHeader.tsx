"use client";

import Link from "next/link";

type AppHeaderProps = {
  searchQuery?: string;
  onSearchChange?: (value: string) => void;
};

export const AppHeader = ({ searchQuery = "", onSearchChange }: AppHeaderProps) => {
  return (
    <header className="app-header">
      <div className="header-inner">
        <Link className="brand" href="/" aria-label="Inicio">
          <span className="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 32 32">
              <path d="M16 3c-2.4 0-4.3 1.7-5.5 3.8C8.6 10 7.5 15 7.5 18.8c0 5.3 3.8 9.2 8.5 9.2s8.5-3.9 8.5-9.2C24.5 15 23.4 10 21.5 6.8 20.3 4.7 18.4 3 16 3Zm0 3.2c1.3 0 2.6 1.2 3.6 3.1-1.2-.5-2.4-.7-3.6-.7s-2.4.2-3.6.7C13.4 7.4 14.7 6.2 16 6.2Zm-5.3 5.5c1.7-.8 3.5-1.1 5.3-1.1s3.6.3 5.3 1.1c.7 2.1 1.2 4.4 1.2 6.9 0 1.1-.2 2.1-.5 3-1.8-1.3-3.8-2.1-6-2.1s-4.2.8-6 2.1c-.3-.9-.5-1.9-.5-3 0-2.5.5-4.8 1.2-6.9Z" />
            </svg>
          </span>
          <span className="brand-name">airbnb</span>
        </Link>

        <form className="search-bar" onSubmit={(event) => event.preventDefault()}>
          <label>
            <span>Destino</span>
            <input
              name="destination"
              placeholder="Explora destinos"
              value={searchQuery}
              onChange={(event) => onSearchChange?.(event.target.value)}
            />
          </label>
          <span className="search-divider" />
          <label>
            <span>Fechas</span>
            <input name="dates" placeholder="Agrega fechas" />
          </label>
          <span className="search-divider" />
          <label>
            <span>Quien</span>
            <input name="guests" placeholder="Cuantos" />
          </label>
          <button className="search-button" type="submit" aria-label="Buscar">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="11" cy="11" r="6.5" fill="none" stroke="currentColor" strokeWidth="2" />
              <path d="m16 16 4 4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </form>

        <nav className="header-actions" aria-label="Acciones">
          <Link href="/catalog">Pon tu espacio en Airbnb</Link>
          <button type="button" aria-label="Cambiar idioma" className="globe-button">ES</button>
          <button type="button" aria-label="Abrir menu" className="menu-button">
            <span />
            <span />
            <span />
          </button>
        </nav>
      </div>

      <nav className="filter-tabs" aria-label="Filtros principales">
        {["Todo", "Alojamientos", "Experiencias"].map((label, index) => (
          <span className={index === 0 ? "active" : ""} key={label}>{label}</span>
        ))}
      </nav>
    </header>
  );
};

export default AppHeader;
