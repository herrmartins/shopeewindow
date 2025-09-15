"use client";

import { useEffect, useState } from "react";

export default function VisitorCounter() {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCounter = async () => {
      try {
        const response = await fetch("/api/counter");
        const data = await response.json();
        setCount(data.count);
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
      <p className="text-lg font-semibold">Visitantes: {count}</p>
    </div>
  );
}