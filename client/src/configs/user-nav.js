import routes from './routes';

export default [
  {
    name: 'Account',
    path: routes.ACCOUNT,
  },
  {
    name: 'Order History',
    path: routes.ORDER_HISTORY,
  },
  {
    name: 'Meal Planner',
    path: routes.PLANNER,
  },
];

// export default Object.freeze({
//   AUTH: '/auth',
//   MENU: '/menu',
//   MENU_ITEM: '/menu/:id',
//   ORDER_HISTORY: '/order-history',
//   CART: '/cart',
//   CHECKOUT: '/checkout',
//   ACCOUNT: '/account',
//   PLANNER: '/planner',
//   ABOUT: '/about',
//   CONTACT: '/contact',
//   DELIVERY: '/delivery',
//   FAVOURITES: '/favourites',
// });
