/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import Menu, { MenuItem } from 'material-ui/Menu';
import { FormControlLabel, FormGroup } from 'material-ui/Form';
import Switch from 'material-ui/Switch';
import Card, { CardHeader, CardContent, CardActions } from 'material-ui/Card';
import FontAwesome from 'react-fontawesome';

import streamDummyData from '../../../util/streamDummyData.js';
import firebaseTools from '../../../util/firebase-tools';

import styles from './ChatControls.css';

export class ChatControls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewable: false,
    };
  }

  componentDidMount() {
    this.loadChatControls();
  }

  loadChatControls = () => {
    firebaseTools.database.ref('chatControls').on('value', (snapshot) => {
      if (snapshot.val() !== null) {
        this.setState({ viewable: snapshot.val().options.viewable });
      }
    });
  };

  onToggleChat = (checked) => {
    this.setState({ viewable: checked });
    alert('Your are about to toggle chat ' + (checked ? 'On' : 'Off'));
    firebaseTools.setChatControls({ viewable: checked });
  };

  render() {
    return (
      <div>
        <Card>
          <CardHeader title="Chat" subheader="Controls for chat experience" />
          <CardContent>
            <FormGroup>
              <FormControlLabel
                className={styles['label-switch']}
                control={
                  <Switch
                    checked={this.state.viewable}
                    onChange={(event, checked) => this.onToggleChat(checked)}
                  />
                }
                label={this.state.viewable ? 'On' : 'Off'}
              />
            </FormGroup>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default ChatControls;
