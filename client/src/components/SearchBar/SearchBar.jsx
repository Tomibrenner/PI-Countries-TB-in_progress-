import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getCountryByName } from "../../redux/actions";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");

  const handleChange = (event) => {
    const value = event.target.value;
    setSearchValue(value);
    dispatch(getCountryByName(value));
  };

  return (
    <div>
      <input
        type="text"
        palaceholder="Search Country..."
        value={searchValue}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchBar;
