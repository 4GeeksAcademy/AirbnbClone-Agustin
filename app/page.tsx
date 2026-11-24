"use client";

import { useEffect, useState } from "react";
import SearchBar from "@/components/SearchBar";
import CategoryFilter from "@/components/CategoryFilter";
import ListingGrid from "@/components/ListingGrid";
import LoadingSpinner from "@/components/LoadingSpinner";
import { listings, categories } from "@/lib/mockData";
import { Listing } from "@/types";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("");
  const [filteredListings, setFilteredListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setFilteredListings(listings);
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const filtered = listings.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        activeCategory === "" || item.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
    setFilteredListings(filtered);
  }, [searchQuery, activeCategory]);

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

      {/* Listing grid */}
      <div className="px-4 py-6 sm:px-6 lg:px-8">
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
    </div>
  );
}
