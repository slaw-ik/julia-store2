import React, { useEffect, useState } from "react";

type PaginationProps = {
  page: number;
  fetchData: (page: number) => void;
};

const Pagination = ({ page, fetchData }: PaginationProps) => {
  const [currentPage, setCurrentPage] = useState<number>(page);

  useEffect(() => {
    // fetchData(currentPage);

    console.log("currentPage", currentPage);

    const params = new URLSearchParams();
    params.set("page", currentPage.toString());

    // Construct the new hash string with parameters
    const newHash = "#" + params.toString();

    // Set the new hash in the window location
    window.location.hash = newHash;
  }, [currentPage]);

  const prevDisabled = currentPage === 1;
  const nextDisabled = currentPage === 5;

  const handlePreviousPage = () => {
    if (prevDisabled) return;
    setCurrentPage((prevState) => prevState - 1);
  };

  const handleNextPage = () => {
    if (nextDisabled) return;
    setCurrentPage((prevState) => prevState + 1);
  };

  function isActive(page: number) {
    return page === currentPage;
  }

  return (
    <ul className="pagination mb-sm-0">
      <li className={`page-item ${prevDisabled && "disabled"}`}>
        <button className="page-link" onClick={handlePreviousPage}>
          <i className="bi bi-caret-left" />
        </button>
      </li>
      {Array.from({ length: 5 }, (_, index) => index + 1).map((page) => (
        <li className={`page-item ${isActive(page) && "active"}`}>
          <button className="page-link">{page}</button>
        </li>
      ))}
      <li className={`page-item ${nextDisabled && "disabled"}`}>
        <button className="page-link" onClick={handleNextPage}>
          <i className="bi bi-caret-right" />
        </button>
      </li>
    </ul>
  );
};

export default Pagination;
