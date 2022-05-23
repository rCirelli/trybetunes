import React from 'react';
import PropTypes from 'prop-types';
import '../heartCheckbox.css';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import CircleLoading from './CircleLoading';

class MusicCard extends React.Component {
  state = { isCheckLoading: false, isChecked: false };

  componentDidMount() {
    const { isFavorite } = this.props;

    this.setState({ isChecked: isFavorite });
  }

  onCheckboxChange = () => {
    const { musicIndex, musicsArr, updateFavorites } = this.props;

    this.setState({ isCheckLoading: true },
      async () => {
        const { isChecked } = this.state;

        if (isChecked) {
          await removeSong(musicsArr[musicIndex]);
          updateFavorites();
        } else {
          await addSong(musicsArr[musicIndex]);
          updateFavorites();
        }
        this.setState({ isCheckLoading: false, isChecked: !isChecked });
      });
  };

  render() {
    const {
      trackId,
      trackName,
      audioPreview,
      isFavorite,
      musicIndex,
      displayArt,
      artworkUrl } = this.props;

    const { isCheckLoading, isChecked } = this.state;

    const heartCheckbox = (
      <label
        htmlFor={ trackId }
        style={ { transform: 'scale(0.22)', marginBottom: '-1.6rem' } }
      >
        <p className="scale-0">Favorita</p>
        <input
          data-testid={ `checkbox-music-${trackId}` }
          type="checkbox"
          name="favorite"
          id={ trackId }
          value={ isFavorite }
          checked={ isChecked }
          className="appearance-none outline-none heartCHeckbox opacity-40"
          onChange={ this.onCheckboxChange }
        />
      </label>
    );

    const albumArt = (
      <div className="w-20 mr-5">
        <img
          src={ artworkUrl.replace('100x100', '400x400') }
          alt={ trackName }
          className="w-full rounded-2xl outline outline-1 outline-sky-700"
        />
      </div>
    );

    return (
      <div className="flex items-center">
        { displayArt && albumArt }
        <div
          key={ trackId }
          className="flex flex-col"
        >
          <span
            className="-mb-5 italic antialiased flex gap-2 text-slate-300"
          >
            <p className="text-slate-500">{ `${musicIndex} .` }</p>
            <p>{ trackName }</p>
          </span>
          <div className="flex items-end border-b border-sky-600 pb-4 -mb-1">
            <audio
              data-testid="audio-component"
              src={ audioPreview }
              className="h-7"
              controls
            >
              <track kind="captions" />
            </audio>
            { isCheckLoading ? <CircleLoading /> : heartCheckbox }
          </div>
        </div>
      </div>
    );
  }
}

MusicCard.defaultProps = {
  displayArt: false,
  artworkUrl: '',
};

MusicCard.propTypes = {
  displayArt: PropTypes.bool,
  artworkUrl: PropTypes.string,
  trackId: PropTypes.number.isRequired,
  trackName: PropTypes.string.isRequired,
  audioPreview: PropTypes.string.isRequired,
  musicIndex: PropTypes.number.isRequired,
  musicsArr: PropTypes.arrayOf(PropTypes.object).isRequired,
  isFavorite: PropTypes.bool.isRequired,
  updateFavorites: PropTypes.func.isRequired,
};

export default MusicCard;
