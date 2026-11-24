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
    <div className="overflow-x-auto border-b border-amber-100 bg-[#fffdf9]">
      <div className="flex gap-6 px-4 py-3 sm:px-6 lg:px-8">
        {categories.map((category) => {
          const isActive = category === activeCategory;
          return (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`flex shrink-0 flex-col items-center gap-1 text-sm font-medium transition-all ${
                isActive
                  ? "text-gray-900"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-full transition-colors ${
                  isActive
                    ? "bg-rose-100 ring-2 ring-rose-400"
                    : "bg-amber-50 hover:bg-amber-100"
                }`}
              >
                <span className="text-lg">🏠</span>
              </div>
              <span
                className={`whitespace-nowrap ${
                  isActive
                    ? "font-semibold text-gray-900 underline decoration-2 decoration-gray-900 underline-offset-8"
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