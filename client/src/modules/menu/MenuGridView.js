import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import routes from '../../configs/routes';
import * as selectors from '../Auth/selectors';
import s from './MenuGrid.module.css';
// viev
import MenuCard from './MenuCard';

const MenuGrid = ({ items = [], location, addToCart, isAuthenticated }) => (
  <div>
    {/* <Link to={`${routes.MENU_ADD}`}>Добавить элемент меню</Link> */}
    <ul className={s.galleryImages}>
      {items.map(item => (
        <li className={s.liContainer} key={item.id}>
          <Link
            to={{
              pathname: `${routes.MENU}/${item.id}`,
              state: { from: location },
              // state: { from: location } - для перехода на страницу назад
              // Передается весь объект location 38:00
            }}
          >
            <MenuCard {...item} />
          </Link>
          {isAuthenticated && (
            <button
              className={s.buttonCart}
              type="button"
              onClick={() => addToCart(item.id)}
            >
              ДОБАВИТЬ В КОРЗИНУ
            </button>
          )}
        </li>
      ))}
    </ul>
  </div>
);

const mapState = state => ({
  isAuthenticated: selectors.isAuthenticated(state),
});
export default connect(mapState)(withRouter(MenuGrid));

// export default withRouter(MenuGrid);
// withRouter прокинул поля location
// <Link
// to={{
//   pathname: `${routes.MENU}/${item.id}`,
//   state: { from: location },
// }}
// >
// Передал объектом второй параметр  state: { from: location },
