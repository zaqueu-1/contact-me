"use client"
import ReactCountryFlag from "react-country-flag"
import { useLocale } from "@/app/providers"
import styles from "./language-selector.module.css"

interface LanguageSelectorProps {
  isNavbar?: boolean
}

export default function LanguageSelector({
  isNavbar = false,
}: LanguageSelectorProps) {
  const { locale, setLocale } = useLocale()

  const handleLanguageChange = (newLocale: string) => {
    setLocale(newLocale as "en" | "pt")
  }

  return (
    <div
      className={`${styles.langButtons} ${
        isNavbar ? styles.navbarPosition : ""
      }`}
    >
      <button
        className={`${styles.langButton} ${
          locale === "en" ? styles.active : ""
        }`}
        onClick={() => handleLanguageChange("en")}
        title='English'
      >
        <ReactCountryFlag countryCode='US' svg />
      </button>
      <button
        className={`${styles.langButton} ${
          locale === "pt" ? styles.active : ""
        }`}
        onClick={() => handleLanguageChange("pt")}
        title='Português'
      >
        <ReactCountryFlag countryCode='BR' svg />
      </button>
    </div>
  )
}
