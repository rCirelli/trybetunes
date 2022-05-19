import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class MenuButton extends React.Component {
  render() {
    const { text, id, url } = this.props;
    return (
      <Link to={ `${url}` }>
        <div
          data-testid={ id }
          className="bg-slate-900 outline outline-offset-2 outline-1 outline-sky-500
          rounded-full py-2 px-7 text-slate-300"
        >
          { text }
        </div>
      </Link>
    );
  }
}

MenuButton.propTypes = {
  text: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default MenuButton;
