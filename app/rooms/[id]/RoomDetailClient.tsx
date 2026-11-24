"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import PhotoGallery from "@/components/PhotoGallery";
import HostInfo from "@/components/HostInfo";
import AmenitiesGrid from "@/components/AmenitiesGrid";
import BookingCard from "@/components/BookingCard";
import StarRating from "@/components/StarRating";
import { listings } from "@/lib/mockData";
import { Listing } from "@/types";

export default function RoomDetailClient() {
  const params = useParams();
  const id = params.id as string;

  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(true);

  // Simulate data loading
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      const found = listings.find((item) => item.id === id);
      setListing(found || null);
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [id]);

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center py-20">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-amber-200 border-t-rose-500" />
        </div>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <p className="text-lg font-medium text-gray-700">Room not found</p>
        <Link
          href="/catalog"
          className="mt-4 inline-block text-sm font-medium text-rose-600 hover:text-rose-700"
        >
          &larr; Back to catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav className="mb-4">
        <Link
          href="/catalog"
          className="inline-flex items-center gap-1 text-sm text-amber-600 transition-colors hover:text-amber-900"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 12H5m7-7l-7 7 7 7" />
          </svg>
          Back to catalog
        </Link>
      </nav>

      {/* Desktop: two-column layout */}
      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Left column — main content */}
        <div className="flex-1 space-y-8">
          {/* Photo gallery */}
          <PhotoGallery photos={listing.photos} title={listing.title} />

          {/* Room summary header */}
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-amber-950 sm:text-3xl">
              {listing.title}
            </h1>
            <div className="flex items-center gap-2 text-sm text-amber-700">
              <StarRating rating={listing.rating} reviewCount={listing.reviews} />
              <span className="text-amber-300">·</span>
              <span>{listing.location}</span>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-amber-200" />

          {/* Host info */}
          <HostInfo host={listing.host} />

          {/* Divider */}
          <div className="border-t border-amber-200" />

          {/* About this place */}
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-amber-950">About this place</h2>
            <p className="text-sm leading-relaxed text-amber-800">
              Enjoy a memorable stay at {listing.title}. Located in {listing.location}, this
              accommodation offers a comfortable experience with all the amenities you need
              for a relaxing trip. Hosted by {listing.host.name}, who has been welcoming
              guests for {listing.host.yearsHosting} years.
            </p>
          </div>

          {/* Divider */}
          <div className="border-t border-amber-200" />

          {/* Amenities / Services */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-amber-950">What this place offers</h2>
            <AmenitiesGrid amenities={listing.amenities} />
          </div>
        </div>

        {/* Right column — booking card (sticky on desktop) */}
        <div className="w-full lg:w-96 lg:shrink-0">
          <div className="lg:sticky lg:top-24">
            <BookingCard price={listing.price} maxGuests={listing.maxGuests} />
          </div>
        </div>
      </div>
    </div>
  );
}