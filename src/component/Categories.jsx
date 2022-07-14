import React from 'react';

const Categories = (props) => {
  const { categoryId, onChangeCategory } = props;

  const categories = [
    { name: 'Все' },
    { name: 'Мясные' },
    { name: 'Вегетарианская' },
    { name: 'Гриль' },
    { name: 'Острые' },
    { name: 'Закрытые' },
  ];

  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, index) => {
          return (
            <li
              key={index}
              className={categoryId === index ? 'active' : ''}
              onClick={() => onChangeCategory(index)}>
              {categoryName.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Categories;
