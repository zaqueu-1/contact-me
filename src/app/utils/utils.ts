import { FormValues } from '../types'

export const handleCreationDate = (date: string) => {
    const newDate = new Date(date)
    return newDate.toLocaleDateString()
}

export const handleString = (string: string) => {
    return string.length >= 30 ? string.substring(0,30)+'...' : string
}

export const handleTel = (tel: string) => {
    return tel.length === 11 ? tel.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3') : tel.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3')
}

export let errorMsg: string = "Preencha todos os campos!"

export const handleAddInputs = (data: FormValues) => {
    if (!data.name || !data.email || !data.tel) {
        errorMsg = "Preencha todos os campos!"
        return false
    }

    if (data.tel.length && data.tel.length < 10) {
        errorMsg = "Telefone precisa de ao menos 10 dígitos."
        return false
    }

    return true
}

export const handleEditInputs = (data: FormValues) => {
    if (!data.newName || !data.newEmail || !data.newTel) {
        errorMsg = "Preencha todos os campos corretamente!"
        return false
    }

    if (data.newTel.length && data.newTel.length < 10) {
        errorMsg = "'Telefone' precisa ter ao menos 10 dígitos."
        return false
    }

    return true
}
