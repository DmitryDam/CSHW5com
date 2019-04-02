import React from 'react';
import s from './MenuGrid.module.css';

const MenuCard = (
  { name, image, price, id, addToCart }, // ingredients=[]}
) => (
  <div>
    <img
      className={s.linkItem}
      src={image}
      alt={name}
      // width={320}
      // height={240}
    />
    <p>{name}</p>
    <p>Цена: {price} грн.</p>
    {/* <button onClick={addToCart}>Добавить в корзину</button> */}
  </div>
);

export default MenuCard;

// <ul>
// ingredients.map(el => <li key={el}>{el}</li>)
// </ul>
