import Image from "next/image" 
import styles from "./navbar.module.css"
import { FaSignOutAlt } from "react-icons/fa"
import { FaUserPlus } from "react-icons/fa"

interface NavbarProps {
    handleNewUserModal: () => void
  }

export default function Navbar({handleNewUserModal}: NavbarProps) {
  return (
    <div className={styles.navbar}>
      <div className={styles.itens}>
        <Image src="/assets/logo.png" alt="Impacta" width={150} height={30} />
        <div onClick={() => handleNewUserModal()}  className={styles.newuser}>
            <FaUserPlus />
            <span>Cadastrar usuário</span>
        </div>
      </div>

      <div className={styles.logout}>
        <FaSignOutAlt />
        <span>Sair</span>
      </div>
    </div>
  )
}
