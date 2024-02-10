import Image from "next/image" 
import styles from "./navbar.module.css"
import { FaSignOutAlt } from "react-icons/fa"
import { FaUserPlus, FaSearch } from "react-icons/fa"
import { NavbarProps } from "./types"

export default function Navbar({handleNewContactModal, search, setSearch}: NavbarProps) {
  return (
    <div className={styles.navbar}>
      <div className={styles.itens}>
        <Image src="/assets/logo.png" alt="Impacta" width={150} height={30} />
        <div onClick={() => handleNewContactModal()}  className={styles.newContact}>
            <FaUserPlus />
        </div>
        <div className={styles.advancedSearch}>
          <FaSearch style={{fontSize:'1.2rem'}} />
          <input type="text" value={search} placeholder="Pesquisar..." onChange={(e) => setSearch(e.target.value)}/>
        </div>
      </div>

      <div className={styles.logout}>
        <FaSignOutAlt />
        <span>Sair</span>
      </div>
    </div>
  )
}
