import React from "react";
import { Link } from "react-router-dom";
import "./Card.css";

const Card = ({ image, name, continent, capital, population, id }) => {
  return (
    <Link to={`/countries/${id}`}>
      <div className="card">
        <img src={image} alt="" />
        <h2>{name}</h2>
        <h2>Continent: {continent}</h2>
        <h2>Capital: {capital}</h2>
        <h2>Population: {population}</h2>
      </div>
    </Link>
  );
};

export default Card;
