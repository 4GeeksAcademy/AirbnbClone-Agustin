interface CategoryFilterProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function CategoryFilter({
  categories,
  activeCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  return (
    <div className="overflow-x-auto border-b border-amber-200 bg-[#fdf1e6]">
      <div className="flex gap-6 px-4 py-3 sm:px-6 lg:px-8">
        {categories.map((category) => {
          const isActive = category === activeCategory;
          return (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`flex shrink-0 flex-col items-center gap-1 text-sm font-medium transition-all ${
                isActive
                  ? "text-amber-950"
                  : "text-amber-600 hover:text-amber-800"
              }`}
            >
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-full transition-colors ${
                  isActive
                    ? "bg-rose-200 ring-2 ring-rose-500"
                    : "bg-amber-100 hover:bg-amber-200"
                }`}
              >
                <span className="text-lg">🏠</span>
              </div>
              <span
                className={`whitespace-nowrap ${
                  isActive
                    ? "font-semibold text-amber-950 underline decoration-2 decoration-amber-950 underline-offset-8"
                    : ""
                }`}
              >
                {category}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}