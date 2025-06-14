import CategoryCard from './CategoryCard';
import { getCategoryModel } from "@/app/models/Category";

async function CategoryBand() {
    await getCategoryModel();
    const Category = await getCategoryModel();
    const categories = await Category.find({ parent: null});

    return (
        <div className="w-full py-1">
            <div className="flex justify-center gap-4 px-2 max-w-screen-xl mx-auto flex-wrap">
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