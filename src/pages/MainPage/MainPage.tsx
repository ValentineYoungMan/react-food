import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Aside from '../../components/Aside/Aside';
import Dishes from '../../components/Dishes/Dishes';
import Search from '../../components/Search/Search';
import s from './MainPage.module.scss';
import { selectFilter, setCurrentPage } from '../../redux/slices/filterSlice';
import Pagination from '../../components/Pagination/Pagination';
import { fetchDishes } from '../../redux/slices/dishesSlice';
import { useAppDispatch } from '../../redux/store';

const MainPage: React.FC = () => {
  const dispatch = useAppDispatch();

  const { searchValue, sort, categoryId, currentPage } = useSelector(selectFilter);
  const sortType = sort.sortProperty;

  const onChangePage = (number: number) => {
    dispatch(setCurrentPage(number));
  };

  const fetchData = async () => {
    const sortBy = sortType.replace('-', '');
    const order = sortType.includes('-') ? 'asc' : 'desc';
    const search = searchValue ? `&search=${searchValue}` : '';
    const category = categoryId > 0 ? `&category=${categoryId}` : '';

    dispatch(
      fetchDishes({
        sortBy,
        order,
        search,
        category,
        currentPage: String(currentPage),
      }),
    );
  };

  useEffect(() => {
    fetchData();
  }, [searchValue, sort, categoryId, currentPage]);

  return (
    <div className={s.mainpage}>
      <Search />
      <div className={s.title}>All dishes</div>
      <div className={s.mainblock}>
        <Aside sortValue={sort} />
        <Dishes />
      </div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default MainPage;
