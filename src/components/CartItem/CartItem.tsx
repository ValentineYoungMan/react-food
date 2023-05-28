import React from 'react';
import s from './../../pages/Cart/Cart.module.scss';
import picture from './../../assets/img/images2.jpg';
import { useDispatch } from 'react-redux';
import { CartItem, addItem, minusItem, removeItem } from '../../redux/slices/cartSlice';

type CartItemProps = {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  count: number;
  weight: number;
};

const CartItemBlock: React.FC<CartItemProps> = ({ id, name, price, imageUrl, weight, count }) => {
  const dispatch = useDispatch();

  const onClickPlus = () => {
    dispatch(addItem({ id } as CartItem));
  };

  const onClickMinus = () => {
    dispatch(minusItem(id));
  };

  const onClickRemove = () => {
    if (window.confirm('Are you sure you want to remove?')) {
      dispatch(removeItem(id));
    }
  };

  return (
    <div className={s.cart__item}>
      <div className={s.cart__item__img}>
        <img src={imageUrl} className={s.pizza__block__image} alt="Pizza" />
      </div>
      <div className={s.cart__item__info}>
        <h3>{name}</h3>
        <p>{weight} g</p>
      </div>
      <div className={s.cart__item__count}>
        <button
          disabled={count == 1}
          onClick={onClickMinus}
          className={`${s.button} ${s.button__outline} ${s.button__circle} ${s.cart__item__count__minus}`}>
          -
        </button>
        <b>{count}</b>
        <button
          onClick={onClickPlus}
          className={`${s.button} ${s.button__outline} ${s.button__circle} ${s.cart__item__count__plus}`}>
          +
        </button>
      </div>
      <div className={s.cart__item__price}>
        <b>{price * count} $</b>
      </div>
      <div className={s.cart__item__remove}>
        <div
          onClick={onClickRemove}
          className={`${s.button} ${s.button__outline} ${s.button__circle}`}>
          x
        </div>
      </div>
    </div>
  );
};

export default CartItemBlock;
