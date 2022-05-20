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

  componentDidUpdate() {
    // const { updateFavorites } = this.props;
    // updateFavorites();
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
        // () => updateFavorites());
      });
  };

  render() {
    const {
      trackId,
      trackName,
      audioPreview,
      isFavorite } = this.props;

    const { isCheckLoading, isChecked } = this.state;

    const heartCheckbox = (
      <div style={ { transform: 'scale(0.22)', marginTop: '4px' } }>
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
      </div>
    );

    return (
      <div
        key={ trackId }
        className="flex flex-col"
      >
        <p
          className="-mb-3 italic antialiased"
        >
          { trackName }
        </p>
        <div className="flex items-center border-b border-sky-600 pb-3">
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
    );
  }
}

MusicCard.propTypes = {
  trackId: PropTypes.number.isRequired,
  trackName: PropTypes.string.isRequired,
  audioPreview: PropTypes.string.isRequired,
  musicIndex: PropTypes.number.isRequired,
  musicsArr: PropTypes.arrayOf(PropTypes.object).isRequired,
  isFavorite: PropTypes.bool.isRequired,
  updateFavorites: PropTypes.func.isRequired,
};

export default MusicCard;
