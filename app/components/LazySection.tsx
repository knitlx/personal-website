"use client";

import { useEffect, useRef, useState } from "react";

interface LazySectionProps {
  children: React.ReactNode;
  rootMargin?: string; // Например: "100px" - начни грузить за 100px до появления
  threshold?: number; // 0-1, сколько элемента должно быть видно
  fallback?: React.ReactNode; // Что показывать во время загрузки
}

export default function LazySection({
  children,
  rootMargin = "200px",
  threshold = 0.1,
  fallback = null,
}: LazySectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !isLoaded) {
          setIsVisible(true);
          setIsLoaded(true);
          observer.disconnect(); // Отключаем после первой загрузки
        }
      },
      {
        rootMargin,
        threshold,
      },
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [rootMargin, threshold, isLoaded]);

  return (
    <div ref={ref} style={{ minHeight: isVisible ? "auto" : "200px" }}>
      {isVisible ? children : fallback}
    </div>
  );
}
