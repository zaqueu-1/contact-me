"use client"

import { NextIntlClientProvider } from "next-intl"
import { createContext, useContext, useEffect, useState } from "react"
import { SessionProvider } from "next-auth/react"
import { ToastContainer } from "react-toastify"
import { SkeletonTheme } from "react-loading-skeleton"
import "react-toastify/dist/ReactToastify.css"
import "react-loading-skeleton/dist/skeleton.css"

const LOCALES = ["en", "pt"] as const
type Locale = (typeof LOCALES)[number]

interface LocaleContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined)

export function useLocale() {
  const context = useContext(LocaleContext)
  if (!context) {
    throw new Error("useLocale must be used within a LocaleProvider")
  }
  return context
}

function getInitialLocale(): Locale {
  if (typeof window === "undefined") return "en"
  const savedLocale = localStorage.getItem("locale") as Locale
  return LOCALES.includes(savedLocale) ? savedLocale : "en"
}

export default function Providers({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(getInitialLocale)
  const [messages, setMessages] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadAndSetMessages = async () => {
      try {
        const newMessages = await import(`../messages/${locale}.json`)
        setMessages(newMessages.default)
      } catch (error) {
        const defaultMessages = await import(`../messages/en.json`)
        setMessages(defaultMessages.default)
      } finally {
        setIsLoading(false)
      }
    }

    loadAndSetMessages()
    localStorage.setItem("locale", locale)
  }, [locale])

  const setLocale = (newLocale: Locale) => {
    if (LOCALES.includes(newLocale)) {
      setLocaleState(newLocale)
      localStorage.setItem("locale", newLocale)
    }
  }

  if (isLoading) {
    return null // ou um componente de loading
  }

  return (
    <SessionProvider>
      <LocaleContext.Provider value={{ locale, setLocale }}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <SkeletonTheme baseColor='#202020' highlightColor='#444'>
            {children}
            <ToastContainer
              position='top-right'
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme='dark'
            />
          </SkeletonTheme>
        </NextIntlClientProvider>
      </LocaleContext.Provider>
    </SessionProvider>
  )
}
