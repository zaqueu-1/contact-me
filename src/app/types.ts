export interface Contact {
    _id: number
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