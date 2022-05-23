import React from 'react';
import AlbumCard from '../components/AlbumCard';
import Button from '../components/Button';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  state = {
    searchInput: '',
    searchResults: [],
    searchedArtist: '',
    isButtonDisabled: true,
    isLoading: false,
    hasSearched: false,
  };

  onChangeHandler = ({ target }) => {
    const SEARCH_MIN_CHARACTER = 2;
    this.setState({ searchInput: target.value },
      () => {
        const { searchInput } = this.state;
        const enableButton = searchInput.length < SEARCH_MIN_CHARACTER;
        this.setState({ isButtonDisabled: enableButton });
      });
  }

  onButtonClick = async () => {
    const { searchInput } = this.state;

    this.setState({ isLoading: true },
      async () => {
        const searchedArtist = searchInput;
        const searchResults = await searchAlbumsAPI(searchInput);
        this.setState(
          {
            searchResults,
            searchedArtist,
            hasSearched: true,
            isLoading: false,
            searchInput: '' },
        );
      });
  }

  render() {
    const {
      searchInput,
      isButtonDisabled,
      isLoading,
      searchResults,
      searchedArtist,
      hasSearched } = this.state;

    const formElement = (
      <form action="post">
        <div className="w-full flex justify-center self-start">
          <i
            className="fa-solid fa-magnifying-glass fa-lg text-slate-600"
            style={ { transform: 'translate(30px, 17.5px)' } }
          />
          <input
            data-testid="search-artist-input"
            type="text"
            placeholder="artist name"
            className="w-1/3 rounded-md px-2 py-1.5 pl-10 mr-4 decoration-slate-800
            text-slate-300 bg-slate-800"
            value={ searchInput }
            onChange={ this.onChangeHandler }
          />
          <Button
            text="Search"
            disabled={ isButtonDisabled }
            id="search-artist-button"
            onClick={ this.onButtonClick }
          />
        </div>
      </form>
    );

    const resultList = (
      <div
        className="mt-10 mx-10 flex flex-col items-center overflow-x-hidden
        outline outline-offset-2 outline-1 outline-sky-700 rounded-md pb-10"
      >
        <div className="mb-10 pb-5 border-b-2 border-sky-700">
          <h1 className="text-2xl mt-5">
            { `Resultado de álbuns de:  ${searchedArtist}` }
          </h1>
        </div>
        <div>
          <ul
            className="flex flex-wrap justify-center items-center
            content-center gap-10 px-5"
          >
            { searchResults.map((result) => (
              <li
                key={ result.collectionId }
              >
                <AlbumCard
                  collectionId={ result.collectionId }
                  artistId={ result.artistId }
                  artistName={ result.artistName }
                  albumName={ result.collectionName }
                  albumCover={ result.artworkUrl100 }
                  releaseDate={ result.releaseDate }
                />
              </li>
            )) }
          </ul>
        </div>
      </div>
    );

    return (
      <div className="pb-20 text-center">
        <Header />
        <div
          data-testid="page-search"
          className="h-20 flex flex-col justify-center m-10 text-center"
        >
          { isLoading ? <Loading /> : formElement }
        </div>
        {hasSearched && searchResults.length > 0 ? resultList : null }
        {hasSearched && searchResults.length === 0
          ? <h1>Nenhum álbum foi encontrado</h1> : null }
        {/* {searchResults.length > 0 && resultList } */}
      </div>
    );
  }
}

export default Search;
