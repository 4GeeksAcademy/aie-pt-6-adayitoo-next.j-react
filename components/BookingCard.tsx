"use client";

import { useState } from "react";

export const BookingCard = ({ pricePerNight }: { pricePerNight: number }) => {
  const [guests, setGuests] = useState(2);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const today = new Date().toISOString().split("T")[0];
  const start = checkIn ? new Date(checkIn) : null;
  const end = checkOut ? new Date(checkOut) : null;
  const days = start && end ? Math.round((end.getTime() - start.getTime()) / 86400000) : 0;
  const nightCount = days > 0 ? days : 0;

  return (
    <aside className="reservation-card">
      <div className="reservation-price"><strong>{pricePerNight} €</strong> noche</div>
      <div className="reservation-fields">
        <label><span>LLEGADA</span><input aria-label="Fecha de llegada" type="date" value={checkIn} min={today} onChange={(event) => setCheckIn(event.target.value)} /></label>
        <label><span>SALIDA</span><input aria-label="Fecha de salida" type="date" value={checkOut} min={checkIn || today} onChange={(event) => setCheckOut(event.target.value)} /></label>
        <div className="guest-counter">
          <span>HUESPEDES</span>
          <div>
            <button type="button" aria-label="Quitar huesped" disabled={guests <= 1} onClick={() => setGuests((value) => Math.max(1, value - 1))}>−</button>
            <strong>{guests}</strong>
            <button type="button" aria-label="Agregar huesped" disabled={guests >= 5} onClick={() => setGuests((value) => Math.min(5, value + 1))}>+</button>
          </div>
        </div>
      </div>
      {nightCount > 0 && <div className="price-breakdown"><span>{pricePerNight} € x {nightCount} noches</span><strong>{nightCount * pricePerNight} €</strong></div>}
      <button className="reserve-button" type="button">Reservar</button>
      <p>No se te cobrara todavia</p>
    </aside>
  );
};
