'use client';

import { useRef, useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ProductCard from '../products/components/ProductCard';

export default function ProductCarouselClient({ products, displayTime }) {
  const sliderRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  const [slidesToShow, setSlidesToShow] = useState(null);
 
  useEffect(() => {
    // Calculate slides count first, then mark mounted so we render the complete carousel at once
    const update = () => {
      const w = window.innerWidth;
      if (w < 640) setSlidesToShow(1);      // phones
      else if (w < 1024) setSlidesToShow(3); // tablets / small desktops
      else setSlidesToShow(4);              // large desktops
    };
    update();
    setMounted(true);
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: displayTime,
    // center the single slide on small screens to avoid left alignment
    centerMode: slidesToShow === 1,
    centerPadding: slidesToShow === 1 ? '20px' : '0px',
    arrows: false
  };

  const goToPrev = () => {
    sliderRef.current?.slickPrev();
  };

  const goToNext = () => {
    sliderRef.current?.slickNext();
  };

  // While we haven't calculated slidesToShow, render a static fallback of the first product
  // for faster visual feedback and mount the full Slider when ready.
  if (slidesToShow === null) {
    const first = products && products.length > 0 ? products[0] : null;
    return (
      <div className="w-full py-6 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-4">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-1">
              Produtos em Destaque
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Descubra nossas melhores ofertas
            </p>
          </div>

          <div className="relative px-12 flex justify-center">
            {first ? (
              <div className="px-2 flex justify-center">
                <div className="transform transition-all duration-300 relative">
                  <ProductCard {...first} />
                </div>
              </div>
            ) : (
              <div className="h-56" aria-hidden />
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full py-6 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-4">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-1">
            Produtos em Destaque
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            Descubra nossas melhores ofertas
          </p>
        </div>

        <div className="relative px-12">
          {mounted ? (
            <Slider ref={sliderRef} {...settings}>
              {products.map((product) => (
                <div key={product._id} className="px-2 relative z-20 flex justify-center">
                  <div className="transform transition-all duration-300 hover:scale-105 hover:shadow-lg relative z-30">
                    <ProductCard {...product} />
                  </div>
                </div>
              ))}
            </Slider>
          ) : (
            // Placeholder to avoid layout shift while JS initializes
            <div className="h-56" aria-hidden />
          )}

          {/* Custom navigation arrows - positioned inside container */}
          {mounted && (
            <div className="absolute top-1/2 left-4 transform -translate-y-1/2 z-20">
              <button
                onClick={goToPrev}
                className="bg-white dark:bg-gray-700 shadow-lg rounded-full p-2 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors opacity-80 hover:opacity-100"
                aria-label="Previous product"
              >
                <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            </div>
          )}
          {mounted && (
            <div className="absolute top-1/2 right-4 transform -translate-y-1/2 z-20">
              <button
                onClick={goToNext}
                className="bg-white dark:bg-gray-700 shadow-lg rounded-full p-2 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors opacity-80 hover:opacity-100"
                aria-label="Next product"
              >
                <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}
        </div>

        {/* Custom CSS for slick carousel */}
        <style dangerouslySetInnerHTML={{
          __html: `
            .slick-dots {
              bottom: -35px !important;
            }
            .slick-dots li button:before {
              color: #6B7280 !important;
              font-size: 8px !important;
            }
            .slick-dots li.slick-active button:before {
              color: #374151 !important;
            }
            .slick-prev:before,
            .slick-next:before {
              display: none !important;
            }
          `
        }} />
      </div>
    </div>
  );
}