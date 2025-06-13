import Link from "next/link";

export async function CategoriesPath({ path }) {
  return (
    <nav aria-label="breadcrumb" className="my-4">
      <ol className="flex flex-wrap items-center gap-1 text-sm">
        {path.map((cat, index) => (
          <li key={cat._id} className="flex items-center">
            <Link
              href={`/products/${cat.slug}`}
              className="px-2 py-1 rounded-md 
                         bg-neutral-200 text-neutral-800 
                         dark:bg-neutral-700 dark:text-white 
                         hover:bg-blue-100 dark:hover:bg-blue-600 
                         transition-colors duration-150"
            >
              {cat.title}
            </Link>
            {index < path.length - 1 && (
              <span
                className="mx-2 text-neutral-500 dark:text-neutral-400 select-none"
                aria-hidden="true"
              >
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
