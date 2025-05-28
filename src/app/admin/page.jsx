import AddCategoryFormClient from "./components/AddCategoryFormClient";
const AdminPage = () => {
  return (
    <div className="flex flex-col w-full">
      <div className="text-center">
        <h1 className="text-5xl">Admin Page</h1>
      </div>
      <div className="flex w-full justify-center">
        <AddCategoryFormClient />
      </div>
    </div>
  );
};

export default AdminPage;
