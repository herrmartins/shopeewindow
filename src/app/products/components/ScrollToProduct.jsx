'use client';

import { useEffect } from 'react';

export default function ScrollToProduct({ productId }) {
  useEffect(() => {
    if (productId) {
      const element = document.getElementById(`product-${productId}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [productId]);

  return null;
}