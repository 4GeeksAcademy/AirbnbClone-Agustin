import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-amber-100 bg-[#fffdf9] shadow-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo — hard navigation to refresh all state */}
        <a href="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold text-rose-600">airbnb</span>
        </a>

        {/* Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href="/"
            className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
          >
            Home
          </Link>
          <Link
            href="/catalog"
            className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
          >
            Catalog
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Link
            href="/sign-in"
            className="text-sm font-medium text-gray-800 transition-colors hover:text-gray-900"
          >
            Sign In
          </Link>
          <Link
            href="/sign-up"
            className="rounded-lg bg-rose-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-rose-700"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
}