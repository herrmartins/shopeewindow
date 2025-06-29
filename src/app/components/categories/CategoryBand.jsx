import CategoryCard from './CategoryCard';
import { getCategoryModel } from "@/app/models/Category";

async function CategoryBand() {
  const Category = await getCategoryModel();
  const categories = await Category.find({ parent: null });

  return (
    <div className="w-full py-1 overflow-x-auto m-3">
      <div className="flex px-2 max-w-screen-xl mx-auto flex-nowrap justify-center">
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