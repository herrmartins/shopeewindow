"use client";

import { useState, useEffect, useActionState } from "react";
import CategoriesTable from "./CategoriesTable";
import AddCategoryFormClient from "./AddCategoryFormClient";
import { deleteCategory } from "@/app/actions/deleteCategory";
import { useFormStatus } from "react-dom";
import addCategory from "@/app/actions/addCategory";

const AdminClientWrapper = ({ initialCategories }) => {
  const [categories, setCategories] = useState(initialCategories);
  const [formData, setFormData] = useState({ title: "", emoji: "🙂" });
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [state, formAction] = useActionState(addCategory, {
    newCategory: null,
  });

  useEffect(() => {
    if (state?.status === "created" && state?.category) {
      handleNewCategory(state.category);
      setFormData({ title: "", emoji: "🙂" });
      setSelectedCategory(null);
    }
  }, [state]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleEmojiClick = (emojiData) => {
    setFormData({ ...formData, emoji: emojiData.emoji });
  };

  const handleNewCategory = (newCategory) => {
    setCategories((prev) => [...prev, newCategory]);
  };

  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    const category = categories.find((cat) => cat._id === categoryId);
    setSelectedCategory(category);
    setFormData({
      title: category?.title || "",
      emoji: category?.emoji || "🙂",
    });
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      await deleteCategory({ _id: categoryId });
      setCategories((prev) => prev.filter((ct) => ct._id !== categoryId));
    } catch (err) {
      console.error("Erro deletando a categoria", err);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="m-5 w-fit">
        <AddCategoryFormClient
          categories={categories}
          onNewCategory={handleNewCategory}
          selectedCategory={selectedCategory}
          onSetFormData={setFormData}
          onEditCategory={handleCategoryChange}
          formAction={formAction}
          formData={formData}
          handleInputChange={handleInputChange}
          handleEmojiClick={handleEmojiClick}
        />
      </div>
      <div className="m-5 w-fit">
        <CategoriesTable
          cats={categories}
          onDeleteCategory={handleDeleteCategory}
        />
      </div>
    </div>
  );
};

export default AdminClientWrapper;
