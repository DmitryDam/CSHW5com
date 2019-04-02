//   const thunk = ({ dispatch, getState }) => next => action =>
// typeof action === 'function' ? action(dispatch, getState) :
// next(action); если не функция - игнорирует
// ________________________________
// import { normalize } from 'normalizr';
// import * as schemas from './schemas';

// // console.log(normalizedPosts);

// export const actionTypes = {
//     FETCH_POSTS: 'FETCH_POSTS',
//     DELETE_POST: 'DELETE_POST',
//     ADD_POST: 'ADD_POST',
//     SELECT_AUTHOR: 'SELECT_AUTHOR',
// };

// export const fetchPosts = posts => {
//     const normalizedPosts = normalize(posts, [schemas.PostSchema]);
//     console.log('normalizedPosts', normalizedPosts);

//     return {
//         type: actionTypes.FETCH_POSTS,
//         payload: {
//             ids: {
//                 posts: Object.keys(normalizedPosts.entities.posts),
//                 authors: Object.keys(normalizedPosts.entities.authors),
//             },
//             entities: normalizedPosts.entities,
//         },
//     };
// };
// ________________________________
// { dispatch, getState } -деструктуризированный state
import axios from 'axios';
import { schema, normalize } from 'normalizr';
import actions from './MenuActions';

const ProductSchema = new schema.Entity('products');
// const normalizedProducts = normalize(products, [ProductSchema]);

axios.defaults.baseURL = 'http://localhost:8000';

const fetchNotes = () => async dispatch => {
  dispatch(actions.fetchRequest());
  // fetchRequest() как вызов функции
  // ACTION получение данных идет без этого(для loading,error)
  //   const fetchRequest = () => ({
  //     type: types.FETCH_REQUEST,
  //   });
  try {
    const response = await axios.get('/menu');
    const normalizedPosts = normalize(response.data, [ProductSchema]);
    console.log('responseMenuRedux', response);
    console.log('normalizedPosts', normalizedPosts);
    dispatch(actions.fetchSuccess(response.data));
    // dispatch(actions.addToCart(normalizedPosts));
  } catch (error) {
    dispatch(actions.fetchError(error));
  }
};

const fetchNotes1 = () => async dispatch => {
  dispatch(actions.fetchRequest());
  // fetchRequest() как вызов функции
  // ACTION получение данных идет без этого(для loading,error)
  //   const fetchRequest = () => ({
  //     type: types.FETCH_REQUEST,
  //   });
  try {
    const response = await axios.get('/menu');
    // const normalizedPosts = normalize(response.data, [ProductSchema]);
    // console.log('responseMenuRedux', response);
    // console.log('normalizedPosts', normalizedPosts);
    dispatch(actions.fetchSuccess1(response.data));
    // dispatch(actions.addToCart(normalizedPosts));
  } catch (error) {
    dispatch(actions.fetchError(error));
  }
};

const getMenuItemsWithCategory = category => async dispatch => {
  dispatch(actions.fetchRequest());

  try {
    const response = await axios.get(`/menu?category=${category}`);
    console.log('responseMenuRedux', response);
    dispatch(actions.fetchSuccessCategory(response.data));
  } catch (error) {
    dispatch(actions.fetchError(error));
  }
};

const getMenuItemById = id => async dispatch => {
  dispatch(actions.fetchRequest());

  try {
    const response = await axios.get(`/menu/${id}`);
    console.log('getMenuItemById', response);
    dispatch(actions.fetchSuccessById(response.data));
  } catch (error) {
    dispatch(actions.fetchError(error));
  }
};
const getCategories = () => async dispatch => {
  dispatch(actions.fetchRequest());

  try {
    const response = await axios.get(`/categories`);
    console.log('getCategories', response);
    dispatch(actions.fetchCategories(response.data));
  } catch (error) {
    dispatch(actions.fetchError(error));
  }
};

// const getMenuItemById = async id => {
//   const response = await axios.get(`/menu/${id}`);
//   return response.data;
// };

const addNote = text => dispatch => {
  dispatch(actions.fetchRequest());

  axios
    .post('http://localhost:4040/notes', { text, completed: false })
    .then(({ data }) => dispatch(actions.addNoteSuccess(data)))
    // .then(response => {
    //   dispatch(actions.addNoteSuccess(response.data));
    // })
    .catch(error => dispatch(actions.fetchError(error)));
};

const deleteNote = id => dispatch => {
  dispatch(actions.fetchRequest());

  axios
    .delete(`http://localhost:4040/notes/${id}`)
    .then(() => {
      dispatch(actions.deleteNoteSuccess(id));
    })
    .catch(error => {
      dispatch(actions.fetchError(error));
    });
};

export default {
  fetchNotes,
  fetchNotes1,
  getMenuItemsWithCategory,
  getCategories,
  getMenuItemById,
  addNote,
  deleteNote,
  // fetchNotesForCart,
};

// Axios
// https://kapeli.com/cheat_sheets/Axios.docset/Contents/Resources/Documents/index

const action = {
  type: false,
  meta: {
    throttle: 2000,
    shouldConfirm: true,
  },
};
console.log(action.type);
const throttled = {};
// throttled = {} - ключ переключатель
throttled[action.type] = true;
const qqq = console.log(!!throttled[action.type]);
