"use client"
import Image from "next/image"
import styles from "./navbar.module.css"
import { FaSignOutAlt } from "react-icons/fa"
import { FaUserPlus, FaSearch } from "react-icons/fa"
import { MdAddBox } from "react-icons/md"
import { signOut } from "next-auth/react"
import { BiLogOut } from "react-icons/bi"
import { NavbarProps } from "./types"
import { useRouter } from "next/navigation"
import { useTranslations } from "next-intl"
import { useLocale } from "@/app/providers"
import ReactCountryFlag from "react-country-flag"

export default function Navbar({
  handleNewContactModal,
  search,
  setSearch,
  userName,
}: NavbarProps) {
  const t = useTranslations()
  const { locale, setLocale } = useLocale()

  const handleLanguageChange = (newLocale: string) => {
    setLocale(newLocale as "en" | "pt")
  }

  return (
    <div className={styles.navbar}>
      <div className={styles.leftContent}>
        <h1>
          contact<span style={{ color: "#0070f3" }}>.</span>me
        </h1>
        <button onClick={handleNewContactModal} className={styles.addBtn}>
          {t("contacts.add")} <MdAddBox />
        </button>
      </div>
      <div className={styles.rightContent}>
        <input
          type='text'
          placeholder={t("contacts.search")}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.searchInput}
        />
        <span className={styles.userName}>{userName}</span>
        <div className={styles.langButtons}>
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
        <button onClick={() => signOut()} className={styles.logoutBtn}>
          <BiLogOut />
        </button>
      </div>
    </div>
  )
}
