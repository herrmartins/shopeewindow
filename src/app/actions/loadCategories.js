"use server";

import { getCategoryModel, serializeCategories } from "../models/Category";

export async function loadCategories() {
    try {
        const Category = await getCategoryModel();
        const categories = await Category.find({}).sort({ order: 1 }).lean();

        if (!categories) {
            return [];
        }

        return categories.map(serializeCategories).filter(Boolean);
    } catch (error) {
        console.error("Error loading categories:", error);
        throw new Error("Failed to load categories");
    }
}
