"use client";

import { useEffect, useState } from "react";

export default function Footer() {
  const [year, setYear] = useState<number>(2026);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="border-t border-amber-200 bg-[#f8ede0]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-amber-700">
            &copy; {year} Airbnb Clone — Agustin. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-amber-700 hover:text-amber-900">
              Privacy
            </a>
            <a href="#" className="text-sm text-amber-700 hover:text-amber-900">
              Terms
            </a>
            <a href="#" className="text-sm text-amber-700 hover:text-amber-900">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}