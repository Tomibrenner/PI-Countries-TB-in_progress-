import React, { useEffect, useState } from "react";
import { Footer } from "../index";
import { getCountries } from "../../redux/actions";
import { useSelector, useDispatch } from "react-redux";
import Cards from "../../components/Cards/Cards";
import "./Home.css";
import SearchBar from "../../components/SearchBar/SearchBar";
import Filters from "../../components/Filters/Filters";
import { Link } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countries);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => prev - 1);
  };

  const handleFirstPage = () => {
    setCurrentPage(1);
  };

  const handleLastPage = () => {
    setCurrentPage(totalPages);
  };

  const countriesPerPage = 10;
  const indexLastCoutnry = currentPage * countriesPerPage;
  const indexFirstCountry = indexLastCoutnry - countriesPerPage;

  const currentCountries =
    countries && Array.isArray(countries)
      ? countries.slice(indexFirstCountry, indexLastCoutnry)
      : [];

  const totalPages = Math.ceil(countries.length / countriesPerPage);

  return (
    <div className="container">
    <div className="button-container">
      <Link to='/activities' className="create-activity-link">Create Activity</Link>
    </div>
    <div className="search-container">
      <SearchBar />
    </div>
    <div className="filters-container">
      <Filters />
      </div>
      <div className="button">
        <button disabled={currentPage === 1} onClick={handleFirstPage}>
          First
        </button>
        <button disabled={currentPage === 1} onClick={handlePrevPage}>
          Prev
        </button>
        <p>
          {currentPage}/{totalPages}
        </p>
        <button
          disabled={indexLastCoutnry >= countries.length}
          onClick={handleNextPage}
        >
          Next
        </button>
        <button
          disabled={indexLastCoutnry >= countries.length}
          onClick={handleLastPage}
        >
          Last
        </button>
      </div>
      <div className="card-container">
        {currentCountries.length ? (
          currentCountries.map((country, index) => {
            return (
              <Cards
                key={index}
                id={country.id}
                image={country.flags}
                name={country.name}
                continent={country.continents}
                capital={country.capital}
              />
            );
          })
        ) : (
          <p>Country doesn't exist</p>
        )}
      </div>
      <footer>
        <Footer />
      </footer>
        
      
    </div>
  );
};
 
export default Home;
