"use client";

import { useState } from "react";
import CategoriesTable from "./CategoriesTable";
import AddCategoryFormClient from "./AddCategoryFormClient";
import { deleteCategory } from "@/app/actions/deleteCategory";

/* 
  I'm using here this wrapper and props, so
  I can use optimistic update. But in the products
  server action, I'll use revalidate path (as it is a portfolio project).
*/

const AdminClientWrapper = ({ initialCategories }) => {
  const [categories, setCategories] = useState(initialCategories);

  const handleNewCategory = (newCategory) => {
    setCategories((prev) => [...prev, newCategory]);
  };

  const handleDeleteCategory = (categoryId) => {
    console.log("Deletando", categoryId);
    try {
      deleteCategory(categoryId)
      setCategories((prev) => prev.filter(ct => ct._id !== categoryId));
    } catch(err) {
      console.log("Erro deletando a categoria", err)
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="m-5 w-fit">
        <AddCategoryFormClient
          categories={categories}
          onNewCategory={handleNewCategory}
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
