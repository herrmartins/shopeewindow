"use client";

import { useState, useEffect, useActionState } from "react";
import LogoForm from "./LogoForm";
import saveLogo from "@/app/actions/saveLogo";

const LogoClientWrapper = ({ initialLogo }) => {
  const [currentLogo, setCurrentLogo] = useState(initialLogo);
  const [state, formAction] = useActionState(saveLogo, {});

  useEffect(() => {
    if (state.status === "success") {
      window.location.reload();
    }
  }, [state]);

  return (
    <div className="flex flex-col w-full">
      <div className="text-center">
        <h1 className="text-3xl">Alterar Logo</h1>
      </div>
      <div className="flex flex-col items-center mt-5">
        <LogoForm currentLogo={currentLogo} formAction={formAction} state={state} />
      </div>
    </div>
  );
};

export default LogoClientWrapper;