import { normalize, schema } from 'normalizr';
import types from './MenuActionTypes';

const changeFilter = filter => ({
  type: types.CHANGE_FILTER,
  payload: filter,
});
// показать спиннер
const fetchRequest = () => ({
  type: types.FETCH_REQUEST,
});

const fetchSuccess = notes => ({
  type: types.FETCH_SUCCESS,
  payload: notes,
});

const fetchSuccess1 = posts => {
  const ProductSchema = new schema.Entity('products');
  const normalizedPosts = normalize(posts, [ProductSchema]);
  console.log('normalizedPosts', normalizedPosts);
  return {
    type: types.FETCH_SUCCESS1,
    payload: {
      ids: Object.keys(normalizedPosts.entities.products),
      entities: normalizedPosts.entities,
    },
  };
};

const fetchSuccessCategory = posts => {
  const ProductSchema = new schema.Entity('products');
  const normalizedPosts = normalize(posts, [ProductSchema]);
  console.log('normalizedPosts', normalizedPosts);
  return {
    type: types.FETCH_SUCCESS_BY_CATEGORY,
    payload: {
      ids: Object.keys(normalizedPosts.entities.products),
      entities: normalizedPosts.entities,
    },
  };
};

// const fetchSuccessById = posts => {
//   const ProductSchema = new schema.Entity('products');
//   const normalizedPosts = normalize(posts, ProductSchema);
//   console.log('normalizedPostsID', normalizedPosts);
//   return {
//     type: types.FETCH_SUCCESS_BY_ID,
//     payload: {
//       // ids: normalizedPosts.entities.result,
//       ids: Object.keys(normalizedPosts.entities.products),
//       entities: normalizedPosts.entities.products,
//     },
//   };
// };

const fetchSuccessById = id => ({
  type: types.FETCH_SUCCESS_BY_ID,
  payload: id,
});
// const fetchSuccessCategory = id => ({
//   type: types.FETCH_SUCCESS_BY_CATEGORY,
//   payload: id,
// });

const fetchCategories = categories => ({
  type: types.FETCH_CATEGORIES,
  payload: categories,
});

const addNoteSuccess = note => ({
  type: types.ADD_SUCCESS,
  payload: note,
});

const addToCart = id => ({
  type: types.ADD_TO_CART,
  payload: {
    id,
  },
});

const removeFromCart = id => ({
  type: types.REMOVE_FROM_CART,
  payload: {
    id,
  },
});

const incrementAmount = id => ({
  type: types.INCREMENT_AMOUNT,
  payload: {
    id,
  },
});

const decrementAmount = id => ({
  type: types.DECREMENT_AMOUNT,
  payload: {
    id,
  },
});

// const deleteNoteSuccess = id => ({
// type: types.DELETE_SUCCESS,
// payload: id,
// });

const fetchError = error => ({
  type: types.FETCH_ERROR,
  payload: error,
});

export default {
  addNoteSuccess,
  // deleteNoteSuccess,
  // toggleNote,
  changeFilter,
  fetchRequest,
  fetchSuccess,
  fetchSuccess1,
  fetchSuccessCategory,
  fetchCategories,
  fetchSuccessById,
  fetchError,
  addToCart,
  removeFromCart,
  incrementAmount,
  decrementAmount,
};
