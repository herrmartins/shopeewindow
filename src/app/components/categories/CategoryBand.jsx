import categories from '@/app/categories';
import CategoryCard from './CategoryCard';

function CategoryBand() {
  console.log(categories);

  return (
    <div className="w-full bg-gray-900 py-2">
      <div className="flex justify-center gap-2 px-4 max-w-screen-xl mx-auto">
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            _id={category.id}
            title={category.name}
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