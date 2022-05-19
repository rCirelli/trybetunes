import React from 'react';
import PropType from 'prop-types';
import { Link } from 'react-router-dom';

class AlbumCard extends React.Component {
  render() {
    const { artistName, collectionId, albumName, albumCover } = this.props;

    return (
      <div
        className="outline outline-1 outline-sky-700 rounded-lg text-center pb-4"
      >
        <div
          className="flex flex-col justify-evenly items-center h-80"
        >
          <img
            src={ albumCover.replace('100x100', '400x400') }
            alt={ albumName }
            className="w-full p-4"
          />
          <p
            className="italic antialiased font-bold text-center px-3 whitespace-pre-line"
          >
            { albumName }
          </p>
          <p className="font-thin mb-3">{ artistName }</p>
        </div>
        <Link to={ `/album/${collectionId}` }>
          <button
            data-testid={ `link-to-album-${collectionId}` }
            type="button"
            className="text-white bg-gradient-to-r from-blue-500 via-blue-600
            to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none
            focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-full
            text-xs px-5 py-1 text-center disabled:opacity-30"
          >
            Go to album
          </button>
        </Link>
      </div>
    );
  }
}

AlbumCard.propTypes = {
  artistName: PropType.string.isRequired,
  collectionId: PropType.number.isRequired,
  albumName: PropType.string.isRequired,
  albumCover: PropType.string.isRequired,
};

export default AlbumCard;