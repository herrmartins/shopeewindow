import "./globals.css";
import Header from "./components/shared/Header";
import { ThemeProvider } from "next-themes";

export const metadata = {
  title: "MOSCAS'S Shop",
  keywords: "loja, vitrine, shopee, barato",
  description: "Mosca's Shop, preços acessíveis, aparelhos de última geração.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
