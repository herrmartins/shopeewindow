import { Suspense } from "react";
import LoginPage from "./LoginPage";

export default function AuthPage() {
  return (
    <Suspense fallback={<div>Carregando login...</div>}>
      <LoginPage />
    </Suspense>
  );
}
