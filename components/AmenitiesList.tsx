export const AmenitiesList = ({ amenities }: { amenities: { icon: string; label: string }[] }) => (
  <>
    <hr />
    <h3>Que ofrece este lugar</h3>
    <div className="amenities-grid">
      {amenities.map((amenity) => (
        <div className="amenity" key={amenity.label}>
          <span>{amenity.icon}</span>
          {amenity.label}
        </div>
      ))}
    </div>
  </>
);
