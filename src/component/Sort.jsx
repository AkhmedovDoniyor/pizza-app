import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSortType } from "../redux/slices/filterSlice"


export const popupList = [
    { name: `популярности (desc)`, sortProperty: 'rating' },
    { name: 'популярности (asc)', sortProperty: '-rating' },
    { name: 'цене (desc)', sortProperty: 'price' },
    { name: 'цене (asc)', sortProperty: '-price' },
    { name: 'алфавит (desc)', sortProperty: 'title' },
    { name: 'алфавит (asc)', sortProperty: '-title' },
  ];

const Sort = () => {
  const dispatch = useDispatch()
  const sortType = useSelector(state => state.filter.sortType)
  const sortRef = React.useRef()

  const [open, setOpen] = React.useState(false);
  
  const onClickSort = (obj) => {
    dispatch(setSortType(obj))
  }
  const handleClick = (index) => {
    onClickSort(index);
    setOpen(false);
  };

  React.useEffect(() => {
    const handleClickOutside = (e) => {
      if(!e.path.includes(sortRef.current)) {
        setOpen(false);
      }
    }
    document.body.addEventListener('click', handleClickOutside)

    return () => {
      document.body.removeEventListener('click', handleClickOutside)
    } 
  }, [])

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label" onClick={() => setOpen(!open)} style={{ cursor: 'pointer' }}>
        <i
          className="material-icons"
          style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}>
          arrow_drop_down
        </i>
        <b>Сортировка по:</b>
        <span>{sortType.name}</span>
      </div>
      {open && (
        <div className="sort__popup">
          <ul>
            {popupList.map((item, index) => {
              return (
                <li
                  key={index}
                  className={sortType.sortProperty === item.sortProperty ? 'active' : ''}
                  onClick={() => handleClick(item)}>
                  {item.name}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sort;
