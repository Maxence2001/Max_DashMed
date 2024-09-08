import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import "./SearchBar.css";
import PropTypes from "prop-types";

export const SearchBar = ({ setResults }) => {
  // State pour gérer la valeur de l'input
    const [input, setInput] = useState("");
// Fonction pour récupérer les données en fonction de la valeur de l'input
  const fetchData = (value) => {
    console.log('Fetching data for:', value);
    fetch(`http://localhost:5000/patients?search=${value}`)
      .then((response) => response.json())
      .then((json) => {
        console.log('Data received:', json);
        setResults(json);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

//   `http://localhost:5000/patients?search=${searchTerm}`);
 // Fonction pour gérer le changement de la valeur de l'input
  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
  };
  return (
    <div className="input-wrapper">
      <FaSearch id="search-icon" />
      <input
        placeholder="Type to search..."
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  )
}
SearchBar.propTypes = {
    setResults: PropTypes.func.isRequired,
};