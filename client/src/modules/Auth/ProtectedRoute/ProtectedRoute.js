import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as selectors from '../selectors';

{
  /* Импорт защищенного раута вместо Route в АПП */
}
const ProtectedRoute = ({
  component: Component,
  redirectTo = '/',
  // Проп прокидывается из АПП
  isAuthenticated,
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: redirectTo,
            state: { from: props.location },
            // 51:00 55:00(3) state: { from: props.location } - откуда мы пришли
            // Если была попытка входа на защищенный раут, то редирект на логин и
            // запись в историю, откуда был вход, что бы после логина перенаправить туда
          }}
        />
      )
    }
  />
);

const mapState = state => ({
  isAuthenticated: selectors.isAuthenticated(state),
});

export default connect(mapState)(ProtectedRoute);
// https://tylermcginnis.com/react-router-protected-routes-authentication/
