'use client';

import { useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ProductCard from '../products/components/ProductCard';

export default function ProductCarouselClient({ products, displayTime }) {
  const sliderRef = useRef(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: displayTime,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
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
          <Slider ref={sliderRef} {...settings}>
            {products.map((product) => (
              <div key={product._id} className="px-2 relative z-20">
                <div className="transform transition-all duration-300 hover:scale-105 hover:shadow-lg relative z-30">
                  <ProductCard {...product} />
                </div>
              </div>
            ))}
          </Slider>

          {/* Custom navigation arrows - positioned inside container */}
          <div className="absolute top-1/2 left-4 transform -translate-y-1/2 z-20">
            <button
              onClick={goToPrev}
              className="bg-white dark:bg-gray-700 shadow-lg rounded-full p-2 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors opacity-80 hover:opacity-100"
            >
              <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          </div>
          <div className="absolute top-1/2 right-4 transform -translate-y-1/2 z-20">
            <button
              onClick={goToNext}
              className="bg-white dark:bg-gray-700 shadow-lg rounded-full p-2 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors opacity-80 hover:opacity-100"
            >
              <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
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