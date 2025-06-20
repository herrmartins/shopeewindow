"use client";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { deleteProduct } from "@/app/actions/deleteProduct";

function ProductAdminMenu({ id }) {
  const router = useRouter();

  return (
    <div className="flex justify-center gap-2">
      <button
        className="text-sm px-3 py-1.5 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-medium cursor-pointer"
        onClick={() => router.replace(`/admin/product/edit/${id}`)}
      >
        <FaEdit />
      </button>
      <button
        className="text-sm px-3 py-1.5 rounded-md bg-red-600 hover:bg-red-700 text-white font-medium cursor-pointer"
        onClick={() => {
          if (confirm("Deseja apagar o produto?")) {
            deleteProduct(id);
          }
        }}
      >
        <FaTrash />
      </button>
    </div>
  );
}

export default ProductAdminMenu;
