import {
  GET_ALL_COUNTRIES,
  GET_ALL_ACTIVITIES,
  GET_COUNTRY_BY_NAME,
  FILTER_BY_CONTINENT,
  FILTER_BY_ACTIVITY,
  ORDER_BY_NAME,
  ORDER_BY_POPULATION,
  RESET_FILTERS,
  REMOVE_ACTIVITY,
} from "./types";
import axios from "axios";

export const getCountries = () => {
  return (dispatch) => {
    try {
      fetch("http://localhost:3001/countries")
        .then((res) => res.json())
        .then((data) => dispatch({ type: GET_ALL_COUNTRIES, payload: data }));
    } catch (error) {
      console.log(error);
      return dispatch({ type: GET_ALL_COUNTRIES, payload: [], error });
    }
  };
};

export const getActivities = () => {
  return (dispatch) => {
    try {
      fetch("http://localhost:3001/activities")
        .then((res) => res.json())
        .then((data) => dispatch({ type: GET_ALL_ACTIVITIES, payload: data }));
    } catch (error) {
      console.log(error);
      return dispatch({ type: GET_ALL_ACTIVITIES, payload: [], error });
    }
  };
};

export const getCountryByName = (name) => {
  return (dispatch) => {
    fetch(`http://localhost:3001/countries?name=${name}`)
      .then((res) => res.json())
      .then((data) => dispatch({ type: GET_COUNTRY_BY_NAME, payload: data }));
  };
};

export const filterByContinent = (continent) => {
  return {
    type: FILTER_BY_CONTINENT,
    payload: continent,
  };
};

export const filterByActivity = (activity) => {
  return {
    type: FILTER_BY_ACTIVITY,
    payload: activity,
  };
};

export const orderByName = (payload) => {
  return {
    type: ORDER_BY_NAME,
    payload,
  };
};

export const orderByPopulation = (population) => {
  return {
    type: ORDER_BY_POPULATION,
    payload: population,
  };
};

export const resetFilter = () => {
  return (dispatch) => {
    fetch("http://localhost:3001/countries")
      .then((res) => res.json())
      .then((data) => dispatch({ type: RESET_FILTERS, payload: data }));
  };
};

export const removeActivity = (activityId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:3001/activities/${activityId}/delete`
      );
      return dispatch({ type: REMOVE_ACTIVITY, payload: data });
    } catch (error) {
      return dispatch({ type: REMOVE_ACTIVITY, payload: [], error });
    }
  };
};
 