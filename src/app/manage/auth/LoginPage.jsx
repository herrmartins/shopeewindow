"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import ReCAPTCHA from "react-google-recaptcha";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [captchaToken, setCaptchaToken] = useState(null);
  const [error, setError] = useState("");

  const params = useSearchParams();
  const flashMessage = params.get("msg");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TEMPORARILY DISABLE CAPTCHA REQUIREMENT
    const DISABLE_CAPTCHA = true; // Set to false to re-enable
    if (!DISABLE_CAPTCHA && process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && !captchaToken) {
      setError("Por favor, complete o captcha");
      return;
    }
    const res = await signIn("credentials", {
      redirect: false,
      username,
      password,
      captcha: captchaToken || "bypass",
    });

    if (!res.ok) {
      setError("Usuário ou senha inválidos");
    } else {
      setError("");
      window.location.href = "/manage";
    }
  };

  return (
    <div>
      <div className="flex justify-center">
        {flashMessage && <p className="text-red-600">Usuário não autenticado...</p>}
      </div>
      <div className="mt-3 flex items-center justify-center px-4 transition-colors">
        <div className="bg-white dark:bg-neutral-800 p-8 rounded-2xl shadow-md w-full max-w-sm border border-neutral-200 dark:border-neutral-700">
          <h2 className="text-2xl font-bold text-center text-neutral-800 dark:text-white mb-6">
            Entrar
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Usuário
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Digite seu usuário"
                className="w-full px-4 py-2 rounded-xl border border-neutral-300 dark:border-neutral-600 
                         bg-neutral-50 dark:bg-neutral-700 
                         text-neutral-800 dark:text-white 
                         placeholder:text-neutral-400 dark:placeholder:text-neutral-500 
                         focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Senha
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2 rounded-xl border border-neutral-300 dark:border-neutral-600
                         bg-neutral-50 dark:bg-neutral-700
                         text-neutral-800 dark:text-white
                         placeholder:text-neutral-400 dark:placeholder:text-neutral-500
                         focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
              />
            </div>
            {/* TEMPORARILY DISABLE CAPTCHA DISPLAY */}
            {(() => {
              const DISABLE_CAPTCHA = true; // Set to false to re-enable
              if (DISABLE_CAPTCHA) {
                return (
                  <div className="text-center text-sm text-green-600 dark:text-green-400">
                    ✅ CAPTCHA temporariamente desabilitado
                  </div>
                );
              }
              return process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ? (
                <div className="flex justify-center">
                  <ReCAPTCHA
                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                    onChange={setCaptchaToken}
                    theme="light"
                  />
                </div>
              ) : (
                <div className="text-center text-sm text-yellow-600 dark:text-yellow-400">
                  ⚠️ reCAPTCHA não configurado. Configure NEXT_PUBLIC_RECAPTCHA_SITE_KEY para ativar.
                </div>
              );
            })()}
            {error && (
              <p className="text-sm text-red-600 dark:text-red-400 text-center">
                {error}
              </p>
            )}
            <button
              type="submit"
              className="w-full bg-sky-600 hover:bg-sky-700 text-white py-2 rounded-xl font-semibold transition-colors"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
