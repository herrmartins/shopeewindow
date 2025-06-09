import "./globals.css";
import Header from "./components/shared/Header";
import { ThemeContextProvider } from "./context/ThemeContext";

export const metadata = {
  title: "MOSCAS'S Shop",
  keywords: "loja, vitrine, shopee, barato",
  description:
    "Mosca's Shop, preços acessíveis, aparelhos de última geração.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body>
        <ThemeContextProvider>
          <Header />
          {children}
        </ThemeContextProvider>
      </body>
    </html>
  );
}
