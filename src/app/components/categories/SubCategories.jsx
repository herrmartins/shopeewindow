"use client";
import {useState, React} from "react";

export default function SubCategories({categories}) {
    if (!categories || categories.length === 0) return null;
    const [showSubcategories, setShowSubcategories] = useState(false);

    return (
        <div className="w-full mt-4">
            <h3 className="text-md font-extralight text-white mb-1">
                <button
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold mt-3 py-2 px-6 rounded-xl transition"
                    onClick={() => setShowSubcategories(prev => !prev)}>
                    Ver Subcategorias
                </button>
            </h3>
            {showSubcategories && (
                <ul className="grid md:grid-cols-4 ml-4 space-y-1 text-white">
                    {categories.map((cat) => (
                        <li key={cat._id} className="gap-2">
              <span>
                {cat.emoji} {cat.title}
              </span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
