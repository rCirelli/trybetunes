import React from 'react';
import PropTypes from 'prop-types';

class Button extends React.Component {
  render() {
    const { text, disabled, id, onClick } = this.props;
    return (
      <button
        data-testid={ id }
        type="button"
        disabled={ disabled }
        className="text-white bg-gradient-to-r from-blue-500 via-blue-600
        to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none
        focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg
        text-sm px-5 py-2 text-center disabled:opacity-30"
        // className="rounded-md bg-sky-700 p-1 disabled:opacity-30 hover:bg-sky-600"
        onClick={ onClick }
      >
        { text }
      </button>

    );
  }
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Button;
