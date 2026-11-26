import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center">
      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
        404
      </span>
      <h1 className="mt-4 text-3xl font-extrabold text-slate-950 dark:text-white">
        Page Not Found / Sayfa Bulunamadı
      </h1>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
        The calculator or guide you requested does not exist or has moved.
      </p>
      <div className="mt-6 flex gap-3">
        <Link
          href="/en"
          className="rounded-xl bg-[#0B1F3A] px-4 py-2.5 text-xs font-bold text-white hover:bg-slate-800"
        >
          English Home
        </Link>
        <Link
          href="/tr"
          className="rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-emerald-700"
        >
          Türkçe Ana Sayfa
        </Link>
      </div>
    </div>
  );
}
