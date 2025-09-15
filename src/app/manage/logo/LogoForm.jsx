"use client";

import Image from "next/image";

const LogoForm = ({ currentLogo, formAction, state }) => {

  return (
    <div className="w-full max-w-md">
      <div className="mb-4">
        <h2 className="text-xl mb-2">Logo Atual:</h2>
        {currentLogo && (
          <Image
            src={currentLogo}
            alt="Logo atual"
            width={300}
            height={100}
            className="border rounded"
          />
        )}
      </div>
      <form action={formAction} className="space-y-4">
        <div>
          <label htmlFor="logo" className="block text-sm font-medium">
            Novo Logo:
          </label>
          <input
            type="file"
            id="logo"
            name="logo"
            accept="image/*"
            required
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Salvar Logo
        </button>
      </form>
      {state.status === "success" && (
        <p className="text-green-500 mt-2">{state.message}</p>
      )}
      {state.status === "error" && (
        <p className="text-red-500 mt-2">{state.message}</p>
      )}
    </div>
  );
};

export default LogoForm;