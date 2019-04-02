import React from 'react';

const styles = {
  select: {
    fontSize: 20,
    // marginLleft: 20 px,
  },
};

const CategorySelector = ({ options, value, onChange }) => (
  <select
    style={styles.select}
    // value={currentCategory} значение категории берет из строки запроса, а не состояния
    // Если написать руками категорию в строке и нажать ентер, перейдет туда
    value={value}
    onChange={e => onChange(e.target.value)}
  >
    {options.map(o => (
      <option key={o.id} value={o.name}>
        {o.name}
      </option>
    ))}
  </select>
);

export default CategorySelector;

// Пример для селектора lifecycle and api
// handleCategoryChange = evt => {
//   this.setState({
//     category: evt.target.value
//   });
// };

// Пример из этого случая   handleCategoryChange = category => {
//   this.props.history.push({
//     pathname: this.props.location.pathname,
//     search: `category=${category}`
//   });
// };
