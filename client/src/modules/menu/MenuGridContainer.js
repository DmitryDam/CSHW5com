import React, { Component } from 'react';
import queryString from 'query-string';
import { Link } from 'react-router-dom';
import routes from '../../configs/routes';
import CategorySelector from './CategorySelector';
import MenuGrid from './MenuGridView';
import Loader from '../../components/Loader';
import s from './MenuGrid.module.css';

const getCategoryFromProps = props =>
  queryString.parse(props.location.search).category;
// Logic
export default class MenuGridContainer extends Component {
  state = {
    filter: false,
  };

  async componentDidUpdate(prevProps1) {
    const prevCategory = getCategoryFromProps(prevProps1);
    const nextCategory = getCategoryFromProps(this.props);
    const { getMenuItemsWithCategory, getAllMenu1 } = this.props;

    console.log('prevCategory: ', prevCategory);
    console.log('nextCategory: ', nextCategory);

    if (prevCategory === nextCategory) return;
    if (this.props.location.search === '?all') {
      try {
        getAllMenu1();
      } catch (error) {}
      return;
    }
    try {
      getMenuItemsWithCategory(nextCategory);
    } catch (error) {}
  }

  // 13:00 метод добавляет в строку запроса параметры при выборе селектом категории
  // this.props.location.pathname  добавляет текущий путь
  // search: `category=${category}` - добавляет выбранную категорию
  //   К примеру используется select для выбора категории статей. Тогда при выборе опции необходимо
  // обновлять URL используя метод history.push() для добавления новой записи в журнал истории.
  // Берем текущее значение location.pathname и обновляем search.
  handleCategoryChange = category => {
    this.setState({ filter: true });
    this.props.history.push({
      pathname: this.props.location.pathname,
      search: `category=${category}`,
    });
  };

  handleClearSelector = () => {
    const { history } = this.props;
    const { location } = this.props;
    this.setState({ filter: false });
    history.push({
      pathname: location.pathname,
      search: 'all',
    });
  };
  // Пример запроса (async await) в публичном методе класса
  // *************************************************************
  // (async () => {
  //   try {
  //     const menu = await API.getAllMenuItems();
  //     console.log(menu);
  //     this.setState({ menu, loading: false });
  //   } catch (error) {
  //     this.setState({ error, loading: false });
  //   }
  // })();

  render() {
    const { filter } = this.state;
    const {
      location,
      menu,
      IdsMenu,
      loading,
      categories,
      error,
      addToCart,
      isAuthenticated,
    } = this.props;
    console.log(queryString.parse(location.search));
    const currentCategory = getCategoryFromProps(this.props);
    return (
      <div>
        {/* {isAuthenticated && (
          <div className={s.addMenu}>
            <Link to={`${routes.MENU_ADD}`}>Добавить элемент меню</Link>
          </div>
        )} */}
        {isAuthenticated
          ? !loading && (
              <div className={s.addMenu}>
                <Link to={`${routes.MENU_ADD}`}>Добавить элемент меню</Link>
              </div>
            )
          : !loading && (
              <div className={s.greenText}>
                <span>
                  Для получения полного доступа к возможностям сервиса, пройдите
                  регистрацию (SignUp)
                </span>
              </div>
            )}
        <br />
        {/* <br /> */}
        {!loading && (
          <CategorySelector
            options={categories}
            value={currentCategory}
            // value={currentCategory} значение категории берет из строки запроса, а не состояния
            // Если написать руками категорию в строке и нажать ентер, перейдет туда
            onChange={this.handleCategoryChange}
          />
        )}
        {filter && (
          <button type="button" onClick={this.handleClearSelector}>
            Убрать фильтр
          </button>
        )}
        {filter && (
          <p>Фильтр установлен на: {getCategoryFromProps(this.props)}</p>
        )}
        {loading && <Loader />}
        {error && <h1>Error</h1>}
        {menu.length > 0 && (
          <MenuGrid items={menu} IdsMenu={IdsMenu} addToCart={addToCart} />
        )}
      </div>
    );
  }
}

// without redux version

// import React, { Component } from 'react';
// import queryString from 'query-string';
// import { Link } from 'react-router-dom';
// import routes from '../../configs/routes';
// import CategorySelector from './CategorySelector';
// import MenuGrid from './MenuGridView';
// import Loader from '../../components/Loader';
// import * as API from '../../services/api';

// const getCategoryFromProps = props =>
//   queryString.parse(props.location.search).category;
// // Logic
// export default class MenuGridContainer extends Component {
//   state = {
//     menu: {},
//     categories: [],
//     loading: false,
//     filter: false,
//     error: null,
//   };

//   async componentDidMount() {
//     this.setState({ loading: true });

//     try {
//       const menu = await API.getAllMenuItems();
//       console.log(menu);
//       const categories = await API.getCategories();
//       console.log(categories);

//       this.setState({ menu, categories, loading: false });
//     } catch (error) {
//       this.setState({ error, loading: false });
//     }
//   }

//   async componentDidUpdate(prevProps1) {
//     const prevCategory = getCategoryFromProps(prevProps1);
//     const nextCategory = getCategoryFromProps(this.props);

//     console.log('prevCategory: ', prevCategory);
//     console.log('nextCategory: ', nextCategory);

//     if (prevCategory === nextCategory) return;
//     // handleCategoryChange
//     try {
//       const menu = await API.getMenuItemsWithCategory(nextCategory);
//       console.log(menu);

//       this.setState({ menu, loading: false });
//     } catch (error) {
//       this.setState({ error, loading: false });
//     }
//     // handleClearSelector
//     if (this.props.location.search === '?all') {
//       this.setState({ loading: true });

//       try {
//         const menu = await API.getAllMenuItems();
//         this.setState({ menu, loading: false });
//       } catch (error) {
//         this.setState({ error, loading: false });
//       }
//     }
//   }

//   // 13:00 метод добавляет в строку запроса параметры при выборе селектом категории
//   // this.props.location.pathname  добавляет текущий путь
//   // search: `category=${category}` - добавляет выбранную категорию
//   //   К примеру используется select для выбора категории статей. Тогда при выборе опции необходимо
//   // обновлять URL используя метод history.push() для добавления новой записи в журнал истории.
//   // Берем текущее значение location.pathname и обновляем search.
//   handleCategoryChange = category => {
//     this.setState({ filter: true });
//     this.props.history.push({
//       pathname: this.props.location.pathname,
//       search: `category=${category}`,
//     });
//   };

//   handleClearSelector = () => {
//     const { history } = this.props;
//     const { location } = this.props;
//     this.setState({ filter: false });
//     history.push({
//       pathname: location.pathname,
//       search: 'all',
//     });
//     // Пример запроса (async await) в публичном методе класса
//     // *************************************************************
//     // (async () => {
//     //   try {
//     //     const menu = await API.getAllMenuItems();
//     //     console.log(menu);
//     //     this.setState({ menu, loading: false });
//     //   } catch (error) {
//     //     this.setState({ error, loading: false });
//     //   }
//     // })();
//   };

//   render() {
//     // const { match, location, history } = this.props;
//     const { menu, categories, loading, error, filter } = this.state;
//     console.log(queryString.parse(this.props.location.search));
//     const currentCategory = getCategoryFromProps(this.props);
//     return (
//       <div>
//         {!loading && (
//           <Link to={`${routes.MENU_ADD}`}>Добавить элемент меню</Link>
//         )}
//         <br />
//         <br />
//         {!loading && (
//           <CategorySelector
//             options={categories}
//             value={currentCategory}
//             // value={currentCategory} значение категории берет из строки запроса, а не состояния
//             // Если написать руками категорию в строке и нажать ентер, перейдет туда
//             onChange={this.handleCategoryChange}
//           />
//         )}
//         {filter && (
//           <button type="button" onClick={this.handleClearSelector}>
//             Убрать фильтр
//           </button>
//         )}
//         {filter && (
//           <p>Фильтр установлен на: {getCategoryFromProps(this.props)}</p>
//         )}
//         {loading && <Loader />}
//         {error && <h1>Error</h1>}
//         {menu.length > 0 && <MenuGrid items={menu} />}
//       </div>
//     );
//   }
// }
