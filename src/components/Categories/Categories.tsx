import React, { useCallback } from 'react';
import s from './../Header/Header.module.scss';
import { useWhyDidYouUpdate } from 'ahooks';

type CategoriesProps = {
  categoryId: number;
  onChangeCategory: (id: number) => void;
};

const categories = ['All', 'Hot dishes', 'Cold dishes', 'Pizzas', 'Sushies'];

const Categories: React.FC<CategoriesProps> = React.memo(({ categoryId, onChangeCategory }) => {
  return (
    <div className={s.categories}>
      <ul className={s.ul}>
        {categories.map((item, i) => (
          <li
            key={i}
            onClick={() => onChangeCategory(i)}
            className={categoryId == i ? `${s.li} ${s.active}` : s.li}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
});

export default Categories;
