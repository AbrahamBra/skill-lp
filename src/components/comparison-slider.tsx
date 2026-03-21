"use client";

import { useRef, useState, useCallback } from "react";

interface ComparisonSliderProps {
  beforeSrc?: string;
  afterSrc?: string;
  beforeAlt: string;
  afterAlt: string;
  beforePlaceholder?: React.ReactNode;
  afterPlaceholder?: React.ReactNode;
}

export function ComparisonSlider({
  beforeSrc,
  afterSrc,
  beforeAlt,
  afterAlt,
  beforePlaceholder,
  afterPlaceholder,
}: ComparisonSliderProps) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const updatePosition = useCallback((clientX: number) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = clientX - rect.left;
    const percent = Math.min(100, Math.max(0, (x / rect.width) * 100));
    setPosition(percent);
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    updatePosition(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    updatePosition(e.clientX);
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  return (
    <div
      ref={containerRef}
      className="relative aspect-video w-full max-w-4xl mx-auto cursor-ew-resize overflow-hidden rounded-xl border border-[var(--border)]"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      role="slider"
      aria-label="Comparaison avant/après"
      aria-valuenow={Math.round(position)}
      aria-valuemin={0}
      aria-valuemax={100}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") setPosition((p) => Math.max(0, p - 2));
        if (e.key === "ArrowRight") setPosition((p) => Math.min(100, p + 2));
      }}
    >
      {/* Before image/placeholder (full width, always visible) */}
      {beforeSrc ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={beforeSrc}
          alt={beforeAlt}
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
        />
      ) : (
        <div className="absolute inset-0 w-full h-full">
          {beforePlaceholder ?? (
            <div className="w-full h-full bg-gradient-to-br from-zinc-700 via-zinc-600 to-zinc-500 flex items-center justify-center">
              <span className="text-zinc-300 text-2xl font-semibold select-none opacity-60">
                Sans skills
              </span>
            </div>
          )}
        </div>
      )}

      {/* After image/placeholder (clipped to left portion) */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        {afterSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={afterSrc}
            alt={afterAlt}
            className="absolute inset-0 w-full h-full object-cover"
            draggable={false}
          />
        ) : (
          <div className="absolute inset-0 w-full h-full">
            {afterPlaceholder ?? (
              <div className="w-full h-full bg-gradient-to-br from-violet-700 via-indigo-600 to-blue-500 flex items-center justify-center">
                <span className="text-white text-2xl font-semibold select-none opacity-80">
                  Avec skills
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Divider line */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white z-10"
        style={{ left: `${position}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
          <span className="text-black text-sm font-bold select-none">⇔</span>
        </div>
      </div>

      {/* Labels */}
      <span className="absolute top-4 left-4 bg-black/60 text-white text-xs px-2 py-1 rounded z-20 select-none">
        Sans skills
      </span>
      <span className="absolute top-4 right-4 bg-black/60 text-white text-xs px-2 py-1 rounded z-20 select-none">
        Avec skills
      </span>
    </div>
  );
}
