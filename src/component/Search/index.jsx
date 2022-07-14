import React from 'react';
import { SearchContext } from '../../App';
import debounce from 'lodash.debounce';
import styles from './Search.module.scss';

const Search = () => {
  const [value, setValue] = React.useState('')
  const { setSearchValue } = React.useContext(SearchContext);
  const inputRef = React.useRef();

  const onClickClear = () => {
    setSearchValue('');
    setValue('')
    inputRef.current.focus();
  };
  const updateSearchValue = React.useCallback(
    debounce((srt) => {
      setSearchValue(srt)
    }, 350),
    [],
  )
  const onChangeInput = (e) => {
    setValue(e.target.value);
    updateSearchValue(e.target.value);
  };


  return (
    <div className={styles.search__content}>
      <input
        ref={inputRef}
        value={value}
        onChange={onChangeInput}
        className={styles.root}
        placeholder="Поиск пиццы ..."
      />
      {value && (
        <i onClick={onClickClear} className="material-icons">
          close
        </i>
      )}
    </div>
  );
};

export default Search;
