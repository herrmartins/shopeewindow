import { getCategoryModel, serializeCategories } from "../models/Category";
import AdminClientWrapper from "./components/AdminClientWrapper";
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

const AdminPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/manage/auth?msg=noauth");
  }

  const Category = await getCategoryModel();
  const rawCategories = await Category.find().sort({ order: 1 }).lean();
  const categories = rawCategories.map(serializeCategories);

  return (
    <div className="flex flex-col w-full">
      <div className="text-center">
        <h1 className="text-5xl">Administração</h1>
      </div>
      <div className="flex flex-col items-center">
        <AdminClientWrapper initialCategories={categories} />
      </div>
    </div>
  );
};

export default AdminPage;
