import { getCarouselConfig } from '../actions/getCarouselConfig';
import { getProductModel, serializeProduct } from '../models/Product';
import ProductCarouselClient from './ProductCarouselClient';

export default async function ProductCarousel() {
  try {
    const { selectedProducts, displayTime } = await getCarouselConfig();

    if (selectedProducts.length === 0) {
      return null; // No products selected, don't show carousel
    }

    const Product = await getProductModel();
    const rawProducts = await Product.find({ _id: { $in: selectedProducts } }).lean();
    const products = rawProducts.map(serializeProduct);

    if (products.length === 0) {
      return null;
    }

    return <ProductCarouselClient products={products} displayTime={displayTime} />;
  } catch (error) {
    console.error('Error loading carousel:', error);
    return null;
  }
}