import categories from '@/app/categories';
import CategoryCard from './CategoryCard';

function CategoryBand() {

  return (
    <div className="w-full bg-gray-900 py-1">
      <div className="flex justify-center gap-4 px-2 max-w-screen-xl mx-auto flex-wrap">
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