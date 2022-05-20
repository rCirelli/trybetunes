import React from 'react';
import { getUser } from '../services/userAPI';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MenuButton from '../components/MenuButton';

class Profile extends React.Component {
  state = { userInfo: { }, isLoading: false };

  componentDidMount() {
    this.getUserData();
  }

  getUserData = () => {
    this.setState({ isLoading: true },
      async () => {
        const userInfo = await getUser();

        this.setState({ userInfo, isLoading: false });
      });
  }

  render() {
    const { isLoading, userInfo: { name, email, image, description } } = this.state;
    const userInfoDisplay = (
      <div className="w-full flex flex-col items-center py-16">
        <div className="w-full flex justify-center items-center mb-5 gap-7">
          <img
            src={ image !== '' ? image : '/public/assets/userPlaceholder.png' }
            alt={ name }
            data-testid="profile-image"
            width="100"
            className="rounded-full outline outline-1 outline-offset-2 outline-sky-600"
          />
          <MenuButton
            text="Editar perfil"
            id=""
            url="/profile/edit"
          />
        </div>
        <div className="flex flex-col items-start gap-5">
          <div>
            <p>Nome</p>
            <p>{ name }</p>
          </div>
          <div>
            <p>Email</p>
            <p>{ email }</p>
          </div>
          <div>
            <p>Descrição</p>
            <p>{ description }</p>
          </div>
        </div>
      </div>
    );

    return (
      <>
        <Header />
        <div
          data-testid="page-profile"
          className="flex justify-center p-10 w-5/6 min-w-fit mx-auto"
        >
          <div
            className="flex flex-col items-center w-3/5 mx-auto min-w-fit
            outline outline-offset-2 outline-1 outline-sky-700 rounded-md py-5"
          >
            { isLoading ? <Loading /> : userInfoDisplay }
          </div>
        </div>
      </>
    );
  }
}

export default Profile;
