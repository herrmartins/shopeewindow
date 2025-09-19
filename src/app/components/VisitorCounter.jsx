"use client";
 
import { useEffect, useState } from "react";
 
export default function VisitorCounter() {
  const [totalCount, setTotalCount] = useState(0);
  const [dailyCount, setDailyCount] = useState(0);
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
    const fetchCounter = async () => {
      try {
        const today = new Date().toDateString();
        const lastVisit = localStorage.getItem('lastVisit');
 
        if (lastVisit !== today) {
          const response = await fetch("/api/counter");
          const data = await response.json();
          setTotalCount(data.count ?? 0);
          setDailyCount(data.dailyCount ?? 0);
          localStorage.setItem('lastVisit', today);
        } else {
          const response = await fetch("/api/counter?getOnly=true");
          const data = await response.json();
          setTotalCount(data.count ?? 0);
          setDailyCount(data.dailyCount ?? 0);
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
      <p className="text-lg font-semibold">Visitantes únicos: {totalCount}</p>
      <p className="text-lg font-semibold">Visitantes hoje: {dailyCount}</p>
    </div>
  );
}