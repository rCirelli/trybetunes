import React from 'react';
import PropTypes from 'prop-types';
import '../heartCheckbox.css';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  state = { isLoading: false, isChecked: false };

  onCheckboxChange = () => {
    const { musicIndex, musicsArr } = this.props;

    this.setState({ isLoading: true },
      async () => {
        await addSong(musicsArr[musicIndex]);
        this.setState({ isLoading: false, isChecked: true });
      });
  };

  render() {
    const { trackId, trackName, audioPreview, musicIndex, musicsArr } = this.props;
    const { isLoading, isChecked } = this.state;

    const heartCheckbox = (
      <div style={ { transform: 'scale(0.22)', marginTop: '4px' } }>
        <input
          data-testid={ `checkbox-music-${trackId}` }
          type="checkbox"
          name="favorite"
          id={ trackId }
          value={ musicsArr[musicIndex] }
          onChange={ this.onCheckboxChange }
          checked={ isChecked }
          className="appearance-none outline-none heartCHeckbox opacity-40"
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
          { isLoading ? <Loading /> : heartCheckbox }
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
};

export default MusicCard;
