import './Pagination.css';
import {
  useCallback, useEffect, useState 
} from 'react';
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
  const [totalPages, setTotalPages] = useState(0);
  const sliceProductArray = useCallback(
    (pageNumber: number) => {
      const startIndex = pageNumber * productCountPerPage;
      const endIndex = startIndex + productCountPerPage;

      setMealsToShow([...mealsFromServer].slice(startIndex, endIndex));
    },
    [productCountPerPage, mealsFromServer, setMealsToShow],
  );

  useEffect(() => {
    const pages = Math.ceil(mealsFromServer.length / productCountPerPage);

    setTotalPages(pages);
  }, [mealsFromServer, productCountPerPage]);

  useEffect(() => {
    const pages = Math.ceil(mealsFromServer.length / productCountPerPage);
    const page = searchParams.get('page');

    if (page) {
      if (+page >= pages) {
        setCurrentPage(pages - 1);
      } else {
        setCurrentPage(+page);
      }
    }
  }, [searchParams, mealsFromServer.length, productCountPerPage]);

  useEffect(() => {
    sliceProductArray(currentPage);
  }, [currentPage, sliceProductArray]);

  const handlePageClick = (data: { selected: number }) => {
    setCurrentPage(data.selected);
    sliceProductArray(data.selected);
    searchParams.set('page', data.selected.toString());

    setSearchParams(searchParams);
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
          ' pagination-item--switch button--secondary button button--round '
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
