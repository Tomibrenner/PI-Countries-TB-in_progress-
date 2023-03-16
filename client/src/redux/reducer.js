import {
  GET_ALL_COUNTRIES,
  GET_ALL_ACTIVITIES,
  GET_COUNTRY_BY_NAME,
  FILTER_BY_CONTINENT,
  FILTER_BY_ACTIVITY,
  ORDER_BY_NAME,
  ORDER_BY_POPULATION,
  RESET_FILTERS,
  REMOVE_ACTIVITY
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
        (country) => country.continents === continent
      );

      return {
        ...state,
        countries: filteredCoutries,
      };

    case FILTER_BY_ACTIVITY:
      const activity = action.payload;
      const activityCountry = [...state.allCountries];
      const filteredActivities = activityCountry.filter((country) => {
        return country.activities.find((activ) => activ.name === activity);
      });

      return {
        ...state,
        countries: filteredActivities,
      };

    case ORDER_BY_NAME:
      const order = action.payload;
      let orderedCountries;
      const originalCountries = [...state.countries];
      if (order === "asc") {
        orderedCountries = originalCountries.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
      } else if (order === "desc") {
        orderedCountries = originalCountries.sort((a, b) =>
          b.name.localeCompare(a.name)
        );
      }

      return {
        ...state,
        countries: orderedCountries,
      };

    case ORDER_BY_POPULATION:
      const orderPop = action.payload;
      const originalPop = [...state.countries];
      let orderedPop;
      if (orderPop === "Min-Max") {
        orderedPop = originalPop.sort((a, b) => a.population - b.population);
      } else if (orderPop === "Max-Min") {
        orderedPop = originalPop.sort((a, b) => b.population - a.population);
      }

      return {
        ...state,
        countries: orderedPop,
      };

    case RESET_FILTERS:
      return {
        ...state,
        allCountries: action.payload,
        countries: action.payload,
      };

      case REMOVE_ACTIVITY:
      const updatedActivities = state.activities.filter(
        (activity) => activity.id !== action.payload
        
      );
      console.log(action.payload);
      console.log(updatedActivities);
      return {
        ...state,
        activities: updatedActivities,
      };
 
    default:
      return { ...state };
  }
};
 
export default rootReducer;
