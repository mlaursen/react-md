import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';

// Import Style
import styles from './PinnedMessage.css';

export class PinnedMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewable: this.props.viewable,
    };
  }

  hideMessage = () => {
    this.setState({ viewable: false });
  };

  render() {
    return (
      <div
        key={`${this.props.id}-${this.props.type}`}
        className={`${styles['pinned-message']} ${
          this.state.viewable && this.props.viewable ? '' : styles['hide']
        }`}
      >
        <div className={styles['avatar']}>
          <img src={this.props.avatar} />
        </div>
        <div className={styles['body']}>
          <div>
            <div className={styles['user-name']}>{this.props.name}</div>
            <div className={styles['copy']}>{this.props.message}</div>
          </div>
        </div>
        <div className={styles['actions']}>
          <FontAwesome name="times" onClick={this.hideMessage} />
        </div>
      </div>
    );
  }
}

PinnedMessage.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  viewable: PropTypes.bool.isRequired,
};

export default PinnedMessage;
