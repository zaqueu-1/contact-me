"use client"
import { useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { AuthFormValues } from "@/app/types"
import { useRouter } from "next/navigation"
import Link from "next/link"
import styles from "../login/login.module.css"
import { toast } from "react-toastify"
import axios from "axios"
import { useTranslations } from "next-intl"

export default function Register() {
  const router = useRouter()
  const t = useTranslations()
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit } = useForm<AuthFormValues>()

  const onSubmit: SubmitHandler<AuthFormValues> = async (data) => {
    try {
      setLoading(true)
      await axios.post("/api/auth/register", {
        name: data.name,
        email: data.email,
        password: data.password,
      })

      toast.success(t("messages.userCreated"))
      router.push("/login")
    } catch (error: any) {
      console.error(error)
      toast.error(
        error.response?.data?.message || t("messages.userCreateError"),
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1>
          contact<span style={{ color: "#0070f3" }}>.</span>me
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <input
            type='text'
            placeholder={t("auth.name")}
            {...register("name", { required: true })}
          />
          <input
            type='email'
            placeholder={t("auth.email")}
            {...register("email", { required: true })}
          />
          <input
            type='password'
            placeholder={t("auth.password")}
            {...register("password", { required: true })}
          />
          <button type='submit' disabled={loading}>
            {loading ? t("auth.loading") : t("auth.register")}
          </button>
        </form>
        <p>
          {t("auth.hasAccount")}{" "}
          <Link href='/login'>{t("auth.loginHere")}</Link>
        </p>
      </div>
    </div>
  )
}
