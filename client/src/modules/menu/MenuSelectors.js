import { createSelector } from 'reselect';

const getProductIds = state => state.products;
const getProductsEntities = state => state.entities.products;

// const getItems = state => {
//   const ids = getProductIds(state);
//   const entities = getProductsEntities(state);
//   //   В сборке Репеты срабатывает, здесь не мэпается
//   console.log('ids', ids.map(el => Number(el)));

//   console.log('ids', ids);
//   console.log('typeof ids', typeof ids);
//   console.log('entities', entities);

//   return ids.map(id => entities[id]);
// };

const getItems = createSelector(
  [getProductIds, getProductsEntities],
  (ids, entities) => ids.map(id => entities[id]),
);

const getItemById = state => state.menu;
const loading = state => state.loading;
const error = state => state.error;
const getCategories = state => state.categories;

const getCartProductIds = state => state.cart.ids;
const getCartProductAmounts = state => state.cart.amount;
// cart: {
//     ids: [
//       'efd96de1-dff8-4fe4-a60c-378c88973fc0',
//       '7aedadd4-9393-46d2-ba5c-351bc5b0f54a'
//     ],
//     amount: {
//       'efd96de1-dff8-4fe4-a60c-378c88973fc0': 2,
//       '7aedadd4-9393-46d2-ba5c-351bc5b0f54a': 1
//     }
//   },
// Кол-во видов товаров в корзине
const getCartProductsAmount = createSelector(
  getCartProductIds,
  ids => ids.length,
);

const getCartProducts = createSelector(
  [getCartProductIds, getCartProductAmounts, getProductsEntities],
  (ids, amounts, entities) =>
    ids.map(id => ({
      ...entities[id],
      amount: amounts[id],
    })),
);
// amount: amounts[id], добавил новое поле, и это будет имя пропа amount

export default {
  getItemById,
  loading,
  error,
  getCategories,
  getProductIds,
  getProductsEntities,
  getItems,
  getCartProductsAmount,
  getCartProducts,
};
