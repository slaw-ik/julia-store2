import React from 'react';

interface PaginationProps {
  page: number;
  total: number;
  onPageChanges: (page: number) => void;
}

const Pagination = ({ page, total, onPageChanges }: PaginationProps) => {
  const totalPages = Math.ceil(total / 10);
  const prevDisabled = page === 1;
  const nextDisabled = page === totalPages;

  const handlePreviousPage = () => {
    if (prevDisabled) return;
    onPageChanges(page - 1);
  };

  const handleNextPage = () => {
    if (nextDisabled) return;
    onPageChanges(page + 1);
  };

  const handlePageClick = (pageNumber: number) => {
    onPageChanges(pageNumber);
  };

  function isActive(pageNumber: number) {
    return pageNumber === page;
  }

  return (
    <ul className="pagination mb-sm-0">
      <li key="prev" className={`page-item ${prevDisabled && 'disabled'}`}>
        <button className="page-link" onClick={handlePreviousPage}>
          <i className="bi bi-caret-left" />
        </button>
      </li>
      {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
        <li key={pageNumber} className={`page-item ${isActive(pageNumber) && 'active'}`}>
          <button className="page-link" onClick={() => handlePageClick(pageNumber)}>
            {pageNumber}
          </button>
        </li>
      ))}
      <li key="next" className={`page-item ${nextDisabled && 'disabled'}`}>
        <button className="page-link" onClick={handleNextPage}>
          <i className="bi bi-caret-right" />
        </button>
      </li>
    </ul>
  );
};

export default Pagination;
