'use client'
import Image from "next/image"
import styles from "./page.module.css"
import Navbar from "../components/Navbar"
import { useState, useEffect } from "react"
import { FaUserEdit } from "react-icons/fa"
import { FaUserTimes } from "react-icons/fa"
import { useForm } from "react-hook-form"
import axios from "axios"

interface Contact {
  _id: number
  name: string
  email: string
  tel: string
  createdBy: string
  createdAt: string
}

export default function Home() {
  const [openModal, setOpenModal] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [contacts, setContacts] = useState([])
  const [contactToEdit, setContactToEdit] = useState('')
  const {register, handleSubmit} = useForm()

  const loadUsers = async () => {
    await axios.get("http://localhost:3000/api/contacts").then((response) => {
      setContacts(response.data)
      setOpenModal(false)
      setOpenEdit(false)
    })
  }

  const handleNewContactModal = () => {
    setOpenModal(!openModal)
  }

  const onSubmit = async (e, type: string) => {
      if (type === 'submit') {
      await axios.post("http://localhost:3000/api/contacts", {
        name: e.name,
        email: e.email,
        tel: e.tel,
        createdBy: 'nouser',
      }).then((res) => {
        res ? loadUsers() : console.log('error')
      })
    } 

    if (type === 'edit') {
      await axios.put(`http://localhost:3000/api/contacts/${contactToEdit}`, {
        newName: e.newName,
        newEmail: e.newEmail,
        newTel: e.newTel,
      }).then((res) => {
        res ? loadUsers() : console.log('error')
      })
    }
  }

  const handleEdit = (id: string) => {
    setContactToEdit(id)
    setOpenEdit(!openEdit)
  }

  const handleCreationDate = (date: string) => {
    const newDate = new Date(date)
    return newDate.toLocaleDateString()
  }

  const handleDelete = async (id: string) => {
    await axios.delete(`http://localhost:3000/api/contacts/${id}`).then((res) => {
      res ? loadUsers() : console.log('error')
    })
  }

  useEffect(() => {
    loadUsers()
  }, [])

  useEffect(() => {
  }, [contactToEdit])

  return (
    <main className={styles.main}>
      <Navbar handleNewContactModal={handleNewContactModal}/>
      {openModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <form onSubmit={handleSubmit((e) => onSubmit(e, 'submit'))} className={styles.inputs}>
              <input type="text" placeholder="Nome" {...register("name")} />
              <input type="text" placeholder="E-mail" {...register("email")} />
              <input type="text" placeholder="Telefone" {...register("tel")} />
              <button type="submit" value="submit" >Cadastrar</button>
            </form>
          </div>
        </div>
      )}
      {openEdit && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <form onSubmit={handleSubmit((e) => onSubmit(e,'edit'))} className={styles.inputs}>
              <input type="text" placeholder="Nome" {...register("newName")} />
              <input type="text" placeholder="E-mail" {...register("newEmail")} />
              <input type="text" placeholder="Telefone" {...register("newTel")} />
              <button type="submit" value="submit" >Editar</button>
            </form>
          </div>
        </div>
      )}
      <div className={styles.container}>
        <div className={styles.header}>
          <span>Código</span>
          <span>Nome</span>
          <span>E-mail</span>
          <span>Telefone</span>
          <span>Data de cadastro</span>
          <span>Ações</span>
        </div>
        <div className={styles.contacts}>
          {contacts.map((contact:Contact, index) => (
            <div key={contact._id} className={styles.contact}>
              <span>{contact._id}</span>
              <span>{contact.name}</span>
              <span>{contact.email}</span>
              <span>{contact.tel}</span>
              <span>{handleCreationDate(contact.createdAt)}</span>
              <div className={styles.controls}>
                <button onClick={() => handleEdit(contact._id)}><FaUserEdit /></button>
                <button onClick={() => handleDelete(contact._id)}><FaUserTimes /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
