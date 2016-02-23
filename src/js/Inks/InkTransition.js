import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

export default class InkTransition extends Component {
  constructor(props) {
    super(props);
    this.state = { timeout: null };
  }

  static propTypes = {
    style: PropTypes.object.isRequired,
    transitionEnterTimeout: PropTypes.number.isRequired,
    transitionLeaveTimeout: PropTypes.number.isRequired,
  };

  static defaultProps = {
    transitionEnterTimeout: 150,
    transitionLeaveTimeout: 450,
  };

  componentWillEnter = (done) => {
    const node = ReactDOM.findDOMNode(this);
    setTimeout(() => {
      node.classList.add('active');
      setTimeout(() => {
        done();
      }, this.props.transitionEnterTimeout);
    }, 25);
  };

  componentWillLeave = (done) => {
    const node = ReactDOM.findDOMNode(this);
    node.classList.add('leaving');
    setTimeout(() => {
      done();
    }, this.props.transitionLeaveTimeout);
  };

  render() {
    return <div className="md-ink" {...this.props} />;
  }
}
