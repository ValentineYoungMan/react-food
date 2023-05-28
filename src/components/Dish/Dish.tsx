import React from 'react';
import s from './Dish.module.scss';
import { Link, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CartItem, addItem, selectCartSliceItemById } from '../../redux/slices/cartSlice';
import { RootState } from '../../redux/store';

type DishItemProps = {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  category: number;
  rating: number;
  weight: number;
  count: number;
};

const Dish: React.FC<DishItemProps> = ({ id, name, imageUrl, price, category, rating, weight }) => {
  const dispatch = useDispatch();

  const cartItem = useSelector(selectCartSliceItemById(id));

  const addedCount = cartItem ? cartItem.count : 0;

  const onClickAdd = () => {
    const item: CartItem = {
      id,
      name,
      price,
      imageUrl,
      weight,
      count: 0,
    };
    dispatch(addItem(item));
  };
  return (
    <div className={s.dish}>
      <Link className={s.dish__link} to={`/dish/${id}`}>
        <div className={s.img}>
          <img src={imageUrl} />
        </div>
      </Link>
      <div className={s.info}>
        <Link className={s.dish__link} to={`/dish/${id}`}>
          <div className={s.name}>{name}</div>
        </Link>
        <div className={s.weight}>{weight}g</div>
        <div className={s.footer}>
          <div className={s.price}>
            <div className={s.price__title}>Price:</div>
            <div className={s.price__item}>{price} ₴</div>
          </div>
          <button onClick={onClickAdd} className={s.add__button}>
            <svg
              version="1.1"
              id="Capa_1"
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="20px"
              height="20px"
              viewBox="0 0 510 510">
              <g>
                <g id="shopping-cart">
                  <path
                    d="M153,408c-28.05,0-51,22.95-51,51s22.95,51,51,51s51-22.95,51-51S181.05,408,153,408z M0,0v51h51l91.8,193.8L107.1,306
			c-2.55,7.65-5.1,17.85-5.1,25.5c0,28.05,22.95,51,51,51h306v-51H163.2c-2.55,0-5.1-2.55-5.1-5.1v-2.551l22.95-43.35h188.7
			c20.4,0,35.7-10.2,43.35-25.5L504.9,89.25c5.1-5.1,5.1-7.65,5.1-12.75c0-15.3-10.2-25.5-25.5-25.5H107.1L84.15,0H0z M408,408
			c-28.05,0-51,22.95-51,51s22.95,51,51,51s51-22.95,51-51S436.05,408,408,408z"
                  />
                </g>
              </g>
            </svg>
            {addedCount > 0 && <i>{addedCount}</i>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dish;
