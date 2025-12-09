"use client";

import { useState, useEffect } from "react";
import { useActionState } from "react";
import CategoriesTable from "./CategoriesTable";
import AddCategoryFormClient from "./AddCategoryFormClient";
import OrphanProductsTable from "./OrphanProductsTable";
import { deleteCategory } from "@/app/actions/deleteCategory";
import addCategory from "@/app/actions/addCategory";
import updateCategoryOrder from "@/app/actions/updateCategoryOrder";
import { updateProductCategory } from "@/app/actions/updateProductCategory";

const CategoriesManagementClient = ({ initialCategories, initialOrphanProducts }) => {
  const [categories, setCategories] = useState(initialCategories);
  const [orphanProducts, setOrphanProducts] = useState(initialOrphanProducts);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    emoji: "🙂",
    parentId: "",
    imageUrl: "",
    isEditing: isEditing,
  });
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [activeTab, setActiveTab] = useState("categories");

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
        imageUrl: selectedCategory.imageUrl || "",
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
    if (confirm("Deseja apagar a categoria?")) {
      try {
        await deleteCategory({ _id: categoryId });
        setCategories((prev) => prev.filter((ct) => ct._id !== categoryId));
      } catch (err) {
        console.error("Erro deletando a categoria", err);
      }
    }
  };

  const handleSaveOrder = async (updatedCategories) => {
    try {
      const result = await updateCategoryOrder(updatedCategories);
      if (result.status === "success") {
        setCategories(updatedCategories);
        alert("Ordem das categorias salva com sucesso! Recarregue a página principal para ver as mudanças.");
      } else {
        alert("Erro ao salvar ordem: " + result.message);
      }
    } catch (err) {
      console.error("Erro salvando ordem", err);
      alert("Erro ao salvar ordem");
    }
  };

  const handleUpdateProductCategory = async (productId, categoryId) => {
    try {
      const result = await updateProductCategory(productId, categoryId);
      if (result.status === "success") {
        // Remove from orphan products
        setOrphanProducts((prev) => prev.filter((p) => p._id !== productId));
        alert("Produto movido para categoria com sucesso!");
      } else {
        alert("Erro ao mover produto: " + result.message);
      }
    } catch (err) {
      console.error("Erro movendo produto", err);
      alert("Erro ao mover produto");
    }
  };

  return (
    <div className="w-full">
      {/* Tabs */}
      <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
        <button
          onClick={() => setActiveTab("categories")}
          className={`px-6 py-3 font-medium text-sm ${
            activeTab === "categories"
              ? "border-b-2 border-indigo-500 text-indigo-600 dark:text-indigo-400"
              : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          }`}
        >
          Categorias
        </button>
        <button
          onClick={() => setActiveTab("orphans")}
          className={`px-6 py-3 font-medium text-sm ${
            activeTab === "orphans"
              ? "border-b-2 border-indigo-500 text-indigo-600 dark:text-indigo-400"
              : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          }`}
        >
          Produtos Órfãos ({orphanProducts.length})
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "categories" && (
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
              onSaveOrder={handleSaveOrder}
            />
          </div>
        </div>
      )}

      {activeTab === "orphans" && (
        <div className="flex flex-col items-center">
          <OrphanProductsTable
            products={orphanProducts}
            categories={categories}
            onUpdateCategory={handleUpdateProductCategory}
          />
        </div>
      )}
    </div>
  );
};

export default CategoriesManagementClient;