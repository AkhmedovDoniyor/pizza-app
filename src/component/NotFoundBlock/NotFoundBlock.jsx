import React from 'react';
import FoundImg from '../../assets/img/empty-cart.png';
import { Link } from 'react-router-dom';


const NotFoundBlock = () => {

  return (
    <div className="content">
      <div className="container container--cart">
        <div className="cart cart--empty">
          <h2>
            Корзина пустая <b>😕</b>
          </h2>
          <p>
            Вероятней всего, вы не заказывали ещё пиццу.
            <br />
            Для того, чтобы заказать пиццу, перейди на главную страницу.
          </p>
          <img src={ FoundImg } alt="Empty cart" />
          <Link to="/">
            <button className="button button--black">
              <span>Вернуться назад</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundBlock;