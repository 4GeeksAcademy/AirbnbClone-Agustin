"use client";

import { useState } from "react";
import { format, differenceInDays } from "date-fns";
import { DayPicker } from "react-day-picker";
import type { DateRange } from "react-day-picker";
import "react-day-picker/style.css";

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

  const handleDateSelect = (newRange: DateRange | undefined) => {
    setRange(newRange);
    if (newRange?.from && newRange?.to) {
      setShowCalendar(false);
    }
  };

  const fromDisplay = range?.from ? format(range.from, "MMM d, yyyy") : "";
  const toDisplay = range?.to ? format(range.to, "MMM d, yyyy") : "";

  return (
    <div className="rounded-xl border border-amber-100 bg-[#fffdf9] p-6 shadow-sm">
      {/* Price */}
      <p className="text-lg text-gray-700">
        <span className="text-2xl font-bold text-gray-900">${price}</span>{" "}
        <span className="text-base text-gray-500">night</span>
      </p>

      {/* Date fields */}
      <div className="mt-5 space-y-3">
        <div className="grid grid-cols-2 gap-0 overflow-hidden rounded-lg border border-amber-200">
          {/* Check-in */}
          <button
            onClick={() => setShowCalendar(!showCalendar)}
            className="cursor-pointer px-3 py-2.5 text-left transition-colors hover:bg-amber-50"
            type="button"
          >
            <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
              Check-in
            </p>
            <p
              className={`mt-0.5 text-sm font-semibold ${
                fromDisplay ? "text-gray-900" : "text-gray-400"
              }`}
            >
              {fromDisplay || "Add date"}
            </p>
          </button>
          {/* Check-out */}
          <button
            onClick={() => setShowCalendar(!showCalendar)}
            className="cursor-pointer border-l border-amber-200 px-3 py-2.5 text-left transition-colors hover:bg-amber-50"
            type="button"
          >
            <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
              Check-out
            </p>
            <p
              className={`mt-0.5 text-sm font-semibold ${
                toDisplay ? "text-gray-900" : "text-gray-400"
              }`}
            >
              {toDisplay || "Add date"}
            </p>
          </button>
        </div>

        {/* Calendar */}
        {showCalendar && (
          <div className="rounded-lg border border-amber-200 bg-white p-2 shadow-md">
            <DayPicker
              mode="range"
              selected={range}
              onSelect={handleDateSelect}
              numberOfMonths={1}
              min={1}
              max={30}
              disabled={{ before: new Date() }}
              className="!m-auto"
            />
          </div>
        )}
      </div>

      {/* Guest counter */}
      <div className="mt-4 space-y-2">
        <label className="text-sm font-medium text-gray-700">Guests</label>
        <div className="flex items-center justify-between rounded-lg border border-amber-200 px-3 py-2">
          <button
            onClick={() => setGuests(Math.max(1, guests - 1))}
            disabled={guests <= 1}
            className="flex h-7 w-7 items-center justify-center rounded-full border border-amber-200 text-gray-600 transition-colors hover:border-rose-400 hover:text-rose-600 disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Decrease guests"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
            </svg>
          </button>
          <span className="text-sm font-semibold text-gray-900">{guests}</span>
          <button
            onClick={() => setGuests(Math.min(maxGuests, guests + 1))}
            disabled={guests >= maxGuests}
            className="flex h-7 w-7 items-center justify-center rounded-full border border-amber-200 text-gray-600 transition-colors hover:border-rose-400 hover:text-rose-600 disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Increase guests"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
      </div>

      {/* Price breakdown */}
      {nights > 0 && total !== null && (
        <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
          <span>
            ${price} x {nights} {nights === 1 ? "night" : "nights"}
          </span>
          <span>${total}</span>
        </div>
      )}

      {/* Total */}
      <div className="mt-4 flex items-center justify-between border-t border-amber-100 pt-4">
        <span className="text-sm font-medium text-gray-700">Total</span>
        <span className="text-lg font-bold text-gray-900">
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

      <p className="mt-2 text-center text-xs text-gray-500">
        You won&apos;t be charged yet
      </p>
    </div>
  );
}