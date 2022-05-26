import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';

class Album extends React.Component {
  state = { albumDetails: [], favoriteSongsList: [], isFavLoading: false };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const albumDetails = await getMusics(id);

    this.setState({ albumDetails });
    this.updateFavorites();
  }

  updateFavorites = async () => {
    this.setState({ isFavLoading: true },
      async () => {
        const favoriteSongsList = await getFavoriteSongs();
        this.setState({ isFavLoading: false, favoriteSongsList });
      });
  }

  renderMusicsElement = () => {
    const { albumDetails, favoriteSongsList, isFavLoading } = this.state;

    if (albumDetails.length > 0) {
      return (
        <div
          className="flex justify-center
          outline outline-offset-2 outline-1 outline-sky-700 rounded-md p-5"
        >
          <div className="pr-5 border-r border-sky-700">
            <img
              // src={ albumDetails[0].artworkUrl100.replace('100x100', '250x250') }
              src={ albumDetails[0].artworkUrl100 }
              alt={ albumDetails[0].collectionName }
            />
            <h2
              data-testid="album-name"
              className="text-3xl mt-3"
            >
              { albumDetails[0].collectionName }
            </h2>
            <h1
              data-testid="artist-name"
              className="text-xl font-extralight antialiased"
            >
              { albumDetails[0].artistName }
            </h1>
          </div>
          <div
            className="pl-10 pr-5 flex flex-col gap-5
            flex flex-col justify-center items-center"
          >
            {
              isFavLoading
                ? <Loading />
                : albumDetails.filter((_info, i) => i > 0)
                  .map(({ trackName, trackId, previewUrl }, musicIndex, arr) => {
                    const isFavorite = favoriteSongsList
                      .some((track) => track.trackId === trackId);
                    return (
                      <MusicCard
                        isFavorite={ isFavorite }
                        musicIndex={ musicIndex }
                        musicsArr={ arr }
                        key={ trackId }
                        trackId={ trackId }
                        trackName={ trackName }
                        audioPreview={ previewUrl }
                        updateFavorites={ this.updateFavorites }
                      />
                    );
                  })
            }
          </div>
        </div>
      );
    }
  }

  render() {
    return (
      <>
        <Header />
        <div
          data-testid="page-album"
          className="flex flex-col items-center p-10"
        >
          { this.renderMusicsElement() }
        </div>
      </>
    );
  }
}

Album.defaultProps = {
  match: {
    params: {
      id: '',
    },
  },
};

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }),
};

export default Album;
