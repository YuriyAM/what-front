import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';

import classNames from 'classnames';
import styles from './pagination.scss';

export const Pagination = ({ itemsPerPage, totalItems, paginate, prevPage, nextPage, page }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  useEffect(() => {
    setCurrentPage(page);
  }, [page]);

  let ellipsisLeft = false;
  let ellipsisRight = false;

  const pagination = [...new Array(totalPages).keys()].map((number) => number + 1)
    .reduce((accum, i) => {
      if (i === currentPage) {
        accum.push({ id: i, current: true, ellipsis: false });
      } else if (i < 2 || i > totalPages - 1 || i === currentPage - 1 || i === currentPage + 1) {
        accum.push({ id: i, current: false, ellipsis: false });
      } else if (i > 1 && i < currentPage && !ellipsisLeft) {
        ellipsisLeft = true;
        accum.push({ id: i, current: false, ellipsis: true });
      } else if (i < totalPages && i > currentPage && !ellipsisRight) {
        ellipsisRight = true;
        accum.push({ id: i, current: false, ellipsis: true });
      }
      return accum;
    }, []);

  const changePage = (page) => {
    if (page !== currentPage) {
      setCurrentPage(page);
    }
  };

  const goToPrevPage = () => {
    setCurrentPage((prev) => (prev - 1 === 0 ? prev : prev - 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prev) => (prev === totalPages ? prev : prev + 1));
  };

  return (
    <div>
      <nav className="col-12 d-flex flex-row flex-wrap justify-content-center">
        <ul className="pagination mb-0 align-items-center">
          <li className="page-item">
            <button
              className={classNames('page-link', styles.link)}
              onClick={() => {
                goToPrevPage();
                prevPage(currentPage - 1);
              }}
            >&lt;
            </button>
          </li>
        </ul>
        <ul className="pagination mb-0 align-items-center">
          {pagination.map((page) => {
            if (!page.ellipsis) {
              return (
                <li key={page.id} className="page-item">
                  <button
                    className={classNames('page-link', styles.link, { [styles.active]: page.current })}
                    onClick={() => {
                      paginate(page.id);
                      changePage(page.id);
                    }}
                  >
                    {page.id}
                  </button>
                </li>
              );
            }
            return (
              <li key={page.id}>
                <span className={classNames('pagination-ellipsis px-1', styles.ellipsis)}>&hellip;</span>
              </li>
            );
          })}
        </ul>
        <ul className="pagination mb-0 align-items-center">
          <li className="page-item">
            <button
              className={classNames('page-link', styles.link)}
              onClick={() => {
                goToNextPage();
                nextPage(currentPage + 1);
              }}
            >&gt;
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

Pagination.propTypes = {
  itemsPerPage: propTypes.number.isRequired,
  totalItems: propTypes.number.isRequired,
  paginate: propTypes.func.isRequired,
  prevPage: propTypes.func.isRequired,
  nextPage: propTypes.func.isRequired,
};
