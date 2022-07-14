import axios from 'axios';
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const FullPizza = () => {

  const { id } = useParams();
  const [pizza, setPizza] = React.useState();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function fetchPizzas() {
      try {
        const { data } = await axios.get(`https://62ad6314645d00a28af8e97d.mockapi.io/pizzas/` + id);
        setPizza(data);
      } catch (error) {
        alert('Error');
        navigate('/');
      }
    }

    fetchPizzas();
  }, []);

  if(!pizza) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <img src={pizza.imageUrl} alt="pizza" />
      <h2>{pizza.name}</h2>
      <p>Тут должно быть полное описание по пицце которая в моём API нету</p>
      <p>p.s: не охото делать верстку так как этот проэкт для понимания React</p>
      <h4>{pizza.price} ₽</h4>
    </div>
  );
};

export default FullPizza;