import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found | Fuji Fenix Elevator",
  description:
    "The page you are looking for could not be found. Explore Fuji Fenix Elevator products, services, and solutions.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="flex-1 bg-white px-4 py-20 md:py-28 flex flex-col items-center justify-center text-center">
      <p className="text-sm font-semibold uppercase tracking-widest text-[#0047BB]">
        404 Error
      </p>
      <h1 className="mt-4 text-4xl md:text-5xl font-bold text-[#0F172A]">
        Page Not Found
      </h1>
      <p className="mt-4 max-w-xl text-base text-slate-600">
        The page you are looking for may have been moved or no longer exists.
        Explore our elevators, escalators, and services below.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="rounded-md bg-[#0047BB] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#003a99]"
        >
          Back to Home
        </Link>
        <Link
          href="/products"
          className="rounded-md border border-slate-300 px-6 py-3 text-sm font-semibold text-[#0F172A] transition-colors hover:border-[#0047BB] hover:text-[#0047BB]"
        >
          Browse Products
        </Link>
        <Link
          href="/contact"
          className="rounded-md border border-slate-300 px-6 py-3 text-sm font-semibold text-[#0F172A] transition-colors hover:border-[#0047BB] hover:text-[#0047BB]"
        >
          Contact Us
        </Link>
      </div>
    </section>
  );
}