import CategoryCard from "./CategoryCard";

export default function SubCategories({ categories }) {
  if (!categories?.length) return null;

  return (
    <div className="w-full mt-4">
      <div className="w-full py-2 overflow-x-auto">
        <div className="flex max-w-screen-xl mx-auto flex-nowrap justify-start gap-0.5 md:justify-center md:gap-1 px-0.5 md:px-0">
          {categories.map((category) => (
            <div key={category._id} className="flex flex-col">
              <CategoryCard
                _id={category._id}
                title={category.title}
                slug={category.slug}
                imageUrl={category.imageUrl}
                emoji={category.emoji}
              />
              {category.children && category.children.length > 0 && (
                <SubCategories categories={category.children} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
