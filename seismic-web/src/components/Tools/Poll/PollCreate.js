import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import FontAwesome from 'react-fontawesome';
import Button from 'material-ui/Button';

import cuid from 'cuid';
import firebaseTools from '../../../util/firebase-tools';

// Import Style
import styles from './PollCreate.css';

export class PollCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      options: [],
      total: 0,
      showPollQuestion: true,
      showPollOption: false,
      viewable: false,
    };
  }

  componentDidMount() {
    this.loadPoll();
  }

  loadPoll = () => {
    firebaseTools.database.ref('poll').on('value', (snapshot) => {
      if (snapshot.val() !== null) {
        this.setState({ viewable: snapshot.val().poll.viewable });
      }
    });
  };

  pollQuestionSubmit = (event) => {
    event.preventDefault();
    const pollTitle = this.refs.pollQuestion.value;
    this.setState({
      title: pollTitle,
      showPollQuestion: false,
      showPollOption: true,
    });
    this.refs.pollQuestion.value = '';
  };

  pollOptionSubmit = (event) => {
    event.preventDefault();
    const pollOption = this.refs.pollOption.value;
    const pollOptions = this.state.options;

    pollOptions.push({
      label: pollOption,
      value: 0,
    });
    this.setState({ options: pollOptions });

    this.refs.pollOption.value = '';
  };

  pollSubmit = (viewable) => {
    event.preventDefault();
    let pollData = {};

    const options = {
      type: 'POLL',
      id: cuid(),
      name: 'ADMIN',
      avatar: this.props.avatar,
      title: this.state.title,
      data: this.state.options,
      total: this.state.total,
      viewable: viewable,
    };

    firebaseTools.setCTA(options);
    this.pollReset(event);
  };

  pollReset = (event) => {
    event.preventDefault();
    this.setState({
      title: '',
      options: [],
      total: 0,
      showPollQuestion: true,
      showPollOption: false,
      pollRequirement: false,
      viewable: false,
    });
  };

  pollStop = (event) => {
    this.pollReset(event);
    this.pollSubmit(false);
  };

  render() {
    return (
      <div className={styles['poll']}>
        <h3>{this.state.title}</h3>
        <ol>
          {this.state.options.map((vote) => {
            return (
              <li key={vote.label}>
                <label className="title">{vote.label}</label>
              </li>
            );
          })}
        </ol>

        {this.state.showPollQuestion && !this.state.viewable ? (
          <form
            id="frmPollQuestion"
            role="form"
            onSubmit={this.pollQuestionSubmit}
          >
            <input
              type="pollQuestion"
              className="form-control"
              id="txtPollQuestion"
              ref="pollQuestion"
              placeholder="Ask a Question..."
              name="pollQuestion"
            />
          </form>
        ) : null}

        {!this.state.showPollQuestion ? (
          <form
            id="formPollOption"
            role="form"
            onSubmit={this.pollOptionSubmit}
          >
            <input
              type="pollOption"
              className="form-control"
              id="txtPollOption"
              ref="pollOption"
              placeholder="Enter an Option"
              name="pollOption"
            />
          </form>
        ) : null}

        {!this.state.showPollQuestion ||
        this.state.options.length > 1 ||
        this.state.viewable ? (
          <div className={styles['button-container']}>
            {this.state.showPollQuestion ? null : (
              <Button onClick={this.pollReset} className={styles['default']}>
                Cancel
              </Button>
            )}
            {this.state.viewable ? (
              <Button onClick={this.pollStop} className={styles['secondary']}>
                Stop Poll
              </Button>
            ) : null}
            {this.state.options.length > 1 ? (
              <Button
                onClick={() => this.pollSubmit(true)}
                className={styles['primary']}
              >
                Broadcast New Poll
              </Button>
            ) : null}
          </div>
        ) : null}
      </div>
    );
  }
}

PollCreate.propTypes = {
  avatar: PropTypes.string.isRequired,
};

export default PollCreate;
