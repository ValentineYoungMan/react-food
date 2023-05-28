import React from 'react';
import s from './Aside.module.scss';
import SortPopup from '../Sort/Sort';
import { Sort } from '../../redux/slices/filterSlice';

type SortPopupProps = {
  sortValue: Sort;
};

const Aside: React.FC<SortPopupProps> = ({ sortValue }) => {
  return (
    <div className={s.aside}>
      <div className={s.aside__sections}>
        <SortPopup sortValue={sortValue} />
      </div>
    </div>
  );
};

export default Aside;
