import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Card from "../../components/Card/Card";
import './Detail.css'

const Detail = () => {
  const { id } = useParams();
  const [country, setCountry] = useState({});

  useEffect(() => {
    fetch(`http://localhost:3001/countries/${id}`)
      .then((res) => res.json())
      .then((data) => setCountry(data));
  }, [id]);

  return (
    <div className="detail-container">
      <div className="detail-back-button">
        <Link to="/home">Back to Home</Link>
      </div>
      <div className="detail-card-container">
        {
          <Card
            name={country.name}
            image={country.flags}
            continent={country.continents}
            capital={country.capital}
            subregion={country.subregion}
            area={country.area}
            population={country.population}
            activities={country.activities || []}
          />
        }
      </div>
    </div>
  );
};

export default Detail;
