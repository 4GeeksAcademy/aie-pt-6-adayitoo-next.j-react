"use client";

import Image from "next/image";
import { useState } from "react";

export const ImageGallery = ({ title, photos }: { title: string; photos: string[] }) => {
  const [photoIndex, setPhotoIndex] = useState(0);
  const previous = () => setPhotoIndex((photoIndex - 1 + photos.length) % photos.length);
  const next = () => setPhotoIndex((photoIndex + 1) % photos.length);

  return (
    <div className="detail-gallery">
      <Image src={photos[photoIndex]} alt={`${title}, foto ${photoIndex + 1}`} fill sizes="(max-width: 767px) 100vw, 1120px" priority />
      <button className="gallery-button gallery-prev" type="button" onClick={previous} aria-label="Foto anterior">&#8249;</button>
      <button className="gallery-button gallery-next" type="button" onClick={next} aria-label="Foto siguiente">&#8250;</button>
      <span className="gallery-counter">{photoIndex + 1} / {photos.length}</span>
    </div>
  );
};
