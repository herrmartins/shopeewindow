'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import ProductCard from '../products/components/ProductCard';

function getInitialVisibleCount(total) {
  if (typeof window === 'undefined') return 1;
  const width = window.innerWidth || document.documentElement.clientWidth || 0;
  if (width <= 639) return Math.min(1, total || 1);
  if (width <= 1023) return Math.min(3, total || 1);
  return Math.min(4, total || 1);
}

export default function ProductCarouselClient({ products, displayTime }) {
  const touchStartX = useRef(null);
  const [visibleCount, setVisibleCount] = useState(() => getInitialVisibleCount(products.length));
  const [currentIndex, setCurrentIndex] = useState(0);

  const total = products.length;
  const canRotate = total > visibleCount;

  useEffect(() => {
    const mobileQuery = window.matchMedia('(max-width: 639px)');
    const tabletQuery = window.matchMedia('(max-width: 1023px)');

    const updateVisibleCount = () => {
      if (mobileQuery.matches) {
        setVisibleCount(Math.min(1, products.length || 1));
        return;
      }

      if (tabletQuery.matches) {
        setVisibleCount(Math.min(3, products.length || 1));
        return;
      }

      setVisibleCount(Math.min(4, products.length || 1));
    };

    updateVisibleCount();
    requestAnimationFrame(updateVisibleCount);
    setTimeout(updateVisibleCount, 200);
    mobileQuery.addEventListener('change', updateVisibleCount);
    tabletQuery.addEventListener('change', updateVisibleCount);

    return () => {
      mobileQuery.removeEventListener('change', updateVisibleCount);
      tabletQuery.removeEventListener('change', updateVisibleCount);
    };
  }, [products.length]);

  useEffect(() => {
    if (currentIndex >= total) setCurrentIndex(0);
  }, [currentIndex, total]);

  useEffect(() => {
    if (!canRotate) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % total);
    }, displayTime || 3000);

    return () => clearInterval(interval);
  }, [canRotate, displayTime, total]);

  const dotCount = useMemo(() => (canRotate ? total : 1), [canRotate, total]);
  const productsToShow = useMemo(() => {
    if (total === 0) return [];
    const count = Math.min(visibleCount, total);
    return Array.from({ length: count }, (_, idx) => products[(currentIndex + idx) % total]);
  }, [currentIndex, products, total, visibleCount]);

  const goToPrev = () => {
    if (!canRotate) return;
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  const goToNext = () => {
    if (!canRotate) return;
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const onTouchStart = (event) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  };

  const onTouchEnd = (event) => {
    if (!canRotate || touchStartX.current === null) return;
    const endX = event.changedTouches[0]?.clientX ?? null;
    if (endX === null) return;

    const deltaX = endX - touchStartX.current;
    if (Math.abs(deltaX) < 40) return;

    if (deltaX < 0) goToNext();
    else goToPrev();

    touchStartX.current = null;
  };

  // Renderização imediata para evitar o atraso de 15s no celular
  return (
    <div className="w-full overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="text-center">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
            Produtos em Destaque
          </h2>
        </div>

        <div className="relative px-2 sm:px-8 lg:px-12">
          <div
            className="grid gap-4"
            style={{ gridTemplateColumns: `repeat(${Math.max(1, productsToShow.length)}, minmax(0, 1fr))` }}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            {productsToShow.map((product) => (
              <div key={`${product._id}-${currentIndex}`} className="px-2 relative z-20 flex justify-center">
                <div className="transform transition-all duration-300 hover:scale-105 hover:shadow-lg relative z-30">
                  <ProductCard {...product} showDescription={false} />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-3 flex justify-center gap-2">
            {Array.from({ length: dotCount }).map((_, idx) => (
              <button
                key={`dot-${idx}`}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 w-2 rounded-full transition-colors ${idx === currentIndex ? 'bg-gray-700' : 'bg-gray-400/60'}`}
                aria-label={`Ir para slide ${idx + 1}`}
              />
            ))}
          </div>

          <div className="absolute top-1/2 left-4 transform -translate-y-1/2 z-20">
            <button
              onClick={goToPrev}
              className="bg-white/90 dark:bg-gray-700 shadow-lg rounded-full p-2 md:p-2.5 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors opacity-90 hover:opacity-100"
              aria-label="Previous product"
            >
              <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          </div>
          <div className="absolute top-1/2 right-4 transform -translate-y-1/2 z-20">
            <button
              onClick={goToNext}
              className="bg-white/90 dark:bg-gray-700 shadow-lg rounded-full p-2 md:p-2.5 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors opacity-90 hover:opacity-100"
              aria-label="Next product"
            >
              <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
