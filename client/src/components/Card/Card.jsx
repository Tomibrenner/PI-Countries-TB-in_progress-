import React from "react";
import { FaTrashAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import "./Card.css";
import { removeActivity } from "../../redux/actions";

const Card = ({
  name,
  image,
  continent,
  capital,
  subregion,
  area,
  population,
  activities,
}) => {
  const dispatch = useDispatch();

  const handleDeleteActivity = (activityId) => {
    const answer = window.confirm(
      "Do you really want to delete this activity?"
    );
    if (answer) {
      dispatch(removeActivity(activityId));
       setTimeout(() => window.location.reload(), 1000);
    }
  };

  return (
    <div className="card-container">
      <div className="card-image">
        <img src={image} alt="" />
      </div>
      <div className="card-info">
        <h2>
          Country Name: <span>{name}</span>{" "}
        </h2>
        <h2>
          Continent: <span>{continent}</span>{" "}
        </h2>
        <h2>
          Capital: <span>{capital}</span>{" "}
        </h2>
        <h2>
          Sub Region: <span>{subregion}</span>{" "}
        </h2>
        <h2>
          Area:{" "}
          <span>
            {new Intl.NumberFormat("es-ES").format(area)} km
            <sup>2</sup>{" "}
          </span>
        </h2>
        <h2>
          Population:{" "}
          <span>{new Intl.NumberFormat("es-ES").format(population)} </span>
        </h2>
        {activities && activities.length > 0 ? (
          <div>
            <h2>ACTIVITIES</h2>
            {activities.map((activity) => (
              <div key={activity.id}>
                <p>
                  <strong>{activity.name}</strong>
                </p>
                <p>
                  <strong>Difficulty:</strong> {activity.difficulty}
                </p>
                <p>
                  <strong>Duration:</strong> {activity.duration}
                </p>
                <p>
                  <strong>Season:</strong> {activity.season.join(", ")}
                </p>
                <button onClick={() => handleDeleteActivity(activity.id)}>
                  <FaTrashAlt />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <h1>-No activities registered-</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
