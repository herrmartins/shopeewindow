const Pagination = ({ page, pageSize, totalItems, slug = "" }) => {
  const totalPages = Math.ceil(totalItems / pageSize);
  const urlSlug = slug ? `${slug}/?page=` : "/?page=";

  const isFirst = page <= 1;
  const isLast = page >= totalPages;
  if (totalPages <= 1) return null;

  const commonButton =
    "px-4 py-2 rounded-full border text-sm font-medium transition-colors duration-200";
  const disabledButton =
    "text-gray-400 border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 cursor-not-allowed";
  const activeButton =
    "bg-sky-100 hover:bg-sky-200 text-sky-900 border-sky-200 dark:bg-sky-800 dark:hover:bg-sky-700 dark:text-white dark:border-sky-700";

  return (
    <nav className="flex justify-center items-center gap-4 py-6">
      <a
        href={isFirst ? "#" : `${urlSlug}${page - 1}`}
        className={`${commonButton} ${isFirst ? disabledButton : activeButton}`}
        aria-disabled={isFirst}
        tabIndex={isFirst ? -1 : 0}
      >
        ← Anterior
      </a>

      <span className="px-4 py-2 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
        Página <span className="font-bold">{page}</span> de{" "}
        <span className="font-bold">{totalPages}</span>
      </span>

      <a
        href={isLast ? "#" : `${urlSlug}${page + 1}`}
        className={`${commonButton} ${isLast ? disabledButton : activeButton}`}
        aria-disabled={isLast}
        tabIndex={isLast ? -1 : 0}
      >
        Próxima →
      </a>
    </nav>
  );
};

export default Pagination;
