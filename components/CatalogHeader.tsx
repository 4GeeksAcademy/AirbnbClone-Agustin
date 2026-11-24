import { SortOrder } from "@/types";

interface CatalogHeaderProps {
  totalResults: number;
  sortOrder: SortOrder;
  onSortChange: (order: SortOrder) => void;
}

export default function CatalogHeader({
  totalResults,
  sortOrder,
  onSortChange,
}: CatalogHeaderProps) {
  return (
    <div className="flex items-center justify-between border-b border-amber-100 bg-[#fffdf9] px-4 py-3 sm:px-6 lg:px-8">
      <p className="text-sm font-medium text-gray-700">
        <span className="font-bold text-gray-900">{totalResults}</span>{" "}
        {totalResults === 1 ? "result" : "results"}
      </p>

      <div className="flex items-center gap-2">
        <label htmlFor="sort" className="text-sm text-gray-500">
          Sort by
        </label>
        <select
          id="sort"
          value={sortOrder}
          onChange={(e) => onSortChange(e.target.value as SortOrder)}
          className="rounded-lg border border-amber-200 bg-[#fffdf9] px-3 py-1.5 text-sm font-medium text-gray-800 shadow-sm focus:border-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-400/20"
        >
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>
      </div>
    </div>
  );
}