export const handleCreationDate = (date: string) => {
    const newDate = new Date(date)
    return newDate.toLocaleDateString()
}

export const handleString = (string: string) => {
    return string.length >= 30 ? string.substring(0,30)+'...' : string
}