import React, { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getActivities, getCountries } from "../../redux/actions";
import "./Form.css";
import validate from "./utils/Validations";
import { postActivity } from "./utils/postActiv";
import "./Form.css";

const Form = () => {
  const dispatch = useDispatch();
  const countries = useSelector((state) =>
    state.countries.sort((a, b) => a.name.localeCompare(b.name))
  );
  const [activity, setActivity] = useState({
    name: "",
    difficulty: "",
    duration: 0,
    season: "",
    countries: [],
  });
  const [errors, setErrors] = useState({});
  const [selected, setSelected] = useState([]);
  const existingActivities = useSelector((state) => state.activities);

  useEffect(() => {
    dispatch(getCountries());
    dispatch(getActivities());
    const newErrors = validate(activity);
    setErrors(newErrors);
  }, [dispatch, activity]);

  const handleChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;
    setActivity({
      ...activity,
      [property]: value,
    });
  };

  const handleCheckbox = (event) => {
    const value = event.target.value;
    const check = event.target.checked;

    if (check) {
      setActivity({
        ...activity,
        season: [...activity.season, value],
      });
    } else {
      setActivity({
        ...activity,
        season: activity.season.filter((seas) => seas !== value),
      });
    }
  };

  const handleCountries = (event) => {
    const value = event.target.value;
    setActivity({
      ...activity,
      countries: [...activity.countries, value],
    });
    const countryId = countries.find((coun) => coun.id === value);
    setSelected([
      ...selected,
      { id: value, name: countryId.name, image: countryId.flags },
    ]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const nameExists = existingActivities.some(
      (a) => a.name.toLowerCase() === activity.name.toLowerCase()
    );

    if (nameExists) {
      setErrors({ name: "An activity with this name already exists" });
      return;
    }

    try {
      const a = await postActivity(activity);
      alert(`Activity ${a.name} added successfully!`);
      window.location.reload();
    } catch (error) {
      alert(error);
    }
  };

  const deleteCountry = (id) => {
    setSelected(selected.filter((sel) => sel.id !== id));
    setActivity({
      ...activity,
      countries: activity.countries.filter((coun) => coun.id !== id),
    });
  };

  return (
    <div className="form-container">
      <section className="form-section">
        <h1>CREATE NEW ACTIVITY</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <div>
              <h2>Form: </h2>
              <div>
                <div>
                  <label htmlFor="name">Name: </label>
                  <input
                    type="text"
                    autoComplete="off"
                    name="name"
                    value={activity.name}
                    onChange={handleChange}
                  />
                  {errors.name ? (
                    <small>{errors.name}</small>
                  ) : (
                    <small>&nbsp;</small>
                  )}
                </div>
                <div>
                  <label htmlFor="difficulty">Difficulty: </label>
                  <select name="difficulty" onChange={handleChange}>
                    <option value="0">Select an option</option>
                    <option value="1">Easy</option>
                    <option value="2">Normal</option>
                    <option value="3">Hard</option>
                    <option value="4">Professional</option>
                    <option value="5">Extreme</option>
                  </select>
                  {errors.difficulty ? (
                    <small>{errors.difficulty}</small>
                  ) : (
                    <small>&nbsp;</small>
                  )}
                </div>
                <div>
                  <label htmlFor="duration">Duration (in hours): </label>
                  <input
                    type="number"
                    name="duration"
                    min="1"
                    value={activity.duration}
                    onChange={handleChange}
                  />
                  {errors.duration ? (
                    <small>{errors.duration}</small>
                  ) : (
                    <small>&nbsp;</small>
                  )}
                </div>
                <div>
                  <label>Seasons: </label>
                  <div>
                    <label htmlFor="summer">
                      <input
                        type="checkbox"
                        name="summer"
                        value="summer"
                        onChange={handleCheckbox}
                      />
                      &nbsp;Summer
                    </label>
                    <label htmlFor="fall">
                      <input
                        type="checkbox"
                        name="fall"
                        value="fall"
                        onChange={handleCheckbox}
                      />
                      &nbsp;Fall
                    </label>
                    <label htmlFor="winter">
                      <input
                        type="checkbox"
                        name="winter"
                        value="winter"
                        onChange={handleCheckbox}
                      />
                      &nbsp;Winter
                    </label>
                    <label htmlFor="spring">
                      <input
                        type="checkbox"
                        name="spring"
                        value="spring"
                        onChange={handleCheckbox}
                      />
                      &nbsp;Spring
                    </label>
                  </div>
                  {errors.season ? (
                    <small>{errors.season}</small>
                  ) : (
                    <small>&nbsp;</small>
                  )}
                </div>
                <div>
                  <label htmlFor="countris">Countries: </label>
                  <select
                    name="countries"
                    id="country"
                    onChange={handleCountries}
                  >
                    <option value="0">Select Countries</option>
                    {countries.map((coun) => {
                      return (
                        <option key={coun.id} value={coun.id}>
                          {coun.name}
                        </option>
                      );
                    })}
                  </select>
                  {errors.countries ? (
                    <small>{errors.countries}</small>
                  ) : (
                    <small>&nbsp;</small>
                  )}
                </div>
              </div>
            </div>
            <div>
              <h2>Countries Selected</h2>
              {selected.map((country) => {
                return (
                  <div key={country.id}>
                    <div className="flag-image">
                      <img src={country.image} alt="" />
                    </div>
                    <p>{country.name}</p>

                    <button onClick={() => deleteCountry(country.id)}>
                      <FaTrashAlt />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            {Object.keys(errors).length ? (
              <input type="submit" disabled value="Create Activity" />
            ) : (
              <input type="submit" value="Create Activity" />
            )}
          </div>
          <div>
            <Link to="/home" className="btn-home">
              Back to Home
            </Link>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Form;
