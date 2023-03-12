import {
  GET_ALL_COUNTRIES,
  GET_ALL_ACTIVITIES,
  GET_COUNTRY_BY_NAME,
  FILTER_BY_CONTINENT,
  FILTER_BY_ACTIVITY,
  ORDER_BY_NAME,
  ORDER_BY_POPULATION,
} from "./types";

const initialState = {
  allCountries: [],
  countries: [],
  activities: [],
  error: {},
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_COUNTRIES:
      return {
        ...state,
        allCountries: action.payload,
        countries: action.payload,
        error: action.error ? { message: action.error.message } : {},
      };

    case GET_ALL_ACTIVITIES:
      return {
        ...state,
        activities: action.payload,
        error: action.error ? { message: action.error.message } : {},
      };

    case GET_COUNTRY_BY_NAME:
      return {
        ...state,
        allCountries: action.payload,
        countries: action.payload,
      };

    case FILTER_BY_CONTINENT:
      const continent = action.payload;
      const filteredCoutries = state.allCountries.filter(
        (country) => country.continent === continent
      );

      return {
        ...state,
        countries: filteredCoutries,
      };

    case FILTER_BY_ACTIVITY:
      const activity = action.payload;
      const filteredActivities = state.allCountries.filter((country) =>
        country.activities.filter((activ) => activ.name === activity)
      );

      return {
        ...state,
        countries: filteredActivities,
      };

    case ORDER_BY_NAME:
      const orderName = action.payload;
      let orderedCountries;
      if (orderName === "A-Z") {
        orderedCountries = state.countries.sort((a, b) =>
          a.name.localCompare(b.name)
        );
      } else if (orderName === "Z-A") {
        orderedCountries = state.countries.sort((a, b) =>
          b.name.localCompare(a.name)
        );
      } else {
        orderedCountries = state.allCountries;
      }

      return {
        ...state,
        countries: orderedCountries,
      };

    case ORDER_BY_POPULATION:
      const orderPop = action.payload;
      let orderedPop;
      if (orderPop === "Max-Min") {
        orderedPop = state.countries.sort((a, b) =>
          a.population.localCompare(b.population)
        );
      } else if (orderPop === "Min-Max") {
        orderedPop = state.countries.sort((a, b) =>
          b.population.localCompare(a.population)
        );
      } else {
        orderedPop = state.allCountries;
      }

      return {
        ...state,
        countries: orderedPop,
      };

    default:
      return { ...state };
  }
};

export default rootReducer;
