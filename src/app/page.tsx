'use client'
import styles from "./page.module.css"
import Navbar from "../components/navbar"
import ContactsPanel from "../components/contactsPanel"
import { useState, useEffect } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import axios from "axios"
import { FormValues, Contact } from "./types"
import { handleAddInputs, handleEditInputs, handleCreationDate, errorMsg } from "./utils/utils"
import { MdAddBox, MdModeEdit } from "react-icons/md"
import { AiFillCloseSquare } from "react-icons/ai"
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'


export default function Home() {
  const [openModal, setOpenModal] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [contacts, setContacts] = useState<Contact[]>([])
  const [contactToEdit, setContactToEdit] = useState('')
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const {register, handleSubmit} = useForm<FormValues>()

  useEffect(() => {
    loadContacts()
  }, [])

  useEffect(() => {
  }, [contactToEdit])

  const loadContacts = async () => {
    try {
      const res = await axios.get(`api/contacts`)
      setLoading(false)
      setContacts(res.data)
      setOpenModal(false)
      setOpenEdit(false)
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
        email: !data.email ? '-' : data.email,
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
        newEmail: !data.newEmail ? '-' : data.newEmail,
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

  const filteredContacts = contacts.filter((contact: Contact) => {
    const searchText = search.toLowerCase()

    return (
      contact.name.toLowerCase().includes(searchText) ||
      contact.email.toLowerCase().includes(searchText) ||
      handleCreationDate(contact.createdAt).includes(searchText)
    )
  })

  const handleNewContactModal = () => {
    setOpenModal(!openModal)
    openEdit == true ? setOpenEdit(false) : null
  }

  const handleEdit = (id: string) => {
    setContactToEdit(id)
    setOpenEdit(!openEdit)
    openModal == true ? setOpenModal(false) : null
  }

  const handleError = () => {
    toast.error(errorMsg)
  }

  return (
    <main className={styles.main}>
      {openModal || openEdit ? <div className={styles.modalBackdrop} /> : null}
      <Navbar handleNewContactModal={handleNewContactModal} search={search} setSearch={setSearch}/>
      {openModal && (
        <div className={styles.modalAdd}>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.inputs}>
            <input type="text" placeholder="Nome" {...register("name")} />
            <input type="text" placeholder="E-mail" {...register("email")} />
            <input type="number" placeholder="Telefone" {...register("tel")} />
            <button type="submit" value="submit" className={styles.addContactBtn} ><MdAddBox /></button>
            <button onClick={() => handleNewContactModal()} className={styles.closeModalBtn} ><AiFillCloseSquare /></button>
          </form>
        </div>
      )}
      {openEdit && (
        <div className={styles.modalEdit}>
          <form onSubmit={handleSubmit(onEdit)} className={styles.inputs}>
            <input type="text" placeholder="Nome" {...register("newName")} />
            <input type="text" placeholder="E-mail" {...register("newEmail")} />
            <input type="number" placeholder="Telefone" {...register("newTel")} />
            <button type="submit" value="submit"className={styles.editContactBtn} ><MdModeEdit /></button>
            <button onClick={() => handleEdit('')} className={styles.closeModalBtn} ><AiFillCloseSquare /></button>
          </form>
        </div>
      )}
      <ContactsPanel loading={loading} handleDelete={handleDelete} handleEdit={handleEdit} search={search} filteredContacts={filteredContacts} openModal={openModal} openEdit={openEdit}/>
    </main>
  )
}
