export interface Contact {
  _id: string
  name: string
  email: string
  tel: string
  createdBy: string
  createdAt: string
}

export type FormValues = {
  name: string
  email: string
  tel: string
  newName: string
  newEmail: string
  newTel: string
}

export interface AuthFormValues {
  name?: string
  email: string
  password: string
}

export interface User {
  id: string
  name: string
  email: string
}

export interface Session {
  user: User
  expires: string
}
