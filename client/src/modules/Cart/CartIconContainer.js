import React, { Component } from 'react';
import { connect } from 'react-redux';
import CartIconView from './CartIconView';
// import * as selectors from '../../redux/selectors';
import { menuActions, menuSelectors, menuOperations } from '../menu';

const mapState = state => ({
  amount: menuSelectors.getCartProductsAmount(state),
});

export default connect(mapState)(CartIconView);
