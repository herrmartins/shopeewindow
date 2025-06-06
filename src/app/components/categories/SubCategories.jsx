'use client';
import React from 'react';

export default function SubCategories({ categories }) {
  if (!categories || categories.length === 0) return null;

  return (
    <div className="w-full mt-4">
      <h3 className="text-lg font-semibold text-white mb-2">
        Subcategorias:
      </h3>
      <ul className="ml-4 space-y-1 text-white">
        {categories.map((cat) => (
          <li key={cat._id} className="flex items-center gap-2">
            <span>{cat.emoji}</span>
            <span>{cat.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
