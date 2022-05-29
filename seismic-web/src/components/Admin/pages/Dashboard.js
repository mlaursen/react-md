import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import streamDummyData from '../../../util/streamDummyData.js';

import SignupDialog from '../../Dialog/pages/SignupDialog';
import LoginDialog from '../../Dialog/pages/LoginDialog';

import Header from '../../App/components/Header/Header';

import VideoSelector from '../../Tools/VideoFeed/VideoSelector';
import CTASelector from '../../Tools/CTA/CTASelector';
import ChatControls from '../../Tools/Chat/ChatControls';

import { toggleChat } from '../../Live/LiveActions';
import { getLiveState } from '../../Live/LiveReducer';

import { toggleLogin, toggleSignup } from '../../App/AppActions';
import { logout } from '../../User/UserActions';
import { getLoginViewable, getSignupViewable } from '../../App/AppReducer';

import { getUser } from '../../User/UserReducer';

import globalStyles from '../../App/App.css';
import styles from './Dashboard.css';

export class Dashboard extends Component {
  constructor(props) {
    super(props);
  }

  onLogin = (event) => {
    event.preventDefault();
    this.props.dispatch(toggleLogin());
  };

  onSignup = (event) => {
    event.preventDefault();
    this.props.dispatch(toggleSignup());
  };

  onLogout = (event) => {
    event.preventDefault();
    this.props.dispatch(logout());
  };

  render() {
    const userLinks = (
      <div className={styles['login-container']}>
        <button onClick={this.onLogout.bind(this)}>Logout</button>
      </div>
    );

    const guestLinks = (
      <div className={styles['login-container']}>
        <button onClick={this.onLogin.bind(this)}>Login</button>
        <button onClick={this.onSignup.bind(this)}>Sign Up</button>
      </div>
    );

    return (
      <div className={styles['dashboard']}>
        <Header dispatch={this.props.dispatch} user={this.props.user} />

        <div className={globalStyles['container-w-header']}>
          <div className={styles['dashboard-container']}>
            {this.props.user && this.props.user.isAdmin
              ? [
                  <div key="dashboard">
                    <div className={styles['card-container']}>
                      <VideoSelector />
                      <CTASelector avatar={streamDummyData.avatars.default} />
                      <ChatControls />
                    </div>
                  </div>,
                ]
              : [
                  <div key="no-results" className={styles['no-access']}>
                    <div>
                      <h1>You do not have access.</h1>
                    </div>
                  </div>,
                ]}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    showLoginDialog: getLoginViewable(state),
    showSignupDialog: getSignupViewable(state),
    live: getLiveState(state),
    user: getUser(state),
    campaign: streamDummyData.campaigns[0],
  };
}

Dashboard.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

Dashboard.contextTypes = {
  router: PropTypes.object,
};

export default connect(mapStateToProps)(Dashboard);
