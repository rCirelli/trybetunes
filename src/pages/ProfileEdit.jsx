import React from 'react';
import PropTypes from 'prop-types';
import Button from '../components/Button';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends React.Component {
  state = { userInfo: {
    image: '/assets/userPlaceholder.png',
    name: '',
    email: '',
    description: '' },
  isLoading: false,
  isButtonDisabled: true };

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

  onChangeHandler = ({ target }) => {
    const stateName = target.name;
    const { state } = this;
    const newValuesObj = { ...state.userInfo };

    newValuesObj[stateName] = target.value;
    this.setState({ userInfo: newValuesObj },
      () => {
        this.validadeForm();
      });
  }

  validadeForm = () => {
    const { userInfo: { name, email, description } } = this.state;
    const inputValues = [name, email, description];

    const isEmailValid = email.includes('@')
      && (email.endsWith('.com') || email.endsWith('.com.br'));

    const isFormFilled = inputValues.every((field) => field !== '');

    const isButtonDisabled = !isEmailValid || !isFormFilled;

    this.setState({ isButtonDisabled });
  }

  onButtonClick = (event) => {
    event.preventDefault();

    this.setState({ isLoading: true },
      async () => {
        const { userInfo } = this.state;
        await updateUser(userInfo);

        const { history } = this.props;
        history.push('/profile');
      });
  }

  render() {
    const { isLoading,
      userInfo: { name, email, image, description },
      isButtonDisabled } = this.state;

    const userForm = (
      <div className="w-full flex flex-col items-center w-full pb-1">
        <form action="submit" className="w-full flex flex-col items-center gap-5 px-10">
          <div className="flex justify-between items-center">
            <img
              src={ image === '' || image === undefined
                ? '/assets/userPlaceholder.png' : image }
              alt={ name }
              data-testid="profile-image"
              width="140"
              className="rounded-full outline outline-1 outline-offset-2 outline-sky-600"
            />
            <input
              className="rounded-md p-2 decoration-slate-800 ml-5 w-full
              placeholder:text-slate-600 text-slate-300 bg-slate-800"
              type="text"
              data-testid="edit-input-image"
              id="edit-input-image"
              name="image"
              placeholder="Image url"
              value={ image }
              onChange={ this.onChangeHandler }
            />
          </div>
          <label htmlFor="edit-input-name" className="w-full">
            <input
              className="rounded-md p-2 decoration-slate-800
              placeholder:text-slate-600 text-slate-300 bg-slate-800 w-full"
              type="text"
              data-testid="edit-input-name"
              id="edit-input-name"
              name="name"
              placeholder="Name"
              value={ name }
              onChange={ this.onChangeHandler }
            />
          </label>
          <label htmlFor="edit-input-email" className="w-full">
            <input
              className="w-full rounded-md p-2 decoration-slate-800
              placeholder:text-slate-600 text-slate-300 bg-slate-800"
              type="email"
              data-testid="edit-input-email"
              id="edit-input-email"
              name="email"
              placeholder="Email"
              value={ email }
              onChange={ this.onChangeHandler }
            />
          </label>
          <label htmlFor="edit-input-description" className="w-full">
            <textarea
              rows="4"
              className="w-full rounded-md p-2 decoration-slate-800
              placeholder:text-slate-600 text-slate-300 bg-slate-800"
              style={ { resize: 'none' } }
              type="text"
              data-testid="edit-input-description"
              id="edit-input-description"
              name="description"
              placeholder="Description"
              value={ description }
              onChange={ this.onChangeHandler }
            />
          </label>
          <Button
            isSubmit
            disabled={ isButtonDisabled }
            text="Save Changes"
            id="edit-button-save"
            onClick={ this.onButtonClick }
          />
        </form>
      </div>
    );

    return (
      <>
        <Header />
        <div
          data-testid="page-profile-edit"
          className="flex justify-center p-10 w-5/6 mx-auto"
        >
          <div
            className="flex flex-col items-center w-3/5 mx-auto
            outline outline-offset-2 outline-1 outline-sky-700 rounded-md p-5"
          >
            { isLoading ? <Loading /> : userForm }
          </div>
        </div>

      </>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default ProfileEdit;
