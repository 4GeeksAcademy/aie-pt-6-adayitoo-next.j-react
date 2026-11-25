import AppHeader from "@/components/AppHeader";

export const RoomLoading = () => (
  <>
    <AppHeader />
    <main className="room-main room-loading" aria-live="polite" aria-label="Cargando alojamiento">
      <div className="skeleton-line skeleton-line-wide" />
      <div className="room-skeleton-gallery" />
      <div className="room-layout">
        <div><div className="skeleton-line skeleton-line-wide" /><div className="skeleton-line" /></div>
        <div className="reservation-card"><div className="skeleton-line" /><div className="skeleton-line" /></div>
      </div>
    </main>
  </>
);
