"use client";

import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import type { DateRange } from "react-day-picker";
import "react-day-picker/style.css";

interface DateRangeFieldsProps {
  range: DateRange | undefined;
  showCalendar: boolean;
  onRangeChange: (range: DateRange | undefined) => void;
  onToggleCalendar: () => void;
}

export default function DateRangeFields({
  range,
  showCalendar,
  onRangeChange,
  onToggleCalendar,
}: DateRangeFieldsProps) {
  const fromDisplay = range?.from ? format(range.from, "MMM d, yyyy") : "";
  const toDisplay = range?.to ? format(range.to, "MMM d, yyyy") : "";

  const handleSelect = (newRange: DateRange | undefined) => {
    onRangeChange(newRange);
    if (newRange?.from && newRange?.to) onToggleCalendar();
  };

  const btnClass =
    "cursor-pointer px-3 py-2.5 text-left transition-colors hover:bg-amber-100";
  const labelClass = "text-xs font-medium uppercase tracking-wide text-amber-600";
  const valueClass = (has: boolean) =>
    `mt-0.5 text-sm font-semibold ${has ? "text-amber-950" : "text-amber-400"}`;

  return (
    <div className="mt-5 space-y-3">
      <div className="grid grid-cols-2 gap-0 overflow-hidden rounded-lg border border-amber-300">
        <button onClick={onToggleCalendar} className={btnClass} type="button">
          <p className={labelClass}>Check-in</p>
          <p className={valueClass(!!fromDisplay)}>{fromDisplay || "Add date"}</p>
        </button>
        <button
          onClick={onToggleCalendar}
          className={`${btnClass} border-l border-amber-300`}
          type="button"
        >
          <p className={labelClass}>Check-out</p>
          <p className={valueClass(!!toDisplay)}>{toDisplay || "Add date"}</p>
        </button>
      </div>

      {showCalendar && (
        <div className="rounded-lg border border-amber-300 bg-amber-50 p-2 shadow-md">
          <DayPicker
            mode="range"
            selected={range}
            onSelect={handleSelect}
            numberOfMonths={1}
            min={1}
            max={30}
            disabled={{ before: new Date() }}
            className="!m-auto"
          />
        </div>
      )}
    </div>
  );
}