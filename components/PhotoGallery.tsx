"use client";

import { useState } from "react";

interface PhotoGalleryProps {
  photos: string[];
  title: string;
}

export default function PhotoGallery({ photos, title }: PhotoGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goPrevious = () =>
    setCurrentIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));

  const goNext = () =>
    setCurrentIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1));

  if (photos.length === 0) {
    return (
      <div className="flex h-64 w-full items-center justify-center rounded-xl bg-amber-50">
        <span className="text-4xl">🏡</span>
      </div>
    );
  }

  return (
    <div className="relative w-full overflow-hidden rounded-xl bg-amber-50">
      {/* Photo */}
      <div className="flex aspect-[16/9] w-full items-center justify-center bg-gradient-to-br from-amber-100 via-rose-50 to-amber-200">
        <span className="text-6xl">📷</span>
      </div>

      {/* Navigation buttons */}
      <button
        onClick={goPrevious}
        className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 shadow-md transition-colors hover:bg-white"
        aria-label="Previous photo"
      >
        <svg className="h-5 w-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={goNext}
        className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 shadow-md transition-colors hover:bg-white"
        aria-label="Next photo"
      >
        <svg className="h-5 w-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots indicator */}
      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
        {photos.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`h-1.5 w-1.5 rounded-full transition-all ${
              i === currentIndex ? "w-4 bg-white" : "bg-white/60"
            }`}
          />
        ))}
      </div>

      {/* Photo counter */}
      <div className="absolute right-3 top-3 rounded-full bg-black/50 px-2.5 py-1 text-xs font-medium text-white">
        {currentIndex + 1} / {photos.length}
      </div>
    </div>
  );
}