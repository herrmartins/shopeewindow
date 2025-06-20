'use client';

import { signOut } from 'next-auth/react';
import { FiLogOut } from 'react-icons/fi';

export default function LogoutButton({ isLoggedIn }) {
  if (!isLoggedIn) return null;

  return (
    <button
      onClick={() => signOut({ callbackUrl: '/' })}
      className="inline-flex items-center justify-center w-8 h-8 rounded-full 
                 text-neutral-700 dark:text-neutral-300 
                 hover:bg-neutral-200 dark:hover:bg-neutral-700 
                 transition-colors duration-200 mt-1 mx-2"
      aria-label="Sair"
      title="Sair"
    >
      <FiLogOut className="w-4 h-4" />
    </button>
  );
}
