import React from "react";
import { Link } from "react-router-dom";
import "./Cards.css";

const Card = ({ image, name, continent, capital, id }) => {
  return (
    <Link to={`/countries/${id}`}>
      <div className="card">
        <img src={image} alt="" />
        <h2>{name}</h2>
        <h2>Continent: {continent}</h2>
        <h2>Capital: {capital}</h2>
      </div>
    </Link>
  );
};

export default Card;
