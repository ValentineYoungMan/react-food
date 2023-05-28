import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import s from './Cart.module.scss';
import { Link } from 'react-router-dom';
import { clearItems, selectCartSlice } from '../../redux/slices/cartSlice';
import CartItem from '../../components/CartItem/CartItem';
import CartEmpty from '../../components/CartEmpty/CartEmpty';

const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const { totalPrice, items } = useSelector(selectCartSlice);
  const totalCount = items.reduce((sum: number, item: any) => sum + item.count, 0);

  const onClickClear = () => {
    if (window.confirm('Delete cart?')) {
      dispatch(clearItems());
    }
  };

  if (!totalPrice) {
    return <CartEmpty />;
  }

  return (
    <div className={`${s.container} ${s.container__cart}`}>
      <div className={s.cart}>
        <div className={s.cart__top}>
          <h2 className={s.content__title}> Корзина</h2>
          <div onClick={onClickClear} className={s.cart__clear}>
            <span>Очистить корзину</span>
          </div>
        </div>
        <div className={s.content__items}>
          {items.map((item: any) => {
            return <CartItem key={item.id} {...item} />;
          })}
        </div>
        <div className={s.cart__bottom}>
          <div className={s.cart__bottom__details}>
            <span>
              {' '}
              All dishes: <b>{totalCount} шт.</b>{' '}
            </span>
            <span>
              {' '}
              Total price: <b>{totalPrice} ₴</b>{' '}
            </span>
          </div>
          <div className={s.cart__bottom__buttons}>
            <Link
              to="/"
              className={`${s.button} ${s.button__outline} ${s.button__add} ${s.go__back__btn}`}>
              <span>Вернуться назад</span>
            </Link>
            <div className={`${s.button} ${s.pay__btn}`}>
              <span>Оплатить сейчас</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
