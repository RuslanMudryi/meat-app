import './Pagination.css';
import { useCallback, useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { Meal } from '../../types/Meal';
import { SetURLSearchParams } from 'react-router-dom';

type Props = {
  productCountPerPage: number;
  mealsFromServer: Meal[];
  setMealsToShow: (meals: React.SetStateAction<Meal[]>) => void;
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
};

export const Pagination: React.FC<Props> = ({
  productCountPerPage,
  mealsFromServer,
  setMealsToShow,
  searchParams,
  setSearchParams,
}) => {
  const [currentPage, setCurrentPage] = useState(0);

  const totalPages = Math.ceil(mealsFromServer.length / productCountPerPage);

  const sliceProductArray = useCallback(
    (pageNumber: number) => {
      const startIndex = pageNumber * productCountPerPage;
      const endIndex = startIndex + productCountPerPage;
      setMealsToShow(mealsFromServer.slice(startIndex, endIndex));
    },
    [productCountPerPage, mealsFromServer, setMealsToShow],
  );

  useEffect(() => {
    const page = searchParams.get('page');
    if (page) {
      const safePage = Math.min(Math.max(+page, 0), totalPages - 1);
      setCurrentPage(safePage);
      sliceProductArray(safePage);
    }
  }, [searchParams, totalPages, sliceProductArray]);

  const handlePageClick = (data: { selected: number }) => {
    setCurrentPage(data.selected);
    sliceProductArray(data.selected);

    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('page', data.selected.toString());
    setSearchParams(newSearchParams);
  };

  return (
    <div className="pagination-container">
      <ReactPaginate
        previousLabel={'<'}
        nextLabel={'>'}
        breakLabel={'...'}
        pageCount={totalPages}
        marginPagesDisplayed={1}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        pageClassName={
          'pagination-item  button--secondary button--disabled button button--round'
        }
        previousClassName={
          'pagination-item--switch button--secondary button button--round'
        }
        previousLinkClassName={'pagination-item-link'}
        pageLinkClassName={'pagination-item-link'}
        nextClassName={
          'pagination-item--switch button--secondary button button--round'
        }
        nextLinkClassName={'pagination-item-link'}
        breakClassName={'pagination-item'}
        breakLinkClassName={'pagination-link'}
        activeClassName={'pagination-item--active'}
        disabledClassName={'pagination-item--disabled'}
        forcePage={currentPage}
      />
    </div>
  );
};
