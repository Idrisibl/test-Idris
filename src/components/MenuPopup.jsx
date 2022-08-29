import React from "react";
import { Link } from "react-router-dom";

const MenuPopup = () => {
  return (
    <ul className="popup">
      <li className="popup__link">
        <Link to="/">Список заказов</Link>
      </li>
      <li className="popup__link">Еще пункт меню</li>
      <li className="popup__link">О компании</li>
    </ul>
  );
};

export default MenuPopup;
