'use client'
import Image from "next/image"
import styles from "./page.module.css"
import Navbar from "../components/Navbar"
import { useState, useEffect } from "react"
import { FaUserEdit } from "react-icons/fa"
import { FaUserTimes } from "react-icons/fa"

export default function Home() {
  const [openModal, setOpenModal] = useState(false)

  const handleNewContactModal = () => {
    setOpenModal(!openModal)
  }

  const users = [
    {
      id: 13814019709,
      name: "João da Silva",
      email: "j.silva@hotmail.com",
      tel: "(11) 99999-9999",
      createdAt: "01/01/2021",
    },
    {
      id: 13814019709,
      name: "João da Silva",
      email: "j.silva@hotmail.com",
      tel: "(11) 99999-9999",
      createdAt: "01/01/2021",
    },
    {
      id: 13814019709,
      name: "João da Silva",
      email: "j.silva@hotmail.com",
      tel: "(11) 99999-9999",
      createdAt: "01/01/2021",
    },
  ]

  return (
    <main className={styles.main}>
      <Navbar handleNewContactModal={handleNewContactModal}/>
      {openModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <div className={styles.inputs}>
              <input type="text" placeholder="Nome" />
              <input type="text" placeholder="E-mail" />
              <input type="text" placeholder="Telefone" />
              <button>Cadastrar</button>
            </div>
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
          {users.map((user, index) => (
            <div className={styles.contact}>
              <span>{user.id}</span>
              <span>{user.name}</span>
              <span>{user.email}</span>
              <span>{user.tel}</span>
              <span>{user.createdAt}</span>
              <div className={styles.controls}>
                <button><FaUserEdit /></button>
                <button><FaUserTimes /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
