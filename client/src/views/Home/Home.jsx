import React, { useEffect, useState } from "react";
import { Footer } from "../index";
import { getCountries } from "../../redux/actions";
import { useSelector, useDispatch } from "react-redux";
import Cards from "../../components/Cards/Cards";
import './Home.css'

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

  const countriesPerPage = 10;
  const indexLastCoutnry = currentPage * countriesPerPage;
  const indexFirstCountry = indexLastCoutnry - countriesPerPage;
  
  const currentCountries = countries.slice(indexFirstCountry, indexLastCoutnry);

  return (
    <div className="container">
      <div className="button" >
        <button disabled={currentPage === 1} onClick={handlePrevPage}>
          Prev
        </button>
        <button
          disabled={indexLastCoutnry >= countries.length}
          onClick={handleNextPage}
        >
          Next
        </button>
      </div>
      <div className='card-container' >
        {currentCountries.map((country, index) => {
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
        })}
      </div>
        <div>
           <Footer />
        </div>
     
    </div>
  );
};

export default Home;
