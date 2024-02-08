import styles from "./contacts-panel.module.css"
import { FaUserTimes, FaUserEdit } from "react-icons/fa"
import { ContactsPanelProps } from "./types"
import { handleCreationDate, handleString, handleTel} from "@/app/utils/utils"
import { Contact } from "@/app/types"
import { useState } from "react"

export default function ContactsPanel({contacts, handleDelete, handleEdit, openSearch}: ContactsPanelProps) {
  const [search, setSearch] = useState('')

  const handleSearch = (value: string) => {
    setSearch(value)
  }

  const filteredContacts = contacts.filter((contact: Contact) => {
    const searchText = search.toLowerCase()

    return (
      contact.name.toLowerCase().includes(searchText) ||
      contact.email.toLowerCase().includes(searchText) ||
      handleCreationDate(contact.createdAt).includes(searchText)
    )
  })

  return (
    <div className={styles.container}>
        {openSearch && (
          <div className={styles.advancedSearch}>
            <span>Busca Avançada:</span>
            <input type="text" value={search} placeholder="Pesquisar..." onChange={(e) => setSearch(e.target.value)}/>
          </div>
        )}
        <div className={styles.header}>
          <span>Nome</span>
          <span>E-mail</span>
          <span>Telefone</span>
          <span>Data de cadastro</span>
          <span>Ações</span>
        </div>
        <div className={styles.contacts}>
        {filteredContacts.map((contact:Contact) => (
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
        {filteredContacts.length === 0 && (
            <div className={styles.noContacts}>
              <span>Nenhum contato encontrado</span>
            </div>
        )}
        </div>
    </div>
  )
}
