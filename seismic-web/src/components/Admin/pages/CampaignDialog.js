import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GoogleAnalytics from 'react-ga';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import { FormGroup, FormControlLabel } from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';
import Slide from 'material-ui/transitions/Slide';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';

import { toggleSignup } from '../../App/AppActions';
import { signup } from '../../User/UserActions';

import styles from './DialogPage.css';

import banner from '../../../assets/images/logo-2.jpg';

export class CampaignDialogPage extends Component {
  state = {
    email: '',
    password: '',
    chatName: '',
    disclaimerChecked: false,
    errors: [],
  };

  handleChange = (name) => (event) => {
    this.setState({
      [name]: event.target.value,
      errors: [],
    });
  };

  handleClickOpen = () => {
    this.props.dispatch(toggleSignup());
  };

  handleRequestClose = () => {
    this.props.dispatch(toggleSignup());
  };

  handleChecked = (name) => (event, checked) => {
    this.setState({ [name]: checked });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const chatName = this.state.chatName,
      email = this.state.email,
      password = this.state.password,
      disclaimer = this.state.disclamerChecked,
      errors = this.state.errors;

    if (!(email.length > 0)) {
      errors.push('Please enter an email. ');
    }

    if (!(password.length > 0)) {
      errors.push('Please enter a password. ');
    }

    if (password.length < 6) {
      errors.push('Password needs to be at least 6 characters. ');
    }

    if (chatName.length < 2) {
      errors.push('Please choose a longer chat name. ');
    }

    if (chatName.length > 20) {
      errors.push('Please choose a shorter chat name. ');
    }

    if (!disclaimer) {
      errors.push('Please review terms of service. ');
    }

    this.setState({
      errors: errors,
    });

    // Sucess
    if (!(errors.length > 0)) {
      this.props.dispatch(signup({ chatName, email, password })).then(() => {
        if (this.props.user.isAuthenticated) {
          this.handleRequestClose();
          this.setState({
            email: '',
            password: '',
            chatName: '',
            disclaimerChecked: false,
            errors: [],
          });
          GoogleAnalytics.initialize('UA-107154170-1');
          GoogleAnalytics.event({
            category: 'User',
            action: 'Creates an Account',
          });
        } else {
          this.setState({
            email: '',
            password: '',
            errors: [this.props.user.error],
          });
        }
      });
    }
  };

  render() {
    const DialogStyle = {
        padding: 0,
        display: 'flex',
      },
      TextFieldStyle = {
        width: '100%',
      },
      ButtonActionsStyle = {
        margin: 0,
      };

    const TOSLabel = (
      <a href="//my.pluto.tv/legal/terms-of-use.html" target="_blank">
        Terms of Service
      </a>
    );

    return (
      <div>
        <Dialog
          open={this.props.showSignupDialog}
          transition={Slide}
          onRequestClose={this.handleRequestClose}
        >
          <DialogContent style={DialogStyle} className={styles.dialog}>
            <div className={styles['banner-container']}>
              <div
                style={{
                  background: `transparent url("${banner}") center no-repeat`,
                  backgroundSize: 'cover',
                }}
              ></div>
            </div>
            <div className={styles['copy-container']}>
              <h2>Become a Pluto Citizen</h2>
              <DialogContentText>
                Sign up with Pluto TV to recieve 100+ channels. Plus get
                reminders when we go live.
              </DialogContentText>
              <form onSubmit={(e) => this.onSubmit(e)}>
                <TextField
                  required
                  label="Email"
                  placeholder="Email"
                  margin="normal"
                  value={this.state.email}
                  onChange={this.handleChange('email')}
                  style={TextFieldStyle}
                />
                <TextField
                  required
                  type="password"
                  label="Password"
                  placeholder="Password"
                  margin="normal"
                  value={this.state.password}
                  onChange={this.handleChange('password')}
                  style={TextFieldStyle}
                />
                <TextField
                  label="Chat Name"
                  placeholder="Chat Name"
                  margin="normal"
                  helperText="Customize your chat name"
                  value={this.state.chatName}
                  onChange={this.handleChange('chatName')}
                  style={TextFieldStyle}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={this.state.disclamerChecked}
                      onChange={this.handleChecked('disclamerChecked')}
                      className={styles['disclaimer']}
                      value="disclaimer"
                    />
                  }
                  label={TOSLabel}
                />
                <DialogActions style={ButtonActionsStyle}>
                  <Button onClick={this.handleRequestClose} color="default">
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    value="Sign Up"
                    onClick={this.onSubmit}
                    color="primary"
                  >
                    Sign Up
                  </Button>
                </DialogActions>
              </form>
              <div className={styles['errors']}>
                {this.state.errors.map((error) => (
                  <label key={error}>{error}</label>
                ))}
                {this.props.isSignedInFailure
                  ? 'User already with this email already exists. '
                  : null}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

CampaignDialogPage.propTypes = {
  showSignupDialog: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

export default CampaignDialogPage;
