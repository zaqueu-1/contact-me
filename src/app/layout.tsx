import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { SkeletonTheme } from 'react-loading-skeleton'

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Impacta Lawtech",
  description: "Soluções tecnológicas ágeis, eficientes e integradas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SkeletonTheme>
          <ToastContainer theme='light' autoClose={1200} />
            {children}
        </SkeletonTheme>
      </body>
    </html>
  );
}
