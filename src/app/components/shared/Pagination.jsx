const Pagination = ({page, pageSize, totalItems, slug = null}) => {
  const totalPages = Math.ceil(totalItems / pageSize);
  const urlSlug = slug ? `${slug}/?page=` : '/?page=';


  return (
    <section className="flex mx-auto justify-center items-center my-8">
      <a href={`${urlSlug}${page - 1}`} className="mr-2 px-2 py-1 border border-gray-300 rounded"> Previous</a>

      <a className="mr-2 px-2 py-1 border border-gray-300 rounded"> Page {page} of {totalPages}</a>

      <a href={`${urlSlug}${page + 1}`} className="ml-2 px-2 py-1 border border-gray-300 rounded"> Next</a>
    </section>
  );
};

export default Pagination;
