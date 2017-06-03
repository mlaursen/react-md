import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class MinimizingBundle extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
  };

  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div />
    );
  }
}
