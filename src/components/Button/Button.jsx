import React from 'react';
import css from './Button.module.css'
import PropTypes from 'prop-types';

export const Button = ({addPictures}) => {
  return (
    <>
      <button className={css.Button} type='button' onClick={addPictures}>Load More</button>
    </>
  );
};

Button.propTypes = {
  addPictures: PropTypes.func.isRequired,
}
