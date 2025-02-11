"use client"
import styles from "./page.module.css"
import Navbar from "@/components/navbar"
import ContactsPanel from "@/components/contactsPanel"
import { useState, useEffect } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import axios from "axios"
import { FormValues, Contact } from "@/app/types"
import {
  handleAddInputs,
  handleEditInputs,
  handleCreationDate,
  errorMsg,
} from "@/utils/utils"
import { MdAddBox, MdModeEdit } from "react-icons/md"
import { AiFillCloseSquare } from "react-icons/ai"
import { toast } from "react-toastify"
import Swal from "sweetalert2"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useTranslations } from "next-intl"
import { useLocale } from "./providers"

export default function Home() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const t = useTranslations()
  const { locale } = useLocale()
  const [openModal, setOpenModal] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [contacts, setContacts] = useState<Contact[]>([])
  const [contactToEdit, setContactToEdit] = useState("")
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)
  const { register, handleSubmit, reset } = useForm<FormValues>()

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
    } else if (status === "authenticated") {
      loadContacts()
    }
  }, [status])

  const loadContacts = async () => {
    try {
      const res = await axios.get(`/api/contacts`)
      setLoading(false)
      setContacts(res.data)
      setOpenModal(false)
      setOpenEdit(false)
    } catch (error) {
      console.error(error)
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        router.push("/login")
      }
    }
  }

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (!handleAddInputs(data)) {
      handleError()
      return
    }

    try {
      await axios.post(`/api/contacts`, {
        name: data.name,
        email: !data.email ? "-" : data.email,
        tel: data.tel,
      })
      loadContacts()
      toast.success(t("messages.contactAdded"))
      reset()
    } catch (error) {
      console.error(error)
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        router.push("/login")
      }
    }
  }

  const onEdit: SubmitHandler<FormValues> = async (data) => {
    if (!handleEditInputs(data)) {
      handleError()
      return
    }

    try {
      const id = contactToEdit
      await axios.put(`/api/contacts/${id}`, {
        newName: data.newName,
        newEmail: !data.newEmail ? "-" : data.newEmail,
        newTel: data.newTel,
      })
      loadContacts()
      toast.success(t("messages.contactEdited"))
      reset()
    } catch (error) {
      console.error(error)
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        router.push("/login")
      }
    }
  }

  const onDelete = async (id: string) => {
    try {
      await axios.delete(`/api/contacts/${id}`)
      loadContacts()
      toast.success(t("messages.contactDeleted"))
    } catch (error) {
      console.error(error)
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        router.push("/login")
      }
    }
  }

  const handleDelete = async (id: string) => {
    Swal.fire({
      title: t("contacts.confirmDelete"),
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: t("contacts.yes"),
      denyButtonText: t("contacts.no"),
    }).then((result: any) => {
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
    reset()
  }

  const handleEdit = (id: string) => {
    setContactToEdit(id)
    setOpenEdit(!openEdit)
    openModal == true ? setOpenModal(false) : null

    const contactToEdit = contacts.find((contact) => contact._id === id)
    if (contactToEdit) {
      reset({
        newName: contactToEdit.name,
        newEmail: contactToEdit.email === "-" ? "" : contactToEdit.email,
        newTel: contactToEdit.tel,
      })
    }
  }

  const handleError = () => {
    toast.error(t("messages.error"))
  }

  if (status === "loading" || status === "unauthenticated") {
    return null
  }

  return (
    <main className={styles.main}>
      {openModal || openEdit ? <div className={styles.modalBackdrop} /> : null}
      <Navbar
        handleNewContactModal={handleNewContactModal}
        search={search}
        setSearch={setSearch}
        userName={session?.user?.name || ""}
      />
      {openModal && (
        <div className={styles.modalAdd}>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.inputs}>
            <input
              type='text'
              placeholder={t("contacts.name")}
              {...register("name")}
            />
            <input
              type='text'
              placeholder={t("contacts.email")}
              {...register("email")}
            />
            <input
              type='number'
              placeholder={t("contacts.telephone")}
              {...register("tel")}
            />
            <button
              type='submit'
              value='submit'
              className={styles.addContactBtn}
            >
              {t("contacts.add")} <MdAddBox />
            </button>
            <button
              onClick={() => handleNewContactModal()}
              className={styles.closeModalBtn}
            >
              <AiFillCloseSquare />
            </button>
          </form>
        </div>
      )}
      {openEdit && (
        <div className={styles.modalEdit}>
          <form onSubmit={handleSubmit(onEdit)} className={styles.inputs}>
            <input
              type='text'
              placeholder={t("contacts.name")}
              {...register("newName")}
            />
            <input
              type='text'
              placeholder={t("contacts.email")}
              {...register("newEmail")}
            />
            <input
              type='number'
              placeholder={t("contacts.telephone")}
              {...register("newTel")}
            />
            <button
              type='submit'
              value='submit'
              className={styles.editContactBtn}
            >
              {t("contacts.edit")} <MdModeEdit />
            </button>
            <button
              onClick={() => handleEdit("")}
              className={styles.closeModalBtn}
            >
              <AiFillCloseSquare />
            </button>
          </form>
        </div>
      )}
      <ContactsPanel
        loading={loading}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        search={search}
        filteredContacts={filteredContacts}
        openModal={openModal}
        openEdit={openEdit}
      />
    </main>
  )
}
