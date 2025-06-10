const Pagination = ({ page, pageSize, totalItems, slug = "" }) => {
  const totalPages = Math.ceil(totalItems / pageSize);
  const urlSlug = slug ? `${slug}/?page=` : "/?page=";

  const isFirst = page <= 1;
  const isLast = page >= totalPages;

  return (
    <nav className="flex justify-center items-center my-8 gap-3">
      <a
        href={isFirst ? "#" : `${urlSlug}${page - 1}`}
        className={`px-4 py-2 rounded-lg border transition-colors duration-150 ${
          isFirst
            ? "bg-gray-200 text-gray-500 border-gray-300 cursor-not-allowed"
            : "bg-white text-gray-900 border-gray-200 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-700"
        }`}
        aria-disabled={isFirst}
        tabIndex={isFirst ? -1 : 0}
      >
        ← Anterior
      </a>

      <span className="px-5 py-2 rounded-lg font-semibold border shadow-sm bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900 dark:text-blue-200 dark:border-blue-700">
        Página {page} de {totalPages}
      </span>

      <a
        href={isLast ? "#" : `${urlSlug}${page + 1}`}
        className={`px-4 py-2 rounded-lg border transition-colors duration-150 ${
          isLast
            ? "bg-gray-200 text-gray-500 border-gray-300 cursor-not-allowed"
            : "bg-white text-gray-900 border-gray-200 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-700"
        }`}
        aria-disabled={isLast}
        tabIndex={isLast ? -1 : 0}
      >
        Próxima →
      </a>
    </nav>
  );
};

export default Pagination;