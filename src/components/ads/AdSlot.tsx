"use client";

import { useEffect, useRef } from "react";
import { SITE_CONFIG } from "@/config/site";
import { UI_TEXT, type Locale } from "@/lib/i18n";

declare global {
  interface Window {
    adsbygoogle?: Record<string, unknown>[];
  }
}

export type AdPlacement = "top" | "inContent" | "sidebar" | "bottom";

interface AdSlotProps {
  placement: AdPlacement;
  locale: Locale;
  className?: string;
}

const HEIGHT_CLASSES: Record<AdPlacement, string> = {
  top: "min-h-[100px]",
  inContent: "min-h-[260px]",
  sidebar: "min-h-[280px]",
  bottom: "min-h-[110px]",
};

export function AdSlot({ placement, locale, className = "" }: AdSlotProps) {
  const pushedRef = useRef(false);
  const clientId = SITE_CONFIG.adsense.clientId;
  const slotId = SITE_CONFIG.adsense.slots[placement];
  const isConfigured = Boolean(clientId && slotId);
  const isDev = process.env.NODE_ENV === "development";

  useEffect(() => {
    if (!isConfigured || pushedRef.current) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushedRef.current = true;
    } catch {
      // Ignore if script blocked by adblocker
    }
  }, [isConfigured]);

  // Never render empty placeholder boxes in production (helps AdSense approval)
  if (!isConfigured && !isDev) {
    return null;
  }

  return (
    <aside
      aria-label={UI_TEXT[locale].adLabel}
      className={`no-print my-6 w-full ${className}`}
    >
      <div className="mb-1.5 text-center text-[11px] font-medium tracking-wider text-slate-400 uppercase dark:text-slate-500">
        {UI_TEXT[locale].adLabel}
      </div>
      <div
        className={`flex w-full items-center justify-center overflow-hidden rounded-xl border border-slate-200/80 bg-slate-50/70 dark:border-slate-800 dark:bg-slate-900/50 ${HEIGHT_CLASSES[placement]}`}
      >
        {isConfigured ? (
          <ins
            className="adsbygoogle block w-full"
            data-ad-client={clientId}
            data-ad-slot={slotId}
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        ) : (
          <div className="px-4 py-3 text-center text-xs text-slate-400 dark:text-slate-500">
            <span className="font-semibold text-slate-500 dark:text-slate-400">
              Google AdSense Slot ({placement})
            </span>
            <p className="mt-1">
              {locale === "tr"
                ? "Üretimde yalnızca .env içinde AdSense kimliği tanımlandığında görünür (CLS korumalı)."
                : "Hidden in production until AdSense IDs are set in .env (CLS-reserved slot)."}
            </p>
          </div>
        )}
      </div>
    </aside>
  );
}
