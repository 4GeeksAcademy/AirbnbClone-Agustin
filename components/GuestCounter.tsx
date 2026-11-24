"use client";

interface GuestCounterProps {
  guests: number;
  maxGuests: number;
  onGuestsChange: (guests: number) => void;
}

export default function GuestCounter({
  guests,
  maxGuests,
  onGuestsChange,
}: GuestCounterProps) {
  return (
    <div className="mt-4 space-y-2">
      <label className="text-sm font-medium text-amber-800">Guests</label>
      <div className="flex items-center justify-between rounded-lg border border-amber-300 bg-[#fdf1e6] px-3 py-2">
        <button
          onClick={() => onGuestsChange(Math.max(1, guests - 1))}
          disabled={guests <= 1}
          className="flex h-7 w-7 items-center justify-center rounded-full border border-amber-300 text-amber-600 transition-colors hover:border-rose-400 hover:text-rose-600 disabled:cursor-not-allowed disabled:opacity-40"
          aria-label="Decrease guests"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
          </svg>
        </button>
        <span className="text-sm font-semibold text-amber-950">{guests}</span>
        <button
          onClick={() => onGuestsChange(Math.min(maxGuests, guests + 1))}
          disabled={guests >= maxGuests}
          className="flex h-7 w-7 items-center justify-center rounded-full border border-amber-300 text-amber-600 transition-colors hover:border-rose-400 hover:text-rose-600 disabled:cursor-not-allowed disabled:opacity-40"
          aria-label="Increase guests"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>
    </div>
  );
}