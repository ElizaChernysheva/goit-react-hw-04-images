import React,{useState} from 'react';
import css from './SearchBar.module.css'
import PropTypes from 'prop-types';

export const SearchBar = ({onSubmit}) => {
  const [input,setInput] = useState('')

 const handleOnChange = (event) => {
    const {value} = event.target
     setInput(value)
  }

  const handleOnSubmit = (event) => {
    event.preventDefault();
    onSubmit(input)
  }

    return(
      <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={handleOnSubmit}>
        <button className={css.SearchFormButton} type='submit' >
          <span className={css.SearchFormButtonLabel}>Search</span>
        </button>
        <input className={css.SearchFormInput}
               type='text'
               name="input"
               autoFocus
               required
               placeholder='Search images and photos'
               onInput={handleOnChange}
               value={input}
        />
      </form>
      </header>
    )
};

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}
