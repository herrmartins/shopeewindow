import CategoryCard from './CategoryCard';
import { getCategoryModel } from "@/app/models/Category";

async function CategoryBand() {
  const Category = await getCategoryModel();
  const categories = await Category.find({ parent: null });

  return (
    <div className="w-full py-1 overflow-x-auto">
      <div className="flex max-w-screen-xl mx-auto flex-nowrap justify-start pl-4 md:justify-center md:pl-0">
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            _id={category.id}
            title={category.title}
            slug={category.slug}
            imageUrl={category.imageUrl}
            emoji={category.emoji}
          />
        ))}
      </div>
    </div>
  );
}

export default CategoryBand;
