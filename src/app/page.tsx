'use client'
import styles from "./page.module.css"
import Navbar from "../components/navbar"
import ContactsPanel from "../components/contactsPanel"
import { useState, useEffect } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import axios from "axios"
import { FormValues, Contact } from "./types"


export default function Home() {
  const [openModal, setOpenModal] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [openSearch, setOpenSearch] = useState(false)
  const [contacts, setContacts] = useState<Contact[]>([])
  const [contactToEdit, setContactToEdit] = useState('')
  const {register, handleSubmit} = useForm<FormValues>()

  const loadContacts = async () => {
    try {
      const res = await axios.get(`api/contacts`)
      setContacts(res.data)
      setOpenModal(false)
      setOpenEdit(false)
      openSearch == true ? setOpenSearch(true) : null
    } catch (error) {
        console.error(error)
    }
  }

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const res = await axios.post(`api/contacts`, {
        name: data.name,
        email: data.email,
        tel: data.tel,
        createdBy: 'nouser',
      })
      loadContacts()
    } catch (error) {
      console.error(error)
    }
  }

  const onEdit: SubmitHandler<FormValues> = async (data) => {
    try {
      const id = contactToEdit
      const res = await axios.put(`api/contacts/${id}`,{
        newName: data.newName,
        newEmail: data.newEmail,
        newTel: data.newTel,
      })
      loadContacts()
    } catch (error) {
      console.error(error)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const res = await axios.delete(`api/contacts/${id}`)
      loadContacts()
    } catch (error) {
      console.error(error)
    }
  }

  const handleNewContactModal = () => {
    setOpenModal(!openModal)
  }

  const handleSearchModal = () => {
    setOpenSearch(!openSearch)
  }

  const handleEdit = (id: string) => {
    setContactToEdit(id)
    setOpenEdit(!openEdit)
  }

  useEffect(() => {
    loadContacts()
  }, [])

  useEffect(() => {
  }, [contactToEdit])

  return (
    <main className={styles.main}>
      <Navbar handleNewContactModal={handleNewContactModal} handleSearchModal={handleSearchModal}/>
      {openModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.inputs}>
              <input type="text" placeholder="Nome" {...register("name")} />
              <input type="text" placeholder="E-mail" {...register("email")} />
              <input type="text" placeholder="Telefone" {...register("tel")} />
              <button type="submit" value="submit" className={styles.addContactBtn} >Cadastrar</button>
            </form>
          </div>
        </div>
      )}
      {openEdit && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <form onSubmit={handleSubmit(onEdit)} className={styles.inputs}>
              <input type="text" placeholder="Nome" {...register("newName")} />
              <input type="text" placeholder="E-mail" {...register("newEmail")} />
              <input type="text" placeholder="Telefone" {...register("newTel")} />
              <button type="submit" value="submit"className={styles.editContactBtn} >Editar</button>
            </form>
          </div>
        </div>
      )}
      <ContactsPanel handleDelete={handleDelete} handleEdit={handleEdit} contacts={contacts} openSearch={openSearch}/>
    </main>
  )
}
