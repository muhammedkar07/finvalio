"use client";

import { useState } from "react";

export interface ChartSeries {
  id: string;
  label: string;
  color: string;
  values: number[];
  fillOpacity?: number;
  dashed?: boolean;
}

interface AreaLineChartProps {
  labels: string[];
  series: ChartSeries[];
  formatY: (value: number) => string;
  height?: number;
}

export function AreaLineChart({ labels, series, formatY, height = 260 }: AreaLineChartProps) {
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);

  if (labels.length < 2 || series.length === 0) return null;

  const width = 680;
  const padLeft = 72;
  const padRight = 20;
  const padTop = 18;
  const padBottom = 34;
  const innerW = width - padLeft - padRight;
  const innerH = height - padTop - padBottom;

  const allVals = series.flatMap((s) => s.values);
  const minVal = Math.min(0, ...allVals);
  const rawMax = Math.max(...allVals, 1);
  const maxVal = rawMax * 1.08;
  const range = maxVal - minVal || 1;

  const xAt = (i: number) => padLeft + (i / (labels.length - 1)) * innerW;
  const yAt = (v: number) => padTop + innerH - ((v - minVal) / range) * innerH;

  const yTicks = [0, 0.25, 0.5, 0.75, 1].map((t) => minVal + t * range);
  const xTickStep = Math.max(1, Math.ceil(labels.length / 6));

  return (
    <div className="w-full">
      <div className="mb-3 flex flex-wrap items-center gap-4 text-xs">
        {series.map((s) => (
          <div key={s.id} className="flex items-center gap-1.5">
            <span
              className="inline-block h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: s.color }}
            />
            <span className="font-medium text-slate-600 dark:text-slate-300">{s.label}</span>
          </div>
        ))}
      </div>

      <div className="relative w-full overflow-x-auto">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="h-auto w-full min-w-[440px] select-none"
          onMouseLeave={() => setHoverIdx(null)}
        >
          {/* Horizontal grid lines */}
          {yTicks.map((val, idx) => {
            const y = yAt(val);
            return (
              <g key={idx}>
                <line
                  x1={padLeft}
                  y1={y}
                  x2={width - padRight}
                  y2={y}
                  stroke="currentColor"
                  strokeOpacity="0.1"
                  strokeDasharray="3 3"
                  className="text-slate-400"
                />
                <text
                  x={padLeft - 8}
                  y={y + 4}
                  textAnchor="end"
                  className="fill-slate-400 text-[10px] tabular-nums"
                >
                  {formatY(val)}
                </text>
              </g>
            );
          })}

          {/* X-axis labels */}
          {labels.map((lbl, i) => {
            if (i !== 0 && i !== labels.length - 1 && i % xTickStep !== 0) return null;
            return (
              <text
                key={`${lbl}-${i}`}
                x={xAt(i)}
                y={height - 10}
                textAnchor="middle"
                className="fill-slate-400 text-[10px]"
              >
                {lbl}
              </text>
            );
          })}

          {/* Areas and lines */}
          {series.map((s) => {
            const linePath = s.values
              .map((v, i) => `${i === 0 ? "M" : "L"} ${xAt(i).toFixed(1)} ${yAt(v).toFixed(1)}`)
              .join(" ");
            const areaPath = `${linePath} L ${xAt(s.values.length - 1).toFixed(1)} ${yAt(minVal).toFixed(1)} L ${xAt(0).toFixed(1)} ${yAt(minVal).toFixed(1)} Z`;

            return (
              <g key={s.id}>
                {s.fillOpacity ? (
                  <path d={areaPath} fill={s.color} fillOpacity={s.fillOpacity} />
                ) : null}
                <path
                  d={linePath}
                  fill="none"
                  stroke={s.color}
                  strokeWidth={s.dashed ? 2 : 2.5}
                  strokeDasharray={s.dashed ? "6 4" : undefined}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            );
          })}

          {/* Hover guide & dots */}
          {hoverIdx !== null ? (
            <g>
              <line
                x1={xAt(hoverIdx)}
                y1={padTop}
                x2={xAt(hoverIdx)}
                y2={padTop + innerH}
                stroke="#64748b"
                strokeWidth="1"
                strokeDasharray="3 3"
              />
              {series.map((s) => (
                <circle
                  key={s.id}
                  cx={xAt(hoverIdx)}
                  cy={yAt(s.values[hoverIdx])}
                  r="4.5"
                  fill={s.color}
                  stroke="#ffffff"
                  strokeWidth="2"
                />
              ))}
            </g>
          ) : null}

          {/* Invisible hover columns */}
          {labels.map((_, i) => {
            const colW = innerW / labels.length;
            const x = Math.max(padLeft, xAt(i) - colW / 2);
            return (
              <rect
                key={i}
                x={x}
                y={padTop}
                width={colW}
                height={innerH}
                fill="transparent"
                onMouseEnter={() => setHoverIdx(i)}
              />
            );
          })}
        </svg>

        {hoverIdx !== null ? (
          <div className="mt-2 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs dark:border-slate-700 dark:bg-slate-800/70">
            <span className="font-semibold text-slate-900 dark:text-white">{labels[hoverIdx]}</span>
            <div className="flex flex-wrap gap-4 tabular-nums">
              {series.map((s) => (
                <span key={s.id} className="flex items-center gap-1.5">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: s.color }}
                  />
                  <span className="text-slate-500 dark:text-slate-400">{s.label}:</span>
                  <strong className="text-slate-900 dark:text-white">
                    {formatY(s.values[hoverIdx])}
                  </strong>
                </span>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
