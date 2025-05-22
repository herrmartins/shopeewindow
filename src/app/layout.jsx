import "./globals.css";
import CategoryBand from "./components/categories/CategoryBand";
import Header from "./components/shared/Header";

export const metadata = {
  title: "WEBTVBRAZIL Shop",
  keywords: "loja, shopee, barato",
  description:
    "A loja da webtvbrazil, preços acessíveis, aparelhos de última geração.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body>
        <Header />
        <CategoryBand />
        {children}
      </body>
    </html>
  );
}
