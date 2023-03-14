import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterByContinent,
  resetFilter,
  orderByName,
  orderByPopulation,
  getActivities,
  filterByActivity,
} from "../../redux/actions";

const Filters = () => {
  const dispatch = useDispatch();
  const [selectedContinent, setSelectedContinent] = useState("");
  const [orderName, setOrderName] = useState("");
  const activities = useSelector((state) => state.activities);
  const [orderActivity, setOrderActivity] = useState("");

  useEffect(() => {
    dispatch(getActivities());
  }, [dispatch]);

  const handleSelectFilter = (event) => {
    const value = event.target.value;
    setSelectedContinent(value);

    if (value === "0") {
      setOrderName("0");
      setOrderActivity("0");
      setSelectedContinent("0");
      dispatch(resetFilter());
    } else {
      dispatch(filterByContinent(value));
    }
  };

  const hadleSelectName = (event) => {
    const order = event.target.value;
    setOrderName(order);
    if (order === "0") {
      setOrderName("0");
      setOrderActivity("0");
      setSelectedContinent("0");
      dispatch(resetFilter());
    } else if (order === "asc" || order === "desc") {
      dispatch(orderByName(order));
    } else {
      dispatch(orderByPopulation(order));
    }
  };

  const handleSelectActivity = (event) => {
    const activityEvent = event.target.value;
    setOrderActivity(activityEvent);
    if (activityEvent === "0") {
      setOrderName("0");
      setOrderActivity("0");
      setSelectedContinent("0");
      dispatch(resetFilter());
    } else {
      dispatch(filterByActivity(activityEvent));
    }
  };

  return (
    <div>
      <select value={selectedContinent} onChange={handleSelectFilter}>
        <option value="0">Filter by Continet</option>
        <option value="Africa">Africa</option>
        <option value="Antarctica">Antarctica</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
        <option value="North America">North America</option>
        <option value="Oceania">Oceania</option>
        <option value="South America">South America</option>
      </select>

      <select value={orderName} onChange={hadleSelectName}>
        <option value="0">Order By</option>
        <option value="asc">A-Z</option>
        <option value="desc">Z-A</option>
        <option value="Min-Max">Min to Max Population</option>
        <option value="Max-Min">Max to Min Population</option>
      </select>

      <select value={orderActivity} onChange={handleSelectActivity}>
        <option value="0">Filter by Activity</option>
        {activities.map((activ) => {
          return (
            <option key={activ.id} value={activ.name}>
              {activ.name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Filters;
