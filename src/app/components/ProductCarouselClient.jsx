'use client';

import { useRef, useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ProductCard from '../products/components/ProductCard';

export default function ProductCarouselClient({ products, displayTime }) {
  const sliderRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const settings = {
    dots: true,
    infinite: products.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: products.length > 1,
    autoplaySpeed: displayTime || 3000,
    centerMode: true,
    centerPadding: '16px',
    arrows: false,
    draggable: true,
    swipe: true,
    touchMove: true,
    pauseOnHover: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(4, products.length),
          centerMode: false,
          centerPadding: '0px',
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: Math.min(2, products.length),
          centerMode: false,
          centerPadding: '0px',
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          centerMode: true,
          centerPadding: '16px',
        }
      }
    ]
  };

  const goToPrev = () => {
    sliderRef.current?.slickPrev();
  };

  const goToNext = () => {
    sliderRef.current?.slickNext();
  };

  // Renderização imediata para evitar o atraso de 15s no celular
  return (
    <div className={`w-full overflow-hidden transition-opacity duration-500 ${mounted ? 'opacity-100' : 'opacity-50'}`}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
            Produtos em Destaque
          </h2>
        </div>

        <div className="relative px-2 sm:px-8 lg:px-12">
          <Slider ref={sliderRef} {...settings}>
            {products.map((product, index) => (
              <div key={product._id} className="px-2 relative z-20 flex justify-center">
                <div className="transform transition-all duration-300 hover:scale-105 hover:shadow-lg relative z-30">
                  <ProductCard 
                    {...product} 
                    showDescription={false} 
                    priority={index < 2} // Carrega as 2 primeiras imagens imediatamente
                  />
                </div>
              </div>
            ))}
          </Slider>

          <div className="absolute top-1/2 left-4 transform -translate-y-1/2 z-20">
            <button
              onClick={goToPrev}
              className="hidden md:block bg-white dark:bg-gray-700 shadow-lg rounded-full p-2 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors opacity-80 hover:opacity-100"
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
              className="hidden md:block bg-white dark:bg-gray-700 shadow-lg rounded-full p-2 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors opacity-80 hover:opacity-100"
              aria-label="Next product"
            >
              <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        <style dangerouslySetInnerHTML={{
          __html: `
            .slick-dots {
              bottom: -10px !important;
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
            /* Garantir que o carrossel tenha altura mínima antes do JS carregar */
            .slick-track {
              display: flex !important;
              align-items: center !important;
            }
          `
        }} />
      </div>
    </div>
  );
}
