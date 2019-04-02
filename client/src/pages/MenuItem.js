// import React from 'react';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import MenuItem from '../modules/menu/MenuItemContainer';
import { menuActions, menuSelectors, menuOperations } from '../modules/menu';
import s from '../modules/menu/MenuGrid.module.css';

// const MenuItemPage = ({ match }) => (
//   <div>
//     <MenuItem id={match.params.id} />
//   </div>
// );
// // Кнопка назад, сюда же можно остальные пропы прокинуть....1:17:40
// export default MenuItemPage;

class MenuItemPage extends Component {
  componentDidMount() {
    const { getMenuItemById, match } = this.props;
    getMenuItemById(match.params.id);
    // из mapDispatchToProps
  }

  handleGoBack = () => {
    const { state } = this.props.location;
    // const { category } = this.state;
    // state это поле в location, а не state - состояние
    // Если есть запись в state, откуда пришли, добавляем в историю эту запись
    if (state) {
      return this.props.history.push(state.from);
    }
    // В противном случае, добавляем руками
    this.props.history.push({
      pathname: '/menu',
      // search: `?category=${category}`,
    });
  };

  render() {
    const { match, ...restProps } = this.props;
    return (
      <div>
        <br />
        <button className={s.buttonCart} onClick={this.handleGoBack}>
          Назад к меню
        </button>
        <MenuItem id={match.params.id} {...restProps} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  menu: menuSelectors.getItemById(state),
  loading: menuSelectors.loading(state),
  // categories: menuSelectors.getCategories(state),
  // error: menuSelectors.error(state),
});

const mapDispatchToProps = {
  getMenuItemById: menuOperations.getMenuItemById,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MenuItemPage);
