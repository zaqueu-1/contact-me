"use client"
import { useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { AuthFormValues } from "@/app/types"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import styles from "./login.module.css"
import { toast } from "react-toastify"
import { useTranslations } from "next-intl"
import LanguageSelector from "@/components/languageSelector"

export default function Login() {
  const router = useRouter()
  const t = useTranslations()
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit } = useForm<AuthFormValues>()

  const onSubmit: SubmitHandler<AuthFormValues> = async (data) => {
    try {
      setLoading(true)
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      })

      if (result?.error) {
        toast.error(t("messages.invalidCredentials"))
        return
      }

      router.push("/")
      router.refresh()
    } catch (error) {
      console.error(error)
      toast.error(t("messages.loginError"))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.container}>
      <LanguageSelector />
      <div className={styles.formContainer}>
        <h1>
          contact<span style={{ color: "#0070f3" }}>.</span>me
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
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
            {loading ? t("auth.loading") : t("auth.login")}
          </button>
        </form>
        <p>
          {t("auth.noAccount")}{" "}
          <Link href='/register'>{t("auth.register")}</Link>
        </p>
      </div>
    </div>
  )
}
