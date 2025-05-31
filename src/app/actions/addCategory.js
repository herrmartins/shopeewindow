"use server";
import { getCategoryModel } from "../models/Category";

export default async function addCategory(formData) {
    const Category = await getCategoryModel();
    const id = formData.get("categorySelect");
    const title = formData.get("title");
    const emoji = formData.get("emoji");

    if (!title || !emoji) {
        throw new Error("Missing fields.");
    }

    if (id && id.trim() !== "") {
        await Category.updateOne(
            { _id: id },
            { title, emoji, updatedAt: new Date() }
        );
        return { status: 'updated', id: id.toString() };
    } else {
        const newCategory = await Category.create({
            title,
            emoji,
            createdAt: new Date(),
        });
        return { status: 'created', id: newCategory._id.toString() };
    }
}
