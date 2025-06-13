"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeIndicator() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <p className="text-sm text-center">
        Current theme: <span className="font-bold">{resolvedTheme}</span>
      </p>
    </>
  );
}
