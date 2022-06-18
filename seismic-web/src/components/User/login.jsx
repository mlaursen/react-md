import React, { Component } from 'react';
import { browserHistory, Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  loginUser,
  fetchUser,
  loginWithProvider,
} from '../../actions/firebase_actions';

class UserLogin extends Component {
  constructor(props) {
    super(props);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.loginWithProvider = this.loginWithProvider.bind(this);
    this.state = {
      message: '',
    };
  }

  onFormSubmit(event) {
    event.preventDefault();

    const email = this.refs.email.value;
    const password = this.refs.password.value;
    this.props.loginUser({ email, password }).then((data) => {
      if (data.payload.errorCode) {
        this.setState({ message: data.payload.errorMessage });
      } else {
        browserHistory.push('/profile');
      }
    });
  }

  loginWithProvider(provider) {
    this.props.loginWithProvider(provider).then((data) => {
      if (data.payload.errorCode) {
        this.setState({ message: data.payload.errorMessage });
      } else {
        browserHistory.push('/profile');
      }
    });
  }

  render() {
    return (
      <div className="col-md-4">
        <form id="frmLogin" role="form" onSubmit={this.onFormSubmit}>
          <p>{this.state.message}</p>
          <h2>Login</h2>
          <div className="form-group">
            <label htmlFor="txtEmail">Email address</label>
            <input
              type="email"
              className="form-control"
              id="txtEmail"
              ref="email"
              placeholder="Enter email"
              name="email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="txtPass">Password</label>
            <input
              type="password"
              className="form-control"
              id="txtPass"
              ref="password"
              placeholder="Password"
              name="password"
            />
          </div>
          <button type="submit" className="btn btn-default btn-block">
            Login
          </button>
          <br />
          <h5>
            <Link to="/reset">Forgot password?</Link>
          </h5>

          <h4>Login with</h4>
          <a
            href="#"
            className="btn btn-block btn-social btn-facebook"
            onClick={() => {
              this.loginWithProvider('facebook');
            }}
            data-provider="facebook"
          >
            Facebook
          </a>

          <a
            href="#"
            className="btn btn-block btn-social btn-twitter"
            onClick={() => {
              this.loginWithProvider('twitter');
            }}
            data-provider="twitter"
          >
            Twitter
          </a>

          <a
            href="#"
            className="btn btn-block btn-social btn-google"
            onClick={() => {
              this.loginWithProvider('google');
            }}
            data-provider="twitter"
          >
            Google
          </a>

          <a
            href="#"
            className="btn btn-block btn-social btn-github"
            onClick={() => {
              this.loginWithProvider('github');
            }}
            data-provider="twitter"
          >
            Github
          </a>
        </form>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      loginUser,
      fetchUser,
      loginWithProvider,
    },
    dispatch
  );
}

function mapStateToProps(state) {
  return { currentUser: state.currentUser };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserLogin);
