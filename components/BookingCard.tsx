"use client";

import { useState } from "react";
import { differenceInDays } from "date-fns";
import type { DateRange } from "react-day-picker";
import DateRangeFields from "./DateRangeFields";
import GuestCounter from "./GuestCounter";

interface BookingCardProps {
  price: number;
  maxGuests: number;
}

export default function BookingCard({ price, maxGuests }: BookingCardProps) {
  const [guests, setGuests] = useState(1);
  const [showCalendar, setShowCalendar] = useState(false);
  const [range, setRange] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });

  const nights =
    range?.from && range?.to ? differenceInDays(range.to, range.from) : 0;
  const total = nights > 0 ? price * nights : null;

  return (
    <div className="rounded-xl border border-amber-200 bg-[#fdf1e6] p-6 shadow-sm">
      {/* Price */}
      <p className="text-lg text-amber-700">
        <span className="text-2xl font-bold text-amber-950">${price}</span>{" "}
        <span className="text-base text-amber-600">night</span>
      </p>

      {/* Date fields + calendar */}
      <DateRangeFields
        range={range}
        showCalendar={showCalendar}
        onRangeChange={setRange}
        onToggleCalendar={() => setShowCalendar(!showCalendar)}
      />

      {/* Guest counter */}
      <GuestCounter
        guests={guests}
        maxGuests={maxGuests}
        onGuestsChange={setGuests}
      />

      {/* Price breakdown */}
      {nights > 0 && total !== null && (
        <div className="mt-4 flex items-center justify-between text-sm text-amber-700">
          <span>
            ${price} x {nights} {nights === 1 ? "night" : "nights"}
          </span>
          <span>${total}</span>
        </div>
      )}

      {/* Total */}
      <div className="mt-4 flex items-center justify-between border-t border-amber-200 pt-4">
        <span className="text-sm font-medium text-amber-800">Total</span>
        <span className="text-lg font-bold text-amber-950">
          {total !== null ? `$${total}` : "\u2014"}
        </span>
      </div>

      {/* CTA */}
      <button
        type="button"
        disabled={!nights || nights === 0}
        className="mt-4 w-full rounded-lg bg-rose-600 py-3 text-sm font-semibold text-white transition-colors hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Reserve
      </button>

      <p className="mt-2 text-center text-xs text-amber-600">
        You won&apos;t be charged yet
      </p>
    </div>
  );
}