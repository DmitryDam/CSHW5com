import React from "react";

const OrderList = ({ items, onShowMoreInfo, onDelete }) => (
  <table>
    <tbody>
      <tr>
        <th>Date</th>
        <th>Price</th>
        <th>Address</th>
        <th>Raiting</th>
      </tr>
      {items.map(item => (
        <tr key={item.id}>
          <td>{item.date}</td>
          <td>{item.price}</td>
          <td>{item.address}</td>
          <td>{item.raiting}</td>
          <td>
            <button type="button" onClick={e => onShowMoreInfo(item.id, e)}>
              Детальнее
            </button>
            <button type="button" onClick={e => onDelete(item.id, e)}>
              Удалить
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default OrderList;
