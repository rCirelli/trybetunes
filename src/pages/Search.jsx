import React from 'react';
import Button from '../components/Button';
import Header from '../components/Header';

class Search extends React.Component {
  state = { searchInput: '', isButtonDisabled: true };

  onChangeHandler = ({ target }) => {
    const SEARCH_MIN_CHARACTER = 2;
    this.setState({ searchInput: target.value },
      () => {
        const { searchInput } = this.state;
        const enableButton = searchInput.length < SEARCH_MIN_CHARACTER;
        this.setState({ isButtonDisabled: enableButton });
      });
  }

  onButtonClick = () => {
    //
  }

  render() {
    const { searchInput, isButtonDisabled } = this.state;

    return (
      <>
        <Header />
        <div
          data-testid="page-search"
          className=" h-1/3 flex flex-col justify-center mt-10 mx-10 text-center
          outline outline-offset-2 outline-1 outline-sky-700
          rounded-md"
        >
          <form action="post">
            <div className="w-full flex justify-center">
              <i
                className="fa-solid fa-magnifying-glass fa-lg text-slate-700"
                style={ { transform: 'translate(30px, 17.5px)' } }
              />
              <input
                data-testid="search-artist-input"
                type="text"
                placeholder="Artist Name, Song Title, Album Title"
                className="w-1/3 rounded-md px-2 py-1.5 pl-10 mr-4 text-slate-800"
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
        </div>
      </>
    );
  }
}

export default Search;
