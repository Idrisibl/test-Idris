import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { changeOrderStatus, fetchOrder } from "../../redux/cardSlice";

const OrderPage = () => {
  const { id } = useParams();

  const order = useSelector((state) => state.card.order);

  const dispatch = useDispatch();

  const changeStatus = () => {
      dispatch(changeOrderStatus({ order, id }));
  };

  React.useEffect(() => {
    dispatch(fetchOrder(id));
  }, [id, dispatch]);

  if (!order) {
    return <>Загрузка...</>;
  }

  return (
    <div className="content">
      <h2>Подробности заказа</h2>
      <table>
        <tbody>
          <tr>
            <td>Номер заказа</td>
            <td>{order.orderNo}</td>
          </tr>
          <tr>
            <td>Имя получателя</td>
            <td>{order.clientName}</td>
          </tr>
          <tr>
            <td>Контактный номер</td>
            <td>{order.contactNumber}</td>
          </tr>
          <tr>
            <td>Адрес доставки</td>
            <td>{order.address}</td>
          </tr>
          <tr>
            <td>Комментарий к адресу</td>
            <td>{order.addressComment}</td>
          </tr>
          <tr>
            <td>Сумма к оплате</td>
            <td style={{ fontWeight: 700 }}>{order.amountToPay}</td>
          </tr>
          <tr>
            <td>Статус заказа</td>
            <td
              className={`${order.isDelivered ? "delivered" : "not-delivered"}`}
            >
              {order.isDelivered ? "Выдан" : "Не выдан"}
            </td>
          </tr>
        </tbody>
      </table>
      <div className="btn__wrapper">
        <button onClick={changeStatus}>
          {order.isDelivered ? "Отменить выдачу" : "Выдать заказ"}
        </button>
      </div>
    </div>
  );
};

export default OrderPage;
