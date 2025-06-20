import { loadCategories } from '@/app/actions/loadCategories';
import AddCategoryForm from './AddCategoryFormClient';

// Marked to be removed
export default async function AddCategoryFormServer() {
  const categories = await loadCategories();
  return <AddCategoryForm initialCategories={categories} />;
}