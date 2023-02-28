import PropTypes from 'prop-types';
import Style from "./SearchBar.module.css"
import { useState } from 'react';

const SearchBar = ({updateSearch}) => {

  const [searches, setSearches] = useState(``)

  const changeInput = ({target}) => {
  const {value} = target;
        setSearches(value)
  }
  const submitForm = (e) => {
    e.preventDefault();
    updateSearch(searches)
  }

    return (
    <form className={Style.form} onSubmit={submitForm}>
    <input
      className={Style.input}
      type="text"
      name="search"
      autoComplete="off"
      autoFocus
      placeholder="Search images and photos"
      onChange={changeInput}
    />
    <button type="submit" className={Style.button}>
      <span className={Style.buttonLabel}>Search</span>
    </button>
  </form>
        )
}
SearchBar.propTypes = {
updateSearch: PropTypes.func
}
export default SearchBar