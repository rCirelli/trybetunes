import React from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends React.Component {
  state = { favoriteSongsList: [], isLoading: false };

  componentDidMount() {
    this.updateFavorites();
  }

  updateFavorites = async () => {
    this.setState({ isLoading: true },
      async () => {
        const favoriteSongsList = await getFavoriteSongs();

        this.setState({ favoriteSongsList, isLoading: false });
      });
  }

  render() {
    const { favoriteSongsList, isLoading } = this.state;

    return (
      <>
        <Header />
        <div
          data-testid="page-favorites"
          className="flex flex-col items-center w-3/5 mx-auto
            outline outline-offset-2 outline-1 outline-sky-700 rounded-md px-5 m-10"
        >
          <h1 className="text-2xl border-b border-sky-700 py-6 w-full text-center ">
            My favorite songs
          </h1>
          <div
            className="p-9 w-full flex flex-col justify-center items-center
            pl-10 pr-5 gap-5"
          >
            {
              isLoading
                ? <Loading />
                : favoriteSongsList
                  .map((
                    { artistName,
                      trackName,
                      trackId,
                      previewUrl,
                      artworkUrl100 }, musicIndex, arr,
                  ) => {
                    const isFavorite = favoriteSongsList
                      .some((track) => track.trackId === trackId);
                    return (
                      <MusicCard
                        displayArt
                        artworkUrl={ artworkUrl100 }
                        isFavorite={ isFavorite }
                        musicIndex={ musicIndex }
                        musicsArr={ arr }
                        key={ trackId }
                        trackId={ trackId }
                        artistName={ artistName }
                        trackName={ trackName }
                        audioPreview={ previewUrl }
                        updateFavorites={ this.updateFavorites }
                      />
                    );
                  })
            }
          </div>
        </div>
      </>
    );
  }
}

export default Favorites;
