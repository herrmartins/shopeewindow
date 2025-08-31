import CategoryCard from "./CategoryCard";
import { getCategoryModel, serializeCategories } from "@/app/models/Category";

async function CategoryBand() {
  const Category = await getCategoryModel();
  const rawCategories = await Category.find({ parent: null }).sort({ order: 1 }).lean();
  const categories = rawCategories.map(serializeCategories);

  return (
    <div className="w-full py-2 overflow-x-auto">
      <div className="flex max-w-screen-xl mx-auto flex-nowrap justify-start gap-0.5 md:justify-center md:gap-1 px-0.5 md:px-0">
        {categories.map((category) => (
          <CategoryCard
            key={category._id}
            _id={category._id}
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
