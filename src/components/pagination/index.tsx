

import styles from "./pagination.module.css"
import { PaginationProps } from "./types"
import { BiSolidLeftArrowSquare, BiSolidRightArrowSquare } from "react-icons/bi"

export default function Pagination({ handlePagination, currentPage, handleDisableNext }: PaginationProps) {
  return (
    <div className={styles.pagination}>
        <button disabled={currentPage == 1} onClick={() => handlePagination('')}>
            <BiSolidLeftArrowSquare />
        </button>
        <button disabled={handleDisableNext()}  onClick={() => handlePagination('next')}>
            <BiSolidRightArrowSquare />
        </button>
    </div>
  )
}
