import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Sort, selectSort, setSort, sortPropertyEnum } from '../../redux/slices/filterSlice';
import s from './Sort.module.scss';

type SortItem = {
  name: string;
  sortProperty: sortPropertyEnum;
};

type PopupClick = MouseEvent & {
  path: Node[];
};

type SortPopupProps = {
  sortValue: Sort;
};

export const list: SortItem[] = [
  { name: 'Popularity Descending', sortProperty: sortPropertyEnum.RATING_DESC },
  { name: 'Popularity Ascending', sortProperty: sortPropertyEnum.RATING_ASC },
  { name: 'Price Descending', sortProperty: sortPropertyEnum.PRICE_DESC },
  { name: 'Price Ascending', sortProperty: sortPropertyEnum.PRICE_ASC },
  { name: 'Title (A-Z)', sortProperty: sortPropertyEnum.NAME_DESC },
  { name: 'Title (Z-A)', sortProperty: sortPropertyEnum.NAME_ASC },
];

const SortPopup: React.FC<SortPopupProps> = React.memo(({ sortValue }) => {
  // const [sort, setSort] = useState({ name: 'Popularity Descending', sortProperty: '-rating' });
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  const onClickListItem = (obj: SortItem) => {
    dispatch(setSort(obj));
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const _event = event as PopupClick;

      if (sortRef.current && !event.composedPath().includes(sortRef.current)) {
        setOpen(false);
      }
    };

    document.body.addEventListener('click', handleClickOutside);

    return () => document.body.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className={s.sort}>
      <div className={s.aside__section}>
        <div className={s.title}>Sort</div>
        <div className={s.content}>
          <div className={s.content__title}>Sort Results By </div>
          <div className={s.customSelect}>
            <div ref={sortRef} className={s.customSelect__top} onClick={() => setOpen(!open)}>
              <div className={s.customSelect__title}>{sortValue.name}</div>
              <div className={s.triangle}>&#9662;</div>
            </div>
            {open && (
              <div className={s.customSelect__popup}>
                <ul>
                  {list.map((obj, i) => (
                    <li
                      key={i}
                      className={
                        sortValue.sortProperty == obj.sortProperty
                          ? `${s.customSelect__property__active} ${s.customSelect__property}`
                          : s.customSelect__property
                      }
                      onClick={() => onClickListItem(obj)}>
                      {obj.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

export default SortPopup;
