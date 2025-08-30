"use server";

import { getCategoryModel } from "../models/Category";

export async function loadCategories() {
    try {
        const Category = await getCategoryModel();
        const categories = await Category.find({}).sort({ order: 1 });

        return categories.map((category) => ({
            _id: category._id.toString(),
            title: category.title,
            imageUrl: category.imageUrl,
            emoji: category.emoji,
            slug: category.slug,
            order: category.order,
            createdAt: category.createdAt.toISOString(),
            updatedAt: category.updatedAt.toISOString(),
        }));
    } catch (error) {
        console.error("Error loading categories:", error);
        throw new Error("Failed to load categories");
    }
}
