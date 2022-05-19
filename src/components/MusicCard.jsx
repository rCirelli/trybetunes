import React from 'react';
import PropTypes from 'prop-types';
import '../heartCheckbox.css';

class MusicCard extends React.Component {
  render() {
    const { id, trackName, audioPreview } = this.props;

    return (
      <div
        key={ id }
        className="flex flex-col"
      >
        <p
          className="mb-1 italic antialiased"
        >
          { trackName }
        </p>
        <div className="flex items-center">
          <audio
            data-testid="audio-component"
            src={ audioPreview }
            className="h-7"
            controls
          >
            <track kind="captions" />
          </audio>
          <div style={ { transform: 'scale(0.22)' } }>
            <input
              type="checkbox"
              name="favorite"
              id={ id }
              value={ id }
              className="appearance-none outline-0 heartCHeckbox ml-2"
            />
          </div>

        </div>
      </div>
    );
  }
}

MusicCard.propTypes = {
  id: PropTypes.number.isRequired,
  trackName: PropTypes.string.isRequired,
  audioPreview: PropTypes.string.isRequired,
};

export default MusicCard;
