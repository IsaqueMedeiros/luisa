import { Poppins } from "next/font/google"
import "./globals.css"
import { Analytics } from "@vercel/analytics/react"

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

export const metadata = {
  title: "Filmes da Lulu",
  description: "Em desenvolvimento!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" cz-shortcut-listen="true">
      <body className={poppins.className} suppressHydrationWarning={true}>
        <Analytics />
        <main className="min-h-screen bg-white">{children}</main>
      </body>
    </html>
  )
}
