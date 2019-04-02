import axios from 'axios';
import {
  signUpRequest,
  signUpSuccess,
  signUpError,
  signInRequest,
  signInSuccess,
  signInError,
  signOutRequest,
  signOutSuccess,
  refreshUserStart,
  refreshUserSuccess,
} from './actions';
import * as selectors from './selectors';
// 45:30 (1) дефолтные настройки Axios
// axios.defaults.baseURL = "http://localhost:4040";
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// 55:00 Сетит дефолтный хедер в аксиос и эта функция вызывается в аксиос при запросе
const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = null;
};

export const signUp = credentials => dispatch => {
  dispatch(signUpRequest());

  axios
    .post('http://localhost:4040/auth/signup', credentials)
    .then(({ data }) => {
      setAuthHeader(data.token);

      dispatch(signUpSuccess(data));
    })
    .catch(error => dispatch(signUpError(error)));
};
// Пример с консолью без деструктуризации
// axios
// .post("/auth/signup", credentials)
// .then(response => {
//   console.log(response);
//   dispatch(signUpSuccess(response.data));
// })
// .catch(error => dispatch(signUpError(error)));
// };
export const signIn = credentials => dispatch => {
  dispatch(signInRequest());

  axios
    .post('http://localhost:4040/auth/signin', credentials)
    .then(({ data }) => {
      setAuthHeader(data.token);
      dispatch(signInSuccess(data));
    })
    .catch(error => dispatch(signInError(error)));
};

// 48 минута(1)
export const signOut = () => dispatch => {
  dispatch(signOutRequest());
  // const getToken = state => state.session.token;
  axios.post('http://localhost:4040/auth/signout').then(() => {
    clearAuthHeader();
    dispatch(signOutSuccess());
  });
};
// Если юзер залогинен, но при перезагрузке берет данные из Локал стор
// функция работает в АПП 38:30(2)
export const refreshCurrentUser = () => (dispatch, getState) => {
  // const getToken = state => state.session.token;
  const token = selectors.getToken(getState());
  // Если токен не получен из лок стор, прервать
  if (!token) return;
  // Здесь токен берем из константы, поскольку он не приходит из бека
  setAuthHeader(token);
  // для показа лоадера
  dispatch(refreshUserStart());

  axios
    .get('http://localhost:4040/auth/current')
    .then(({ data }) => dispatch(refreshUserSuccess(data.user)))
    .catch(error => {
      // dispach екшен чтобы убрать токен из state
      clearAuthHeader();
      console.log('Error while refreshing: ', error);
    });
};
