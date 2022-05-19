import React from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import MenuButton from './MenuButton';

class Header extends React.Component {
  state = {
    userInfo: {},
    isLoading: false,
  }

  componentDidMount() {
    this.setState({ isLoading: true },
      async () => {
        const userObj = await getUser();
        this.setState({ userInfo: userObj, isLoading: false });
      });
  }

  render() {
    const { userInfo: { name }, isLoading } = this.state;

    const userInfoElement = (
      <div
        data-testid="header-user-name"
        className="bg-slate-900 outline outline-offset-2 outline-1 outline-sky-500
        rounded-full py-2 px-7 text-slate-300"
      >
        <h1>{ `Olá, ${name}` }</h1>
      </div>);

    return (
      <div
        data-testid="header-component"
        className="w-screen sticky top-0 flex justify-between
        items-center px-9 py-5 bg-transparent bg-gradient-to-l from-sky-900 bia
        border-b border-sky-700"
      >
        <div>
          <img src="/assets/trybeTunes.png" alt="trybe tunes" />
        </div>
        <MenuButton text="Search" id="link-to-search" url="/search" />
        <MenuButton text="Favorites" id="link-to-favorites" url="/favorites" />
        <MenuButton text="Profile" id="link-to-profile" url="/profile" />
        { isLoading ? <Loading /> : userInfoElement }
      </div>
    );
  }
}

export default Header;
