import { getCategoryModel, serializeCategories } from "@/app/models/Category";
import { getProductModel, serializeProduct } from "@/app/models/Product";
import AddProductFormClient from "./AddProductFormClient";
import saveProduct from "@/app/actions/saveProduct";

async function AddProductForm({
  categories,
  selectedCategory = null,
  product = undefined,
}) {
  // Initialize props to pass to client component
  let clientProduct = undefined;
  let clientSelectedCategory = null;

  if (product) {
    // Serialize the product object to plain JSON (if not already serialized)
    if (!product._id || typeof product._id !== 'string') {
      clientProduct = serializeProduct(product);
    } else {
      clientProduct = product;
    }

    const Category = await getCategoryModel();
    const gottenCat = await Category.findOne({ _id: clientProduct.category }).lean();
    clientSelectedCategory = serializeCategories(gottenCat) || null;
  } else if (selectedCategory) {
    // Ensure selectedCategory is properly serialized
    if (typeof selectedCategory._id !== 'string') {
      clientSelectedCategory = serializeCategories(selectedCategory) || null;
    } else {
      clientSelectedCategory = selectedCategory;
    }
  }

  return (
    <AddProductFormClient
      categories={categories}
      selectedCategory={clientSelectedCategory}
      product={clientProduct}
      serverAction={saveProduct}
    />
  );
}

export default AddProductForm;
