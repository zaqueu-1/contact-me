export interface PaginationProps {
    handlePagination: (action: string) => void
    handleDisableNext: () => boolean
    currentPage: number
}