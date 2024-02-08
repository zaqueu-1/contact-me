'use client'
import styles from "./page.module.css"
import Navbar from "../components/navbar"
import ContactsPanel from "../components/contactsPanel"
import { useState, useEffect } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import axios from "axios"
import { FormValues, Contact } from "./types"
import { handleAddInputs, handleEditInputs, errorMsg } from "./utils/utils"
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'


export default function Home() {
  const [openModal, setOpenModal] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [openSearch, setOpenSearch] = useState(false)
  const [contacts, setContacts] = useState<Contact[]>([])
  const [contactToEdit, setContactToEdit] = useState('')
  const {register, handleSubmit} = useForm<FormValues>()

  useEffect(() => {
    loadContacts()
  }, [])

  useEffect(() => {
  }, [contactToEdit])

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
    if (!handleAddInputs(data)) {
      handleError()
      return
    }

    try {
      const res = await axios.post(`api/contacts`, {
        name: data.name,
        email: data.email,
        tel: data.tel,
        createdBy: 'nouser',
      })
      loadContacts()
      toast.success('Contato adicionado!')
    } catch (error) {
      console.error(error)
    }
  }

  const onEdit: SubmitHandler<FormValues> = async (data) => {
    if (!handleEditInputs(data)) {
      handleError()
      return
    }

    try {
      const id = contactToEdit
      const res = await axios.put(`api/contacts/${id}`,{
        newName: data.newName,
        newEmail: data.newEmail,
        newTel: data.newTel,
      })
      loadContacts()
      toast.success('Contato editado!')
    } catch (error) {
      console.error(error)
    }
  }

  const onDelete = async (id: string) => {
    try {
      const res = await axios.delete(`api/contacts/${id}`)
      loadContacts()
      toast.success('Contato deletado!')
    } catch (error) {
      console.error(error)
    }
  }

  const handleDelete = async (id: string) => {
    Swal.fire({
      title: "Deseja mesmo deletar?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Sim",
      denyButtonText: `Não`,
    }).then((result:any) => {
      if (result.isConfirmed) {
        onDelete(id)
      } else if (result.isDenied) {
        return
      }
    })
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

  const handleError = () => {
    toast.error(errorMsg)
  }

  return (
    <main className={styles.main}>
      <Navbar handleNewContactModal={handleNewContactModal} handleSearchModal={handleSearchModal}/>
      {openModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.inputs}>
              <input type="text" placeholder="Nome" {...register("name")} />
              <input type="text" placeholder="E-mail" {...register("email")} />
              <input type="number" placeholder="Telefone" {...register("tel")} />
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
              <input type="number" placeholder="Telefone" {...register("newTel")} />
              <button type="submit" value="submit"className={styles.editContactBtn} >Editar</button>
            </form>
          </div>
        </div>
      )}
      <ContactsPanel handleDelete={handleDelete} handleEdit={handleEdit} contacts={contacts} openSearch={openSearch}/>
    </main>
  )
}
