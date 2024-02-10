import styles from "./contacts-panel.module.css"
import { FaUserTimes, FaUserEdit } from "react-icons/fa"
import { ContactsPanelProps } from "./types"
import { handleCreationDate, handleString, handleTel} from "@/app/utils/utils"
import { Contact } from "@/app/types"
import { useEffect, useState } from "react"
import Pagination from "@/components/pagination"

export default function ContactsPanel({ filteredContacts, handleDelete, handleEdit, search, openModal, openEdit }: ContactsPanelProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(5)

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredContacts.slice(indexOfFirstItem, indexOfLastItem)

  const handlePagination = (action: string) => {
    action == 'next' ? setCurrentPage(currentPage + 1) : setCurrentPage(currentPage - 1)
  }

  const handleDisableNext = () => {
    return indexOfLastItem >= filteredContacts.length
  }

  useEffect(() => {
    if (indexOfFirstItem === filteredContacts.length) {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1)
      }
    }
  },[filteredContacts, currentPage])

  return (
    <div className={styles.container}>
        <div className={styles.header}>
          <span>Nome</span>
          <span>E-mail</span>
          <span>Telefone</span>
          <span>Data de cadastro</span>
          <span>Ações</span>
        </div>
        <div className={styles.contacts}>
        {currentItems.map((contact:Contact) => (
            <div key={contact._id} className={styles.contact}>
            <span title={contact.name}>{handleString(contact.name)}</span>
            <span title={contact.email}>{handleString(contact.email)}</span>
            <span>{handleTel(contact.tel)}</span>
            <span>{handleCreationDate(contact.createdAt)}</span>
            <div className={styles.controls}>
                <button onClick={() => handleEdit(contact._id.toString())}><FaUserEdit /></button>
                <button onClick={() => handleDelete(contact._id.toString())}><FaUserTimes /></button>
            </div>
            </div>
        ))}
        {filteredContacts.length == 0 && (
            <div className={styles.noContacts}>
              <span>Nenhum contato encontrado</span>
            </div>
        )}
        </div>
        {(filteredContacts.length > 0 && search == '' && !openModal && !openEdit) && (
          <div className={styles.paginationContainer}>
            <Pagination currentPage={currentPage} handleDisableNext={handleDisableNext} handlePagination={handlePagination}/>
          </div>
        )}
    </div>
  )
}
