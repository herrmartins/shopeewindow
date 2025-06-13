'use client';

import { signOut } from 'next-auth/react';

export default function LogoutButton({ isLoggedIn }) {
  if (!isLoggedIn) return null;

  return (
    <button
      onClick={() => signOut({ callbackUrl: '/' })}
      className="text-sm text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-xl"
    >
      Sair
    </button>
  );
}
