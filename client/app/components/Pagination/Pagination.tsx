import Link from 'next/link'
import styles from './Pagination.module.scss'

interface PaginationProps {
  currentPage: number
  totalPages: number
  url: string
  showPages?: number
  queryParams: any
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  url,
  showPages = 2,
  queryParams
}) => {
  const adjacentPages = Math.min(showPages, totalPages)
  const startPage = Math.max(1, currentPage - Math.floor(adjacentPages / 2))
  const endPage = Math.min(totalPages, startPage + adjacentPages)

  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index
  )

  // Створюємо рядок з параметрами запиту
  const queryParamsString = new URLSearchParams(queryParams).toString()

  // Генеруємо посилання з параметрами запиту
  const generateLink = (page: number) =>
    `${url}${page}${queryParamsString ? `?${queryParamsString}` : ''}`

  return (
    <div className={styles.pagination}>
      {/* Посилання на попередню сторінку */}
      {currentPage > 1 && (
        <Link href={generateLink(currentPage - 1)} passHref>
          <div className={styles.paginationItem}>&laquo;</div>
        </Link>
      )}

      {/* Виведення сторінок перед поточною */}
      {startPage > 1 && (
        <>
          <Link href={generateLink(1)} passHref>
            <div className={styles.paginationItem}>1</div>
          </Link>
          {startPage > 2 && <div className={styles.paginationItem}>...</div>}
        </>
      )}

      {/* Вивід поточних сторінок */}
      {pages.map(pageNumber => (
        <Link key={pageNumber} href={generateLink(pageNumber)} passHref>
          <div
            className={`${styles.paginationItem} ${
              pageNumber === currentPage ? styles.active : ''
            }`}
          >
            {pageNumber}
          </div>
        </Link>
      ))}

      {/* Виведення сторінок після поточної */}
      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && (
            <div className={styles.paginationItem}>...</div>
          )}
          <Link href={generateLink(totalPages)} passHref>
            <div className={styles.paginationItem}>{totalPages}</div>
          </Link>
        </>
      )}

      {/* Посилання на наступну сторінку */}
      {currentPage < totalPages && (
        <Link href={generateLink(currentPage + 1)} passHref>
          <div className={styles.paginationItem}>&raquo;</div>
        </Link>
      )}
    </div>
  )
}

export default Pagination
