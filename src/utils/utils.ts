import { FormValues } from "@/types"

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

export const errorMsg = (msg: string) => {
  return msg
}
