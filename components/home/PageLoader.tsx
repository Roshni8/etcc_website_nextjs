"use client";

import { useState, useEffect } from "react";

interface PageLoaderProps {
  children: React.ReactNode;
}

const PageLoader = ({ children }: PageLoaderProps) => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Always trigger — requestAnimationFrame ensures at least one paint has occurred
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setReady(true);
      });
    });
  }, []);

  return (
    <>
      {/* Loading overlay — fades out once ready */}
      <div
        className="fixed inset-0 z-[100] flex items-center justify-center bg-white"
        style={{
          opacity: ready ? 0 : 1,
          pointerEvents: ready ? "none" : "auto",
          transition: "opacity 400ms cubic-bezier(0.23, 1, 0.32, 1)",
        }}
      >
        <div className="flex flex-col items-center gap-4">
          <img
            src="/assets/etcc-logo-blue.svg"
            alt="ETCC"
            className="h-12 w-auto"
            style={{ animation: "pulse-subtle 1.5s ease-in-out infinite" }}
          />
          <div className="h-0.5 w-16 overflow-hidden rounded-full bg-stone-100">
            <div
              className="h-full rounded-full bg-stone-400"
              style={{ animation: "loader-progress 1.2s ease-in-out infinite" }}
            />
          </div>
        </div>
      </div>

      {/* Page content — fades in */}
      <div
        style={{
          opacity: ready ? 1 : 0,
          transform: ready ? "translateY(0)" : "translateY(8px)",
          transition:
            "opacity 500ms cubic-bezier(0.23, 1, 0.32, 1) 100ms, transform 500ms cubic-bezier(0.23, 1, 0.32, 1) 100ms",
        }}
      >
        {children}
      </div>
    </>
  );
};

export default PageLoader;
