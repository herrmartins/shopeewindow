import { getCategoryModel } from "@/app/models/Category";

export async function findCategoryPath(categoryIdOrSlug) {
  const Category = await getCategoryModel();
  const path = [];

  let currentCategory = typeof categoryIdOrSlug === "string"
    ? await Category.findOne({ slug: categoryIdOrSlug }).lean()
    : await Category.findById(categoryIdOrSlug).lean();

  if (!currentCategory) return [];

  path.unshift({
    _id: currentCategory._id,
    title: currentCategory.title,
    slug: currentCategory.slug,
  });

  while (currentCategory.parent) {
    const parent = await Category.findById(currentCategory.parent).lean();
    if (!parent) break;

    path.unshift({
      _id: parent._id,
      title: parent.title,
      slug: parent.slug,
    });

    currentCategory = parent;
  }

  return path;
}
