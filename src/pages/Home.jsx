import React, { useRef } from 'react';
import qs from 'qs';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { setCategoryId, setFilters } from '../redux/slices/filterSlice';
import { SearchContext } from '../App';
import Categories from '../component/Categories';
import PizzaBlock from '../component/PizzaBlock/PizzaBlock';
import Skeleton from '../component/PizzaBlock/Skeleton';
import Pogination from '../component/Pogination';
import Sort, { popupList } from '../component/Sort';
import { fetchPizzas } from '../redux/slices/pizzasSlice';

export const HomeContext = React.createContext('');

const Home = () => {
  const { categoryId, sortType, currentPage } = useSelector((state) => state.filter);
  const { items, status } = useSelector((state) => state.pizza);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { searchVaalue } = React.useContext(SearchContext);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const getPizzas = async () => {
    const sortBy = sortType.sortProperty.replace('-', '');
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
    const search = searchVaalue ? `&search=${searchVaalue}` : ''; // Search в beck-end де mockapi не работает по сортировке(category), работатет только одно из них из-за этого применил метод filter()

    dispatch(
      fetchPizzas({
        sortBy,
        category,
        order,
        search,
        currentPage,
      }),
    );

    window.scrollTo(0, 0);
  };

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortType: sortType,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortType, searchVaalue, currentPage]);

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = popupList.find((obj) => obj.sortType === params.sortType);
      dispatch(
        setFilters({
          ...params,
          sort,
        }),
      );
      isSearch.current = true;
    }
  }, []);

  React.useEffect(() => {
    getPizzas();
    isSearch.current = false;
    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchVaalue, currentPage]);

  const pizzas = items
    .filter((obj) => {
      if (obj.name.toLowerCase().includes(searchVaalue.toLowerCase())) {
        return true;
      }
      return false;
    })
    .map((obj) => <PizzaBlock key={obj.id} {...obj} />);

  const skeletons = [...new Array(9)].map((_, index) => <Skeleton key={index} />);

  return (
    <>
      <div className="content__top">
        <Categories categoryId={categoryId} onChangeCategory={onChangeCategory} /> <Sort />
      </div>{' '}
      <h2 className="content__title"> Все пиццы </h2>{' '}
      {status === 'error' ? (
        <div className="cart cart--empty" style={{ margin: '30px auto 80px auto' }}>
          <h2>
            Пицци отсуствуют <b> 😕 </b>{' '}
          </h2>{' '}
          <p> Вероятней всего с сервером что - то не так попробуйте попытку позже </p>{' '}
        </div>
      ) : (
        <div className="content__items"> {status === 'loading' ? skeletons : pizzas} </div>
      )}{' '}
      <Pogination />
    </>
  );
};

export default Home;
