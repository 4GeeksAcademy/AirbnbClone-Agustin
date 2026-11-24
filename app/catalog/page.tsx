"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import SearchBar from "@/components/SearchBar";
import CategoryFilter from "@/components/CategoryFilter";
import CatalogHeader from "@/components/CatalogHeader";
import ListingGrid from "@/components/ListingGrid";
import LoadingSpinner from "@/components/LoadingSpinner";
import { listings, categories } from "@/lib/mockData";
import { Listing, SortOrder } from "@/types";

// Dynamically import the map so Leaflet only loads in the browser
const MapPlaceholder = dynamic(
  () => import("@/components/MapPlaceholder"),
  { ssr: false,
    loading: () => (
      <div className="flex h-full min-h-[300px] w-full items-center justify-center rounded-xl bg-gradient-to-br from-amber-50 to-amber-100">
        <p className="text-sm font-medium text-amber-600">Loading map…</p>
      </div>
    ),
  }
);

export default function CatalogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [filteredListings, setFilteredListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  // Simulate data loading on mount
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Filter, sort, and update listings when search/category/sort changes
  useEffect(() => {
    const filtered = listings.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        activeCategory === "" || item.category === activeCategory;
      return matchesSearch && matchesCategory;
    });

    const sorted = [...filtered].sort((a, b) =>
      sortOrder === "asc" ? a.price - b.price : b.price - a.price
    );

    setFilteredListings(sorted);
  }, [searchQuery, activeCategory, sortOrder]);

  return (
    <div className="mx-auto max-w-7xl">
      {/* Search bar */}
      <div className="px-4 pb-2 pt-4 sm:px-6 lg:px-8">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
      </div>

      {/* Category filter */}
      <CategoryFilter
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={(category) =>
          setActiveCategory(category === activeCategory ? "" : category)
        }
      />

      {/* Results header */}
      <CatalogHeader
        totalResults={filteredListings.length}
        sortOrder={sortOrder}
        onSortChange={setSortOrder}
      />

      {/* Content: grid + map */}
      <div className="flex flex-col gap-6 px-4 py-6 sm:px-6 lg:flex-row lg:px-8">
        {/* Listing grid — takes remaining space */}
        <div className="flex-1">
          {loading ? (
            <LoadingSpinner />
          ) : filteredListings.length === 0 ? (
            <p className="py-20 text-center text-base text-gray-600">
              No listings found. Try a different search or category.
            </p>
          ) : (
            <ListingGrid listings={filteredListings} />
          )}
        </div>

        {/* Map — below on mobile, right sidebar on desktop */}
        <div className="w-full lg:w-80 lg:shrink-0">
          <div className="lg:sticky lg:top-20">
            <MapPlaceholder listings={filteredListings} />
          </div>
        </div>
      </div>
    </div>
  );
}