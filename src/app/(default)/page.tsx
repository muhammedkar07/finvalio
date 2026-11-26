import Link from "next/link";
import { SITE_CONFIG } from "@/config/site";

export default function RootIndexPage() {
  const trHref = `${SITE_CONFIG.basePath}/tr/`;
  const enHref = `${SITE_CONFIG.basePath}/en/`;

  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-20 text-center">
      <script
        dangerouslySetInnerHTML={{
          __html: `
            try {
              var lang = (navigator.language || '').toLowerCase();
              var target = lang.startsWith('tr') ? '${trHref}' : '${enHref}';
              window.location.replace(target);
            } catch (e) {}
          `,
        }}
      />
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0B1F3A] text-xl font-extrabold text-white shadow-md">
        F<span className="text-emerald-400">V</span>
      </span>
      <h1 className="mt-5 text-3xl font-extrabold text-slate-950 dark:text-white">
        {SITE_CONFIG.name}
      </h1>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
        2026 Salary, Tax, Loan, Compound &amp; FIRE Calculators / 2026 Finans Hesaplama Merkezi
      </p>
      <div className="mt-7 flex flex-wrap justify-center gap-3">
        <Link
          href="/tr"
          className="rounded-xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-700"
        >
          Türkçe Devam Et (TR)
        </Link>
        <Link
          href="/en"
          className="rounded-xl bg-[#0B1F3A] px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-slate-800"
        >
          Continue in English (EN)
        </Link>
      </div>
    </div>
  );
}
