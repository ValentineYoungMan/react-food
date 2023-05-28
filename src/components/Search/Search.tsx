import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilter, setSearchValue } from '../../redux/slices/filterSlice';
import s from './Search.module.scss';

const Search: React.FC = () => {
  const dispatch = useDispatch();
  const { searchValue } = useSelector(selectFilter);

  //const [value, setValue] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);

  const onChangeSearchValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchValue(event.target.value));
    //console.log(searchValue);
  };

  const onClickClear = () => {
    dispatch(setSearchValue(''));
    inputRef.current?.focus();
  };

  return (
    <div className={s.search}>
      <div className={s.inputContainer}>
        <input
          ref={inputRef}
          value={searchValue}
          onChange={onChangeSearchValue}
          className={s.input}
          placeholder="Search in the menu..."
        />
        {searchValue && (
          <svg
            onClick={onClickClear}
            className={s.clearIcon}
            height="48"
            viewBox="0 0 48 48"
            width="48"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M38 12.83l-2.83-2.83-11.17 11.17-11.17-11.17-2.83 2.83 11.17 11.17-11.17 11.17 2.83 2.83 11.17-11.17 11.17 11.17 2.83-2.83-11.17-11.17z" />
            <path d="M0 0h48v48h-48z" fill="none" />
          </svg>
        )}
      </div>
    </div>
  );
};

export default Search;
