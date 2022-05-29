import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import streamDummyData from '../../../../util/streamDummyData';
import firebaseTools from '../../../../util/firebase-tools';

export class UsersOnline extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usersOnline: 0,
    };
  }

  usersOnline = () => {
    firebaseTools.database.ref('users_online').on('value', (snapshot) => {
      let usersOnline = this.state.usersOnline;
      console.log(snapshot.val());
      if (usersOnline < 1) usersOnline = 1;
      if (snapshot.val().action === 'ONLINE') {
        console.log('online');
        this.setState({
          usersOnline: usersOnline + 1,
        });
      } else {
        console.log('offline');
        this.setState({
          usersOnline: usersOnline - 1,
        });
      }
      console.log(this.state.usersOnline);
    });

    firebaseTools.database
      .ref('.info/connected')
      .on('value', (connectedSnap) => {
        let connectionRef = firebaseTools.database.ref('users_online');
        if (connectedSnap.val()) {
          let connect = connectionRef.push();
          connectionRef.set({ action: 'ONLINE' });
          connectionRef.onDisconnect().set({ action: 'OFFLINE' });
        }
      });

    console.log(this.state.usersOnline);
  };

  render() {
    return (
      <div>
        <h1>Users Online</h1>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

UsersOnline.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

UsersOnline.contextTypes = {
  router: PropTypes.object,
};

export default connect(mapStateToProps)(UsersOnline);
