import React from 'react';
import { Redirect } from 'react-router-dom';
import Button from '../components/Button';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  state = {
    nameInput: '',
    isButtonDisabled: true,
    isLoading: false,
    isLogged: false,
  };

  onChangeHandler = ({ target }) => {
    const NAME_MIN_CHARACTER = 3;
    this.setState({ nameInput: target.value },
      () => {
        const { nameInput } = this.state;
        const enableButton = nameInput.length < NAME_MIN_CHARACTER;
        this.setState({ isButtonDisabled: enableButton });
      });
  }

  onButtonClick = () => {
    const { nameInput } = this.state;

    this.setState({ isLoading: true },
      async () => {
        await createUser({ name: nameInput });
        this.setState({ isLoading: false, isLogged: true });
      });
  }

  render() {
    const { nameInput, isButtonDisabled, isLoading, isLogged } = this.state;

    const loginElement = (
      <>
        <h1 className="text-4xl">Trybetunes</h1>
        <div
          className="h-1/4 w-1/3 bg-slate-800 rounded-lg px-7 pb-3 pt-3 self-center
          flex flex-col justify-center gap-y-5"
        >
          <h1 className="text-2xl">Login</h1>
          <input
            data-testid="login-name-input"
            type="text"
            placeholder="Name"
            className="bg-slate-700 rounded-md py-1 px-3"
            name="nameInput"
            value={ nameInput }
            onChange={ this.onChangeHandler }
          />
          <Button
            text="Entrar"
            disabled={ isButtonDisabled }
            name="buttonLogin"
            id="login-submit-button"
            onClick={ this.onButtonClick }
          />
        </div>
      </>
    );

    return (
      <div
        data-testid="page-login"
        className="h-screen w-screen flex flex-col justify-center align-items-center
        align-content-center text-center gap-10"
      >
        { isLoading ? <Loading /> : loginElement }
        { isLogged && <Redirect push to="/search" /> }
      </div>
    );
  }
}

export default Login;
