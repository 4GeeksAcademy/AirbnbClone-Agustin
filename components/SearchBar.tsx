interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative w-full max-w-md">
      <svg
        className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      <input
        type="text"
        placeholder="Search destinations"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-full border border-amber-200 bg-[#fffdf9] py-2.5 pl-10 pr-4 text-sm text-gray-900 placeholder:text-gray-500 focus:border-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-400/20 shadow-sm"
      />
    </div>
  );
}