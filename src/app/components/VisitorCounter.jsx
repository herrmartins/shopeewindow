"use client";

import { useEffect, useState } from "react";

export default function VisitorCounter() {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCounter = async () => {
      try {
        // Verificar se já foi contado hoje
        const today = new Date().toDateString();
        const lastVisit = localStorage.getItem('lastVisit');

        if (lastVisit !== today) {
          // Primeira visita do dia, contar
          const response = await fetch("/api/counter");
          const data = await response.json();
          setCount(data.count);
          // Marcar como visitado hoje
          localStorage.setItem('lastVisit', today);
        } else {
          // Já visitou hoje, apenas buscar o contador atual
          const response = await fetch("/api/counter?getOnly=true");
          const data = await response.json();
          setCount(data.count);
        }
      } catch (error) {
        console.error("Erro ao buscar contador:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCounter();
  }, []);

  if (loading) {
    return <div className="text-center py-4">Carregando contador...</div>;
  }

  return (
    <div className="text-center py-4">
      <p className="text-lg font-semibold">Visitantes únicos hoje: {count}</p>
    </div>
  );
}