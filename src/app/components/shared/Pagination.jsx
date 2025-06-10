const Pagination = ({ page, pageSize, totalItems, slug = "" }) => {
  const totalPages = Math.ceil(totalItems / pageSize);
  const urlSlug = slug ? `${slug}/?page=` : "/?page=";

  const isFirst = page <= 1;
  const isLast = page >= totalPages;

  return (
    <nav className="flex justify-center items-center my-8 gap-3 px-4 py-4">
      <a
        href={isFirst ? "#" : `${urlSlug}${page - 1}`}
        className={`px-4 py-2 ${
          isFirst
            ? "text-gray-500 cursor-not-allowed"
            : "text-gray-900 dark:text-gray-500 dark:hover:bg-emerald-500 rounded-md"
        }`}
        aria-disabled={isFirst}
        tabIndex={isFirst ? -1 : 0}
      >
        ← Anterior
      </a>

      <span className="px-5 py-2 rounded-lg font-semibold dark:text-gray-700">
        Página {page} de {totalPages}
      </span>

      <a
        href={isLast ? "#" : `${urlSlug}${page + 1}`}
        className={`px-4 py-2 ${
          isLast
            ? "text-gray-500 cursor-not-allowed"
            : "text-gray-900 dark:text-gray-500 dark:hover:bg-emerald-500 rounded-md"
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