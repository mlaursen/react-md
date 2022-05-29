/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import Menu, { MenuItem } from 'material-ui/Menu';
import { FormControlLabel, FormGroup } from 'material-ui/Form';
import Switch from 'material-ui/Switch';
import Card, { CardHeader, CardContent, CardActions } from 'material-ui/Card';
import FontAwesome from 'react-fontawesome';

import streamDummyData from '../../../../util/streamDummyData.js';
import firebaseTools from '../../../../util/firebase-tools';

import Feedback from '../Feedback/Feedback';

export class Slates extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      banner: '',
      viewable: false,
      options: [],
      type: '',
    };
  }

  componentDidMount() {
    //this.loadChatControls();
  }

  loadSlateControls = () => {
    firebaseTools.database.ref('slate').on('value', (snapshot) => {
      if (snapshot.val() !== null) {
        this.setState({
          viewable: snapshot.val().options.viewable,
          title: snapshot.val().options.title,
          banner: snapshot.val().options.banner,
          options: snapshot.val().options.options,
          type: snapshot.val().options.type,
        });
      }
    });
  };

  onClick = (options) => {
    console.log(options);
    //firebaseTools.setChatControls({ viewable: checked });
  };

  render() {
    return (
      <div>
        <Card>
          <CardHeader title="Slates" subheader="Push a slate in real-time" />
          <CardContent>
            <Feedback />
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default Slates;
