"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import AppHeader from "@/components/AppHeader";
import { AmenitiesList } from "@/components/AmenitiesList";
import { BookingCard } from "@/components/BookingCard";
import { HostInfo } from "@/components/HostInfo";
import { ImageGallery } from "@/components/ImageGallery";
import { RoomLoading } from "@/components/RoomLoading";
import { properties } from "@/data/properties";
import type { RoomDetail } from "@/data/roomDetail";

export const RoomPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const [id, setId] = useState("");
  const [room, setRoom] = useState<RoomDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => { params.then(({ id: roomId }) => setId(roomId)); }, [params]);

  useEffect(() => {
    if (!id) return;
    const timer = window.setTimeout(() => {
      const property = properties.find((item) => item.id === id);
      if (!property) { setRoom(null); setIsLoading(false); return; }
      const index = properties.indexOf(property);
      setRoom({
        id: property.id,
        title: property.title,
        location: property.location,
        rating: property.rating,
        reviewCount: property.reviewCount,
        pricePerNight: property.pricePerNight,
        host: { name: index % 2 === 0 ? "Marina" : "Alejandro", yearsHosting: 3 + index, avatar: `https://i.pravatar.cc/160?img=${20 + index}` },
        amenities: [{ icon: "Wi-Fi", label: "Wifi" }, { icon: "◇", label: "Cocina" }, { icon: "≋", label: "Piscina" }, { icon: "P", label: "Parking" }, { icon: "A/C", label: "Aire acondicionado" }, { icon: "♨", label: "Calefaccion" }],
        photos: [property.image, `https://picsum.photos/seed/${property.id}-1/1200/800`, `https://picsum.photos/seed/${property.id}-2/1200/800`],
      });
      setIsLoading(false);
    }, 1000);
    return () => window.clearTimeout(timer);
  }, [id]);

  if (isLoading) return <RoomLoading />;
  if (!room) return <><AppHeader /><main className="room-main empty-state"><h1>Alojamiento no encontrado</h1><Link href="/catalog">Volver al catalogo</Link></main></>;

  return (
    <>
      <AppHeader />
      <main className="room-main">
        <Link className="back-link" href="/catalog">&#8249; Volver al catalogo</Link>
        <h1>{room.title}</h1>
        <p className="room-location">{room.location} · <span className="room-stars">★ {room.rating}</span> · {room.reviewCount} opiniones</p>
        <ImageGallery title={room.title} photos={room.photos} />
        <div className="room-layout">
          <section className="room-description">
            <h2>Alojamiento entero en {room.location}</h2>
            <p>2 habitaciones · 5 invitados · 2 camas · 1 bano</p>
            <HostInfo host={room.host} />
            <hr /><h3>Un lugar pensado para desconectar</h3>
            <p>Espacios luminosos, detalles cuidados y una ubicacion perfecta para explorar la zona a tu ritmo.</p>
            <AmenitiesList amenities={room.amenities} />
          </section>
          <BookingCard pricePerNight={room.pricePerNight} />
        </div>
      </main>
    </>
  );
};

export default RoomPage;

