import "./pagination.css";
import { useState, useContext } from "react";
import { SensorContext } from "../../contexts/sersorContext";

interface IPagination {
  page: number;
  search: any;
}
export default function Pagination({ search }: IPagination) {
  const {
    getSensors,
    dataSensors,
    currentPage,
    setCurrentPage,
    perPage,
    setPerPage,
  } = useContext(SensorContext);

  const page = dataSensors.totalPage;
  const showPagination = (currentPage: number, page: number) => {
    const returnShowPagination = [];

    if (page <= 6) {
      for (let i = 1; i <= page; i++) {
        returnShowPagination.push(i);
      }
      return returnShowPagination;
    }
    const prePage = currentPage - 1;
    const nextPage = currentPage + 1;
    if (nextPage <= 4) {
      return [1, 2, 3, 4, "...", page];
    } else {
      returnShowPagination.push(...[1, "...", prePage, currentPage]);
      if (page - nextPage > 2) {
        returnShowPagination.push(...[nextPage, "...", page]);
      } else {
        for (let i = nextPage; i <= page; i++) {
          returnShowPagination.push(i);
        }
      }
      return returnShowPagination;
    }
  };
  return (
    <div className="wp-pagination">
      <div className="pagination">
        <div
          className="pagination__redirect-pre"
          onClick={() => {
            if (currentPage === 1) {
              return;
            } else {
              setCurrentPage(currentPage - 1);
              getSensors({ page: currentPage - 1, limit: perPage, ...search });
            }
          }}
        >
          {" "}
          Pre
        </div>
        <div>
          <ul className="pagination__list">
            {showPagination(currentPage, page).map((item, index) => {
              return (
                <li
                  key={index}
                  className={currentPage === item ? "active" : ""}
                  onClick={() => {
                    if (item === currentPage) {
                      return;
                    }
                    if (typeof item === "number") {
                      setCurrentPage(item);
                      getSensors({ page: item, limit: perPage, ...search });
                    }
                  }}
                >
                  {item}
                </li>
              );
            })}
          </ul>
        </div>
        <div
          className="pagination__redirect-next"
          onClick={() => {
            if (currentPage === page) {
              return;
            } else {
              setCurrentPage(currentPage + 1);
              getSensors({ page: currentPage + 1, limit: perPage, ...search });
            }
          }}
        >
          Next
        </div>
      </div>
      <ul className="pagination__limit-page">
        <span>Số bảng ghi mỗi trang:</span>
        <li
          className={perPage === 20 ? "active" : ""}
          onClick={() => {
            if (perPage !== 20) {
              getSensors({ page: 1, limit: 20, ...search });
              setPerPage(20);
              setCurrentPage(1);
            }
          }}
        >
          20
        </li>
        <li
          className={perPage === 50 ? "active" : ""}
          onClick={() => {
            if (perPage !== 50) {
              getSensors({ page: 1, limit: 50, ...search });
              setPerPage(50);
              setCurrentPage(1);
            }
          }}
        >
          50
        </li>
        <li
          className={perPage === 75 ? "active" : ""}
          onClick={() => {
            if (perPage !== 75) {
              getSensors({ page: 1, limit: 75, ...search });
              setPerPage(75);
              setCurrentPage(1);
            }
          }}
        >
          75
        </li>
      </ul>
    </div>
  );
}
