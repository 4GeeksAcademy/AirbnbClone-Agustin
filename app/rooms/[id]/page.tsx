import { Suspense } from "react";
import RoomDetailClient from "./RoomDetailClient";

export default function RoomDetailPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <LoadingSpinner />
        </div>
      }
    >
      <RoomDetailClient />
    </Suspense>
  );
}

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-amber-200 border-t-rose-500" />
    </div>
  );
}