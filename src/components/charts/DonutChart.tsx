"use client";

export interface DonutSlice {
  label: string;
  value: number;
  color: string;
  formattedValue: string;
}

interface DonutChartProps {
  slices: DonutSlice[];
  centerLabel: string;
  centerValue: string;
}

export function DonutChart({ slices, centerLabel, centerValue }: DonutChartProps) {
  const positiveSlices = slices.filter((s) => s.value > 0);
  const total = positiveSlices.reduce((sum, s) => sum + s.value, 0);
  const radius = 64;
  const circumference = 2 * Math.PI * radius;

  let cumulativeOffset = 0;

  return (
    <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-center">
      <div className="relative h-44 w-44 shrink-0">
        <svg viewBox="0 0 160 160" className="h-full w-full -rotate-90">
          <circle
            cx="80"
            cy="80"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="20"
            className="text-slate-100 dark:text-slate-800"
          />
          {total > 0 &&
            positiveSlices.map((slice, idx) => {
              const fraction = slice.value / total;
              const dashLength = fraction * circumference;
              const dashOffset = -cumulativeOffset;
              cumulativeOffset += dashLength;
              return (
                <circle
                  key={`${slice.label}-${idx}`}
                  cx="80"
                  cy="80"
                  r={radius}
                  fill="none"
                  stroke={slice.color}
                  strokeWidth="20"
                  strokeDasharray={`${dashLength} ${circumference}`}
                  strokeDashoffset={dashOffset}
                  className="transition-all duration-300"
                />
              );
            })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
          <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
            {centerLabel}
          </span>
          <span className="tabular-nums mt-0.5 text-sm font-bold text-slate-900 dark:text-white">
            {centerValue}
          </span>
        </div>
      </div>

      <div className="w-full space-y-2.5">
        {slices.map((slice, idx) => {
          const pct = total > 0 ? (slice.value / total) * 100 : 0;
          return (
            <div key={`${slice.label}-${idx}`} className="flex items-center justify-between gap-3 text-sm">
              <div className="flex min-w-0 items-center gap-2.5">
                <span
                  className="h-3 w-3 shrink-0 rounded-full"
                  style={{ backgroundColor: slice.color }}
                />
                <span className="truncate text-slate-600 dark:text-slate-300">{slice.label}</span>
              </div>
              <div className="tabular-nums shrink-0 text-right">
                <span className="font-semibold text-slate-900 dark:text-white">
                  {slice.formattedValue}
                </span>
                <span className="ml-1.5 text-xs text-slate-400">({pct.toFixed(1)}%)</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
