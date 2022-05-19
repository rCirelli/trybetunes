import React from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

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
      <div data-testid="header-user-name">
        <h1>{ `Olá, ${name}` }</h1>
      </div>);

    return (
      <div
        data-testid="header-component"
        className="w-screen sticky top-0 flex justify-between
        items-center px-9 py-5 bg-transparent bg-gradient-to-l from-sky-900 bia"
      >
        <div>
          <img src="/assets/trybeTunes.png" alt="trybe tunes" />
        </div>
        { isLoading ? <Loading /> : userInfoElement }
      </div>
    );
  }
}

export default Header;
