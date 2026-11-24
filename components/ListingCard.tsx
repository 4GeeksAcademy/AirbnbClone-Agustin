import Link from "next/link";
import StarRating from "./StarRating";
import { Listing } from "@/types";

interface ListingCardProps {
  listing: Listing;
}

export default function ListingCard({ listing }: ListingCardProps) {
  return (
    <Link href={`/rooms/${listing.id}`} className="group block">
      <div className="aspect-[4/3] w-full overflow-hidden rounded-xl bg-amber-200">
        <div className="flex h-full items-center justify-center bg-gradient-to-br from-amber-200 via-rose-100 to-amber-300">
          <span className="text-4xl">🏡</span>
        </div>
      </div>
      <div className="mt-2 space-y-1">
        <div className="flex items-center justify-between">
          <h3 className="pr-2 text-sm font-semibold text-amber-950 truncate">
            {listing.location}
          </h3>
          <StarRating rating={listing.rating} />
        </div>
        <p className="text-sm text-amber-700 truncate">{listing.title}</p>
        <p className="text-sm text-amber-800">
          <span className="font-bold text-amber-950">${listing.price}</span>
          <span className="text-amber-600"> night</span>
        </p>
      </div>
    </Link>
  );
}