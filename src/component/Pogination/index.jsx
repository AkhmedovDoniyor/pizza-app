import React from 'react';
import { useDispatch } from 'react-redux';
import styles from "./Pogination.module.scss"
import ReactPaginate from 'react-paginate';
import { setCurrentPage } from '../../redux/slices/filterSlice';

const Pogination = () => {
  const dispatch = useDispatch();

  const onChangePage = (num) => {
    dispatch(setCurrentPage(num));
  };

  return (
    <ReactPaginate
        className={styles.root}
        breakLabel="..."
        nextLabel=">"
        previousLabel="<"
        onPageChange={e => onChangePage(e.selected + 1)}
        pageRangeDisplayed={8}
        pageCount={4}
        renderOnZeroPageCount={null}
      />
  );
};

export default Pogination;