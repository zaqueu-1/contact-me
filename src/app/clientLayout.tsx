"use client"
import { SessionProvider } from "next-auth/react"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { SkeletonTheme } from "react-loading-skeleton"

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SessionProvider>
      <SkeletonTheme>
        <ToastContainer theme='light' autoClose={1200} />
        {children}
      </SkeletonTheme>
    </SessionProvider>
  )
}
