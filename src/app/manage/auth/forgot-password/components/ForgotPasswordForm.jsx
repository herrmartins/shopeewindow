"use client";

import { useActionState, useEffect, useState, useTransition } from "react";

const SECURITY_QUESTIONS = [
  "Qual é o nome da sua primeira escola?",
  "Qual é o nome do seu primeiro animal de estimação?",
  "Qual é a cidade de nascimento da sua mãe?",
  "Qual é o seu filme favorito?",
  "Qual é o nome da sua melhor amigo de infância?",
  "Qual é o modelo do seu primeiro carro?",
  "Qual é o nome da sua avó materna?",
  "Qual é o seu livro favorito?",
  "Qual é a sua comida favorita?",
  "Qual é o ano de formatura do seu ensino médio?",
];

const ForgotPasswordForm = ({ formAction, getQuestionAction }) => {
  const [state, formActionWithState, isPending] = useActionState(formAction, {
    status: null,
    message: "",
    securityQuestion: null,
  });

  const [questionState, questionFormAction] = useActionState(getQuestionAction, {
    status: null,
    message: "",
    securityQuestion: null,
  });

  const [username, setUsername] = useState("");
  const [showSecurityFields, setShowSecurityFields] = useState(false);
  const [isPendingQuestion, startTransition] = useTransition();

  useEffect(() => {
    if (questionState.status === "success" && questionState.securityQuestion) {
      setShowSecurityFields(true);
    }
  }, [questionState]);

  const handleGetQuestion = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    startTransition(() => {
      questionFormAction(formData);
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 flex items-center justify-center">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                <svg
                  className="w-6 h-6 text-amber-600 dark:text-amber-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Recuperar Senha
              </h2>
            </div>

            <form action={formActionWithState} onSubmit={showSecurityFields ? undefined : handleGetQuestion} className="space-y-5">
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Nome de Usuário
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600
                           bg-gray-50 dark:bg-gray-700
                           text-gray-800 dark:text-white
                           focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
                  placeholder="Digite seu nome de usuário"
                />
              </div>

              {showSecurityFields && (
                <>
                  <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-800">
                    <p className="text-sm font-medium text-amber-800 dark:text-amber-300">
                      Pergunta de Segurança:
                    </p>
                    <p className="text-amber-900 dark:text-amber-200 mt-1">
                      {questionState.securityQuestion}
                    </p>
                  </div>

                  <div>
                    <label
                      htmlFor="securityAnswer"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Resposta
                    </label>
                    <input
                      type="text"
                      id="securityAnswer"
                      name="securityAnswer"
                      required
                      className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600
                               bg-gray-50 dark:bg-gray-700
                               text-gray-800 dark:text-white
                               focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
                      placeholder="Digite sua resposta"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="newPassword"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Nova Senha
                    </label>
                    <input
                      type="password"
                      id="newPassword"
                      name="newPassword"
                      required
                      minLength={6}
                      className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600
                               bg-gray-50 dark:bg-gray-700
                               text-gray-800 dark:text-white
                               focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
                      placeholder="Digite sua nova senha (mínimo 6 caracteres)"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Confirmar Nova Senha
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      required
                      minLength={6}
                      className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600
                               bg-gray-50 dark:bg-gray-700
                               text-gray-800 dark:text-white
                               focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
                      placeholder="Confirme sua nova senha"
                    />
                  </div>
                </>
              )}

              {questionState.message && questionState.status === "error" && (
                <div className="p-3 rounded-lg text-sm bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400">
                  {questionState.message}
                </div>
              )}

              {state.message && (
                <div
                  className={`p-3 rounded-lg text-sm ${
                    state.status === "success"
                      ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                      : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
                  }`}
                >
                  {state.message}
                </div>
              )}

              <div className="flex gap-3 pt-2">
                {!showSecurityFields ? (
                  <>
                    <button
                      type="submit"
                      disabled={isPendingQuestion}
                      className="flex-1 bg-amber-600 hover:bg-amber-700 disabled:bg-amber-400 text-white font-semibold py-2.5 px-6 rounded-xl transition-colors"
                    >
                      {isPendingQuestion ? "Buscando..." : "Continuar"}
                    </button>
                    <a
                      href="/manage/auth"
                      className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2.5 px-6 rounded-xl transition-colors"
                    >
                      Voltar
                    </a>
                  </>
                ) : (
                  <>
                    <button
                      type="submit"
                      disabled={isPending}
                      className="flex-1 bg-amber-600 hover:bg-amber-700 disabled:bg-amber-400 text-white font-semibold py-2.5 px-6 rounded-xl transition-colors"
                    >
                      {isPending ? "Redefinindo..." : "Redefinir Senha"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowSecurityFields(false)}
                      className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2.5 px-6 rounded-xl transition-colors"
                    >
                      Voltar
                    </button>
                  </>
                )}
              </div>
            </form>

            <div className="mt-6 text-center">
              <a
                href="/manage/auth"
                className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                Voltar para o login
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
