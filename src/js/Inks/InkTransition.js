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

  componentWillUnmount() {
    if(this.state.timeout) { clearTimeout(this.state.timeout); }
  }

  componentWillEnter = (done) => {
    const node = ReactDOM.findDOMNode(this);
    const timeout = setTimeout(() => {
      node.classList.add('active');
      const timeout = setTimeout(() => {
        this.setState({ timeout: null });
        done();
      }, this.props.transitionEnterTimeout);
      this.setState({ timeout });
    }, 25);

    this.setState({ timeout });
  };

  componentWillLeave = (done) => {
    const node = ReactDOM.findDOMNode(this);
    node.classList.add('leaving');
    const timeout = setTimeout(() => {
      this.setState({ timeout: null });
      done();
    }, this.props.transitionLeaveTimeout);
    this.setState({ timeout });
  };

  render() {
    const { ...props } = this.props;
    delete props.transitionEnterTimeout;
    delete props.transitionLeaveTimeout;

    return <div className="md-ink" {...props} />;
  }
}
