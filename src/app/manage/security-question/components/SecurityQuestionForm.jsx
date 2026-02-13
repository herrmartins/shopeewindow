"use client";

import { useActionState } from "react";

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

const SecurityQuestionForm = ({ formAction }) => {
  const [state, formActionWithState, isPending] = useActionState(formAction, {
    status: null,
    message: "",
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 flex items-center justify-center">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <svg
                  className="w-6 h-6 text-purple-600 dark:text-purple-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Configurar Pergunta de Segurança
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Isso ajudará você a recuperar sua conta caso esqueça a senha
                </p>
              </div>
            </div>

            <form action={formActionWithState} className="space-y-5">
              <div>
                <label
                  htmlFor="securityQuestion"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Pergunta de Segurança
                </label>
                <select
                  id="securityQuestion"
                  name="securityQuestion"
                  required
                  className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600
                           bg-gray-50 dark:bg-gray-700
                           text-gray-800 dark:text-white
                           focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
                >
                  <option value="">Selecione uma pergunta...</option>
                  {SECURITY_QUESTIONS.map((question, index) => (
                    <option key={index} value={question}>
                      {question}
                    </option>
                  ))}
                  <option value="custom">Outra (digite abaixo)</option>
                </select>
                <input
                  type="text"
                  name="securityQuestionCustom"
                  className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600
                           bg-gray-50 dark:bg-gray-700
                           text-gray-800 dark:text-white
                           focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition mt-2"
                  placeholder="Digite sua própria pergunta"
                />
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
                           focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
                  placeholder="Digite sua resposta (lembre-se bem!)"
                />
              </div>

              <div>
                <label
                  htmlFor="confirmAnswer"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Confirmar Resposta
                </label>
                <input
                  type="text"
                  id="confirmAnswer"
                  name="confirmAnswer"
                  required
                  className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600
                           bg-gray-50 dark:bg-gray-700
                           text-gray-800 dark:text-white
                           focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
                  placeholder="Confirme sua resposta"
                />
              </div>

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
                <button
                  type="submit"
                  disabled={isPending}
                  className="flex-1 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white font-semibold py-2.5 px-6 rounded-xl transition-colors"
                >
                  {isPending ? "Salvando..." : "Salvar Pergunta"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityQuestionForm;
