'use server';

import { getConfigModel } from '../models/Config';

export async function getCarouselConfig() {
  try {
    const Config = await getConfigModel();

    // Get selected products
    const selectedProductsConfig = await Config.findOne({ key: 'carousel_selected_products' }).lean();
    const selectedProducts = selectedProductsConfig ? JSON.parse(selectedProductsConfig.value) : [];

    // Get display time
    const displayTimeConfig = await Config.findOne({ key: 'carousel_display_time' }).lean();
    const displayTime = displayTimeConfig ? parseInt(displayTimeConfig.value) : 3000; // default 3 seconds

    return { selectedProducts, displayTime };
  } catch (error) {
    console.error('Error getting carousel config:', error);
    return { selectedProducts: [], displayTime: 3000 };
  }
}