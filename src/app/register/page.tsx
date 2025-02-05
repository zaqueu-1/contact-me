"use client"
import { useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { AuthFormValues } from "../types"
import { useRouter } from "next/navigation"
import Link from "next/link"
import styles from "../login/login.module.css"
import { toast } from "react-toastify"
import axios from "axios"

export default function Register() {
  const router = useRouter()
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

      toast.success("Account created succesfully!")
      router.push("/login")
    } catch (error: any) {
      console.error(error)
      toast.error(error.response?.data?.message || "Error creating account!")
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
            type='text'
            placeholder='Name'
            {...register("name", { required: true })}
          />
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
            {loading ? "Loading..." : "Register"}
          </button>
        </form>
        <p>
          Already have an account? <Link href='/login'>Login here</Link>
        </p>
      </div>
    </div>
  )
}
