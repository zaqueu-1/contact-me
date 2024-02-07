import { Contact } from "../../app/types"

export interface ContactsPanelProps {
    handleDelete: (id: string) => void
    handleEdit: (id: string) => void
    contacts: Contact[]
    openSearch: boolean
}