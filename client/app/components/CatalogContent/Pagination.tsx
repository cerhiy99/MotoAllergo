import React, { useState, useEffect } from 'react';
import styles from './Pagination.module.scss';

interface PaginationProps {
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  onPageChange,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    onPageChange(currentPage);
  }, [currentPage, onPageChange]);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const getPaginationPages = (
    current: number,
    total: number
  ): (number | string)[] => {
    const pages: (number | string)[] = [];

    if (total <= 7) {
      for (let i = 1; i <= total; i++) pages.push(i);
      return pages;
    }

    const left = Math.max(2, current - 1);
    const right = Math.min(total - 1, current + 1);

    pages.push(1);

    if (left > 2) {
      pages.push('...');
    }

    for (let i = left; i <= right; i++) {
      pages.push(i);
    }

    if (right < total - 1) {
      pages.push('...');
    }

    pages.push(total);

    return pages;
  };

  const paginationPages = getPaginationPages(currentPage, totalPages);

  return (
    <div className={styles.pagination}>
      {paginationPages.map((page, idx) =>
        page === '...' ? (
          <span key={`dots-${idx}`} className={styles.dots}>
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => handlePageChange(Number(page))}
            className={`${styles['pagination-button']} ${
              currentPage === page ? styles.active : ''
            }`}
          >
            {page}
          </button>
        )
      )}
    </div>
  );
};

export default Pagination;
