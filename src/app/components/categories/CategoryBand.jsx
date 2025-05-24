import CategoryCard from './CategoryCard';
import Category, { getCategoryModel } from "@/app/Category";
import connectDB from "@/app/lib/mongodb";

async function CategoryBand() {
    await getCategoryModel();
    const Category = await getCategoryModel();
    const categories = await Category.find({});
    console.log(categories)

    return (
        <div className="w-full bg-gray-900 py-1">
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