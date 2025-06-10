import "./globals.css";
import Header from "./components/shared/Header";
import { ThemeContextProvider } from "./context/ThemeContext";
import Script from "next/script";

export const metadata = {
  title: "MOSCAS'S Shop",
  keywords: "loja, vitrine, shopee, barato",
  description: "Mosca's Shop, preços acessíveis, aparelhos de última geração.",
};

export default async function RootLayout({ children }) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <head>
        <Script
          id="theme-script"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                try {
                  const theme = localStorage.getItem('theme');
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body>
        <ThemeContextProvider>
          <Header />
          {children}
        </ThemeContextProvider>
      </body>
    </html>
  );
}