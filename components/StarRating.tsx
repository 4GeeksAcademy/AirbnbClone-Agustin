interface StarRatingProps {
  rating: number;
  reviewCount?: number;
}

export default function StarRating({ rating, reviewCount }: StarRatingProps) {
  const stars = Math.round(rating);

  return (
    <div className="flex items-center gap-1">
      <span className="text-sm">⭐</span>
      <span className="text-sm font-semibold text-amber-950">{rating}</span>
      {reviewCount !== undefined && (
        <span className="text-sm text-amber-600">({reviewCount})</span>
      )}
    </div>
  );
}