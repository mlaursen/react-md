import React, { PureComponent, PropTypes } from 'react';

export default class Placeholders extends PureComponent {
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
