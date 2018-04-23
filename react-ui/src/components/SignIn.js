import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { SignUpLink } from './SignUp';
import { PasswordForgetLink } from './PasswordForget';
import * as routes from '../constants/routes';
import axios from 'axios';

const apiURL = 'http://localhost:5000';
const baseURL = 'https://howd-it-go.firebaseio.com';

const SignInPage = ({ history }) => (
  <div>
    <SignInForm history={history} />
    <PasswordForgetLink />
    <SignUpLink />
  </div>
);

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value
});

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null
};

export class SignInForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email, password } = this.state;

    const { history } = this.props;
    axios
      .get(`${apiURL}/users.json`, {
        email: this.state.email,
        password: this.state.password
      })
      .then(result => {
        console.log(result);
      })
      .catch(err => {
        console.log(err);
      });
    // auth
    //   .doSignInWithEmailAndPassword(email, password)
    //   .then(() => {
    //     this.setState(() => ({ ...INITIAL_STATE }));
    //     history.push(routes.SETTINGS);
    //   })
    //   .catch(error => {
    //     this.setState(byPropKey('error', error));
    //   });

    event.preventDefault();
  };

  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === '' || email === '';

    return (
      <div className="form">
        <h1>Sign In</h1>
        <form onSubmit={this.onSubmit}>
          <div>
            <div className="label">Email Address:</div>
            <input
              value={email}
              onChange={event =>
                this.setState(byPropKey('email', event.target.value))
              }
              type="text"
            />
          </div>
          <div>
            <div className="label">Password:</div>
            <input
              value={password}
              onChange={event =>
                this.setState(byPropKey('password', event.target.value))
              }
              type="password"
            />
          </div>
          <button disabled={isInvalid} type="submit">
            Sign In
          </button>
          <PasswordForgetLink />

          {error && <p>{error.message}</p>}
        </form>
      </div>
    );
  }
}

export default withRouter(SignInPage);

//export { SignInForm };
