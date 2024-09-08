import "./SearchResult.css";
import PropTypes from "prop-types";

export const SearchResult = ({ result }) => {
  return (
    <div className="search-result"
    onClick={() => alert(`You selected ${result}!`)}
    >
    {result.nom}
    </div>
  )
}
SearchResult.propTypes ={
    result: PropTypes.string.isRequired,
};