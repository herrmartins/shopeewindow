'use server';

import { getConfigModel } from '../models/Config';

export async function saveCarouselConfig(selectedProducts, displayTime) {
  try {
    const Config = await getConfigModel();

    // Save selected products
    await Config.findOneAndUpdate(
      { key: 'carousel_selected_products' },
      { value: JSON.stringify(selectedProducts) },
      { upsert: true, new: true }
    );

    // Save display time
    await Config.findOneAndUpdate(
      { key: 'carousel_display_time' },
      { value: displayTime.toString() },
      { upsert: true, new: true }
    );

    return { success: true };
  } catch (error) {
    console.error('Error saving carousel config:', error);
    return { success: false, error: error.message };
  }
}