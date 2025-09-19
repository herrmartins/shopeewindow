"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const SearchFormComponent = () => {
  const [criteria, setCriteria] = useState("");
  const [category, setCategory] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    const term = criteria.trim();
    if (!term || term === "") router.push("/");
    else {
      router.push(`/products/search/${term}`);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto px-4">
      <form
        className="bg-white dark:bg-neutral-800 p-2 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700 flex gap-2"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name="criteria"
          id="criteria"
          placeholder="Digite o termo de busca..."
          className="w-full px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-600 bg-neutral-50 dark:bg-neutral-700 text-neutral-800 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
          onChange={(e) => setCriteria(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 rounded-lg whitespace-nowrap transition"
          value={criteria}
        >
          Enviar
        </button>
      </form>
    </div>
  );
};

export default SearchFormComponent;
