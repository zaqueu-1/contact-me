"use client"
import { useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { AuthFormValues } from "../types"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import styles from "./login.module.css"
import { toast } from "react-toastify"

export default function Login() {
  const router = useRouter()
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
        toast.error("Invalid credentials")
        return
      }

      router.push("/")
      router.refresh()
    } catch (error) {
      console.error(error)
      toast.error("Login error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1>contact<span style={{color:"#0070f3"}}>.</span>me</h1>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <input
            type='email'
            placeholder='E-mail'
            {...register("email", { required: true })}
          />
          <input
            type='password'
            placeholder='Password'
            {...register("password", { required: true })}
          />
          <button type='submit' disabled={loading}>
            {loading ? "Loading..." : "Log In"}
          </button>
        </form>
        <p>
          Don´t have an account? <Link href='/register'>Register</Link>
        </p>
      </div>
    </div>
  )
}
