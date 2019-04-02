import React, { Component } from 'react';
import { connect } from 'react-redux';
import MenuGrid from '../modules/menu/MenuGridContainer';
import { menuActions, menuSelectors, menuOperations } from '../modules/menu';
import * as selectors from '../modules/Auth/selectors';

class MenuPage extends Component {
  componentDidMount() {
    const { getCategories, getAllMenu, getAllMenu1 } = this.props;
    getCategories();
    // getAllMenu();
    getAllMenu1();
    // из mapDispatchToProps
  }

  render() {
    const { match, history, location, ...restProps } = this.props;
    return (
      <MenuGrid
        match={match}
        history={history}
        location={location}
        {...restProps}
      />
    );
  }
}

const mapStateToProps = state => ({
  menu: menuSelectors.getItems(state),
  loading: menuSelectors.loading(state),
  categories: menuSelectors.getCategories(state),
  error: menuSelectors.error(state),
  isAuthenticated: selectors.isAuthenticated(state),
});

const mapDispatchToProps = {
  getAllMenu1: menuOperations.fetchNotes1,
  getMenuItemsWithCategory: menuOperations.getMenuItemsWithCategory,
  getCategories: menuOperations.getCategories,
  addToCart: menuActions.addToCart,
  incrementAmount: menuActions.incrementAmount,
  decrementAmount: menuActions.decrementAmount,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MenuPage);

// import * as selectors from '../Auth/selectors';
// import s from './CartIcon.module.css';

// const CartIcon = ({ amount, isAuthenticated }) =>
//   isAuthenticated && (
//     <div className={s.container}>
//       <Link to="/cart">
//         <img
//           src="https://image.flaticon.com/icons/svg/263/263142.svg"
//           width="60"
//           alt=""
//         />
//         <span className={s.amount}>{amount}</span>
//       </Link>
//     </div>
//   );

// const mapState = state => ({
//   isAuthenticated: selectors.isAuthenticated(state),
// });

// export default connect(mapState)(CartIcon);
