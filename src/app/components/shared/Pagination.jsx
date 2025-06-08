const Pagination = ({ page, pageSize, totalItems, slug = "" }) => {
  const totalPages = Math.ceil(totalItems / pageSize);
  const urlSlug = slug ? `${slug}/?page=` : '/?page=';

  const isFirst = page <= 1;
  const isLast = page >= totalPages;

  return (
    <nav className="flex justify-center items-center my-8 gap-3">
      <a
        href={isFirst ? "#" : `${urlSlug}${page - 1}`}
        className={`px-4 py-2 rounded-lg border border-gray-700 transition-colors duration-150
          ${isFirst
            ? "bg-gray-800 text-gray-500 cursor-not-allowed"
            : "bg-gray-900 hover:bg-gray-800 text-gray-100 border-blue-700"}
        `}
        aria-disabled={isFirst}
        tabIndex={isFirst ? -1 : 0}
      >
        ← Anterior
      </a>

      <span className="px-5 py-2 rounded-lg bg-blue-900 text-blue-200 font-semibold border border-blue-700 shadow-sm">
        Página {page} de {totalPages}
      </span>

      <a
        href={isLast ? "#" : `${urlSlug}${page + 1}`}
        className={`px-4 py-2 rounded-lg border border-gray-700 transition-colors duration-150
          ${isLast
            ? "bg-gray-800 text-gray-500 cursor-not-allowed"
            : "bg-gray-900 hover:bg-gray-800 text-gray-100 border-blue-700"}
        `}
        aria-disabled={isLast}
        tabIndex={isLast ? -1 : 0}
      >
        Próxima →
      </a>
    </nav>
  );
};

export default Pagination;
