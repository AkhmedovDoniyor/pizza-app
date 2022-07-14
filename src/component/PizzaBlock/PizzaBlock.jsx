import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addItem } from '../../redux/slices/cartSlice';
import { setSortType } from '../../redux/slices/filterSlice';

const typeNames = ['тонкое', 'традиционное'];
const sizesNames = ['26', '30', '40'];

const PizzaBlock = (props) => {
  const { id, price, imageUrl, name, sizes, types, rating } = props;
  const dispatch = useDispatch();
  const cartItem = useSelector((state) => state.cart.items.find((obj) => obj.id === id));
  const [activeSize, setActiveSize] = React.useState(0);
  const [activeType, setActiveType] = React.useState(0);
  // const [activePrice, setActivePrice] = React.useState(price);

  const addedCount = cartItem ? cartItem.count : 0;

  const onClickAdd = () => {
    const item = {
      id,
      name,
      price,
      imageUrl,
      type: typeNames[activeType],
      size: sizesNames[activeSize],
    };
    dispatch(addItem(item));
  };

  // const onClickType = (e) => {
  //   setActiveType(e)
  //   // if(activeType === 0) {
  //   //   return activePrice
  //   // }
  //   if (activeType === 1) {
  //     return setActivePrice((prev) => prev + Math.round((prev * 8) / 100))
  //   }
  // }

  // const onClickSize = (index) => {
  //   setActiveSize(index)
  //   // if(activeSize === 0) {
  //   //   return activePrice;
  //   // }
  //   if(activeSize === 1) {
  //     return setActivePrice((prev) => prev + Math.round((prev * 5) / 100));
  //   }
  //   if(activeSize === 2) {
  //     return setActivePrice((prev) => prev + Math.round((prev * 8) / 100));
  //   }
  // }

  return (
    <div className="pizza-block">
      <Link to={`/pizza/${id}`}>
        <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
      </Link>
      <h4 className="pizza-block__title">{name}</h4>
      <div className="pizza-block__selector">
        <ul>
          {types.map((typeId) => {
            return (
              <li
                key={typeId}
                onClick={() => setActiveType(typeId)}
                className={activeType === typeId ? 'active' : ''}>
                {typeNames[typeId]}
              </li>
            );
          })}
        </ul>
        <ul>
          {sizes.map((size, index) => {
            return (
              <li
                key={index}
                onClick={() => setActiveSize(index)}
                className={activeSize === index ? 'active' : ''}>
                {size} см.
              </li>
            );
          })}
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">от {price} ₽</div>
        <button className="button button--outline button--add" onClick={onClickAdd}>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>Добавить</span>
          {addedCount > 0 && <i>{addedCount}</i>}
        </button>
      </div>
    </div>
  );
};

export default PizzaBlock;
