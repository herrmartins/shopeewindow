import "./globals.css";
import Header from "./components/shared/Header";
import { ThemeProvider } from "next-themes";

export const metadata = {
  title: "MOSCAS'S Shop",
  keywords: "loja, vitrine, shopee, barato",
  description: "Mosca's Shop, preços acessíveis, aparelhos de última geração.",
  icons: {
    icon: [
      { url: '/favicon.png' },
      { url: '/favicon.png', type: 'image/png' },
    ],
    apple: [
      { url: '/favicon.png' },
    ],
  },
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
