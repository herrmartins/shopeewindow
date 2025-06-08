"use client";

import { useState, useEffect, useActionState } from "react";
import CategoriesTable from "./CategoriesTable";
import AddCategoryFormClient from "./AddCategoryFormClient";
import { deleteCategory } from "@/app/actions/deleteCategory";
import addCategory from "@/app/actions/addCategory";

const AdminClientWrapper = ({ initialCategories }) => {
  const [categories, setCategories] = useState(initialCategories);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    emoji: "🙂",
    parentId: "",
    isEditing: isEditing,
  });
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [state, formAction] = useActionState(addCategory, {
    newCategory: null,
  });

  useEffect(() => {
    if (state?.status === "created" && state?.category) {
      handleNewCategory(state.category);
    } else if (state?.status === "updated") {
      setCategories((prev) =>
        prev.map((cat) => (cat._id === state.id ? state.data : cat))
      );
    }
    setFormData({ title: "", emoji: "🙂", parentId: "" });
    setSelectedCategory(null);
  }, [state]);

  useEffect(() => {
    if (selectedCategory) {
      setFormData({
        title: selectedCategory.title || "",
        emoji: selectedCategory.emoji || "🙂",
        parentId:
          selectedCategory.parent === null ||
          selectedCategory.parent === undefined
            ? ""
            : typeof selectedCategory.parent === "object"
            ? selectedCategory.parent._id?.toString() || ""
            : selectedCategory.parent?.toString?.() || "",
      });
      setIsEditing(true);
    } else {
      setFormData({ title: "", emoji: "🙂", parentId: "" });
      setIsEditing(false);
    }
  }, [selectedCategory]);

  const handleResetForm = () => {
    setFormData({
      title: "",
      emoji: "🙂",
      parentId: "",
    });
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleEmojiClick = (emojiData) => {
    setFormData({ ...formData, emoji: emojiData.emoji });
  };

  const handleNewCategory = (newCategory) => {
    setCategories((prev) => [...prev, newCategory]);
  };

  const handleSelectCategoryById = (id) => {
    const category = categories.find((cat) => cat._id === id);
    if (!category) return;
    setIsEditing(true);

    setSelectedCategory(category);
    setFormData({
      title: category.title,
      emoji: category.emoji || "🙂",
      parentId:
        typeof category.parent === "object" && category.parent !== null
          ? category.parent._id?.toString?.() || ""
          : category.parent?.toString?.() || "",
      isEditing: true,
      id: id,
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
          formAction={formAction}
          formData={formData}
          handleInputChange={handleInputChange}
          handleEmojiClick={handleEmojiClick}
          onResetForm={handleResetForm}
          isEditing={isEditing}
        />
      </div>
      <div className="m-5 w-fit">
        <CategoriesTable
          cats={categories}
          onDeleteCategory={handleDeleteCategory}
          onEditCategory={handleSelectCategoryById}
          isEditing={isEditing}
        />
      </div>
    </div>
  );
};

export default AdminClientWrapper;
