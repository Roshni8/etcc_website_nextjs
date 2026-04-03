"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

/** Full-screen gallery — same behaviour as toroidal / CT product pages */
export function ImageLightbox({
  src,
  images,
  onClose,
  onNavigate,
}: {
  src: string;
  images: string[];
  onClose: () => void;
  onNavigate: (src: string) => void;
}) {
  const [visible, setVisible] = useState(false);
  const touchStart = useRef<number | null>(null);
  const currentIndex = images.indexOf(src);
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < images.length - 1;

  const close = useCallback(() => {
    setVisible(false);
    setTimeout(onClose, 200);
  }, [onClose]);

  const goPrev = useCallback(() => {
    if (hasPrev) onNavigate(images[currentIndex - 1]);
  }, [hasPrev, currentIndex, images, onNavigate]);

  const goNext = useCallback(() => {
    if (hasNext) onNavigate(images[currentIndex + 1]);
  }, [hasNext, currentIndex, images, onNavigate]);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [close, goPrev, goNext]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart.current === null) return;
    const diff = e.changedTouches[0].clientX - touchStart.current;
    if (Math.abs(diff) > 60) {
      if (diff > 0) goPrev();
      else goNext();
    }
    touchStart.current = null;
  };

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-8"
      onClick={close}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{
        backgroundColor: visible ? "rgba(0,0,0,0.92)" : "rgba(0,0,0,0)",
        backdropFilter: "blur(8px)",
        transition: "background-color 200ms ease",
      }}
    >
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          close();
        }}
        className="absolute right-4 top-4 z-[210] flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25 active:bg-white/30 sm:right-6 sm:top-6"
        aria-label="Close"
        style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}
      >
        <X className="h-5 w-5" />
      </button>

      {hasPrev && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            goPrev();
          }}
          className="absolute left-3 top-1/2 z-[210] flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25 sm:left-6"
          aria-label="Previous image"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
      )}

      {hasNext && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            goNext();
          }}
          className="absolute right-3 top-1/2 z-[210] flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25 sm:right-6"
          aria-label="Next image"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      )}

      <img
        src={src}
        alt=""
        className="max-h-[85vh] max-w-full object-contain sm:max-h-[90vh] sm:max-w-[90vw]"
        onClick={(e) => e.stopPropagation()}
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "scale(1)" : "scale(0.95)",
          transition: "opacity 200ms ease, transform 200ms ease",
        }}
      />

      <p
        className="absolute bottom-6 left-0 right-0 text-center text-xs text-white/50"
        style={{
          opacity: visible ? 1 : 0,
          transition: "opacity 300ms ease 500ms",
          paddingBottom: "env(safe-area-inset-bottom, 0px)",
        }}
      >
        {currentIndex + 1} / {images.length}
        <span className="ml-3 sm:hidden">Swipe to navigate</span>
      </p>
    </div>
  );
}
