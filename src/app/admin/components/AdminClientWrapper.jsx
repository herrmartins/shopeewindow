"use client";

import { useState } from "react";
import CategoriesTable from "./CategoriesTable";
import AddCategoryFormClient from "./AddCategoryFormClient";

const AdminClientWrapper = ({ initialCategories }) => {
  const [categories, setCategories] = useState(initialCategories);

  const handleNewCategory = (newCategory) => {
    setCategories((prev) => [...prev, newCategory]);
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
        <CategoriesTable cats={categories} />
      </div>
    </div>
  );
};

export default AdminClientWrapper;
