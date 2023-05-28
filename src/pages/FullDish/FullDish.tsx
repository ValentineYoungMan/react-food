import React, { useEffect, useState } from 'react';
import s from './FullDish.module.scss';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const FullDish: React.FC = () => {
  const [data, setData] = useState<{
    imageUrl: string;
    name: string;
    price: number;
  }>();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchDish() {
      try {
        const { data } = await axios.get('https://641f346cf228f1a83eb2a028.mockapi.io/items/' + id);
        setData(data);
      } catch (error) {
        console.log(error);
        navigate('/');
      }
    }

    fetchDish();
  }, []);

  if (!data) {
    return <>'Loading...'</>;
  }

  return (
    <div className={s.container}>
      <img src={data.imageUrl} />
      <div className={s.info}>
        <h2 className={s.name}>{data.name}</h2>
        <h4 className={s.price}>Price: {data.price} ₴</h4>
        <Link to="/">
          <button className={s.add__button}>Повернутися назад</button>
        </Link>
      </div>
    </div>
  );
};

export default FullDish;
