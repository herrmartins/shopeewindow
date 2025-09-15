"use client";

import { useEffect } from "react";

export default function VisitTracker() {
  useEffect(() => {
    const trackVisit = async () => {
      try {
        // Verificar se já foi contado hoje
        const today = new Date().toDateString();
        const lastVisit = localStorage.getItem('lastVisit');

        if (lastVisit !== today) {
          // Primeira visita do dia, contar
          await fetch("/api/counter");
          // Marcar como visitado hoje
          localStorage.setItem('lastVisit', today);
        }
        // Se já visitou hoje, não faz nada
      } catch (error) {
        console.error("Erro ao rastrear visita:", error);
      }
    };

    trackVisit();
  }, []);

  // Componente invisível, apenas para rastreamento
  return null;
}