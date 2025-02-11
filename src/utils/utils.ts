import { FormValues } from "@/app/types"

export const handleAddInputs = (data: FormValues) => {
  if (!data.name || !data.tel) {
    return false
  }
  return true
}

export const handleEditInputs = (data: FormValues) => {
  if (!data.newName || !data.newTel) {
    return false
  }
  return true
}

export const handleCreationDate = (date: string) => {
  const newDate = new Date(date)
  return newDate.toLocaleDateString()
}

export const handleString = (str: string) => {
  if (str.length > 20) {
    return str.substring(0, 20) + "..."
  }
  return str
}

export const handleTel = (tel: string) => {
  return tel.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3")
}

export const errorMsg = (msg: string) => {
  return msg
}
