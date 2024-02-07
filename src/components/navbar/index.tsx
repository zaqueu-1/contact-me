import Image from "next/image" 
import styles from "./navbar.module.css"
import { FaSignOutAlt } from "react-icons/fa"
import { FaUserPlus, FaSearch } from "react-icons/fa"
import { NavbarProps } from "./types"

export default function Navbar({handleNewContactModal,handleSearchModal}: NavbarProps) {
  return (
    <div className={styles.navbar}>
      <div className={styles.itens}>
        <Image src="/assets/logo.png" alt="Impacta" width={150} height={30} />
        <div onClick={() => handleNewContactModal()}  className={styles.newContact}>
            <FaUserPlus />
        </div>
        <div onClick={() => handleSearchModal()}  className={styles.openSearch}>
            <FaSearch style={{fontSize:'1.2rem'}} />
        </div>
      </div>

      <div className={styles.logout}>
        <FaSignOutAlt />
        <span>Sair</span>
      </div>
    </div>
  )
}
