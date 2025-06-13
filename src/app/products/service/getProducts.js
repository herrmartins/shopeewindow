import { getProductModel } from "@/app/models/Product";

export async function getProducts({
  criteria = null,
  categoryId = null,
  page = 1,
  pageSize = 18,
} = {}) {
  const Product = await getProductModel();

  const skip = (page - 1) * pageSize;

  const filter = {};
  const projection = {};
  const sort = {};

  console.log(criteria)

  if (categoryId) filter.category = categoryId;

  if (criteria) {
    filter.$text = { $search: criteria };
    projection.score = { $meta: "textScore" };
    sort.score = { $meta: "textScore" };
  }

  if (!criteria) sort.createdAt = -1;

  const query = Product.find(filter, projection)
    .sort(sort)
    .skip(skip)
    .limit(pageSize)
    .lean();

  const [products, total] = await Promise.all([
    query,
    Product.countDocuments(filter),
  ]);

  return { products, total };
}
