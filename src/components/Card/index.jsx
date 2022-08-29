import React from "react";
import { Link } from "react-router-dom";

const Card = ({ item }) => {
  return (
    <Link to={`${item.id}`} className="card">
      <h2 className="card__title">{item.orderNo}</h2>
      <div className="card__name">{item.clientName}</div>
      <div className="card__address">{item.address}</div>
      <div className="card__position">{item.position}</div>
    </Link>
  );
};

export default Card;
