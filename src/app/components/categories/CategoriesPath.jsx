import Link from "next/link";
export async function CategoriesPath({ path }) {
  return (
    <nav aria-label="breadcrumb" className="my-2">
      <ol className="flex flex-wrap items-center gap-1 text-sm">
        {path.map((cat, index) => (
          <li key={cat._id} className="flex items-center">
            <Link
              href={`/products/${cat.slug}`}
              className="px-2 py-1 rounded bg-gray-800 text-blue-300 hover:bg-blue-900 hover:text-white transition-colors duration-150"
            >
              {cat.title}
            </Link>
            {index < path.length - 1 && (
              <span className="mx-2 flex items-center text-lg font-bold text-blue-500 select-none">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
