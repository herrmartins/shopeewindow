import { getCategoryModel, serializeCategories } from "../models/Category";
import AdminClientWrapper from "./components/AdminClientWrapper";

const AdminPage = async () => {
  const Category = await getCategoryModel();
  const rawCategories = await Category.find().lean();
  const categories = rawCategories.map(serializeCategories);

  return (
    <div className="flex flex-col w-full">
      <div className="text-center">
        <h1 className="text-5xl">Administração</h1>
      </div>
      <div className="flex flex-col items-center">
        <AdminClientWrapper initialCategories={categories}/>
      </div>
    </div>
  );
};

export default AdminPage;
