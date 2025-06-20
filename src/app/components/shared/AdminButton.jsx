'use client'
import { useRouter } from "next/navigation";
import { SiAdminer } from "react-icons/si";

function AdminButton() {
  const router = useRouter();
  return (
        <button
          onClick={() => router.replace('/admin')}
          className="inline-flex items-center justify-center w-8 h-8 rounded-full 
                     text-neutral-700 dark:text-neutral-300 
                     hover:bg-neutral-200 dark:hover:bg-neutral-700 
                     transition-colors duration-200 mt-1 cursor-pointer"
          aria-label="Sair"
          title="Sair"
        >
          <SiAdminer className="w-4 h-4" />
        </button>
  )
}

export default AdminButton