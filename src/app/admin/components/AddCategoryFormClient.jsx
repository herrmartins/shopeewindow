"use client";
import { useState, useEffect } from "react";
import { loadCategories } from "@/app/actions/loadCategories";

const AddCategoryForm = ({ initialCategories }) => {
    const [categories, setCategories] = useState(initialCategories || []);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [formData, setFormData] = useState({ title: "", emoji: "" });
    const isEditing = selectedCategory !== null;

    useEffect(() => {
        if (!initialCategories || initialCategories.length === 0) {
            loadCategories().then((data) => setCategories(data));
        }
    }, [initialCategories]);

    const handleCategoryChange = (e) => {
        const categoryId = e.target.value;
        const category = categories.find((cat) => cat._id === categoryId);
        setSelectedCategory(category);
        setFormData({
            title: category ? category.title : "",
            emoji: category.emoji,
        });
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    return (
        <div className="lg:w-full md:w-2xl max-w-5xl m-5 p-8 bg-zinc-800 rounded-lg">
            <h2 className="text-3xl text-gray-300 font-bold mb-6 text-center">
                Select Category
            </h2>
            {isEditing && (
                <h3 className="bg-gray-700 rounded-2xl px-2">
                    Editando: {selectedCategory || "Sem categoria"}
                </h3>
            )}

            <div className="mb-6">
                <label
                    htmlFor="categorySelect"
                    className="block text-gray-200 font-semibold mb-2"
                >
                    Categoria
                </label>
                <select
                    id="categorySelect"
                    onChange={handleCategoryChange}
                    value={selectedCategory?._id || ""}
                    className="p-1 border border-gray-600 rounded-md bg-zinc-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                >
                    <option value="">-- Select a category --</option>
                    {categories.map((category) => (
                        <option key={category._id} value={category._id}>
                            {category.title}
                        </option>
                    ))}
                </select>
            </div>

            <div className="mb-6">
                <label
                    htmlFor="title"
                    className="block text-gray-300 font-semibold mb-2"
                >
                    Título
                </label>
                <input
                    type="text"
                    id="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="p-1 border border-gray-600 rounded-md bg-zinc-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                />
            </div>

            <div>
                <label
                    htmlFor="emoji"
                    className="block text-gray-200 font-semibold mb-2"
                >
                    Emoji
                </label>
                <input
                    type="text"
                    id="emoji"
                    value={formData.emoji}
                    onChange={handleInputChange}
                    className="p-1 border border-gray-600 rounded-md bg-zinc-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                />
            </div>
            <div className="flex gap-3">
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold mt-3 py-2 px-6 rounded-xl transition">
                    SALVAR
                </button>
                <button className="bg-slate-600 hover:bg-slate-500 text-white font-bold mt-3 py-2 px-6 rounded-xl transition">
                    LIMPAR
                </button>
            </div>
        </div>
    );
};

export default AddCategoryForm;
