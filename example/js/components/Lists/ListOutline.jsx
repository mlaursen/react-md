import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import { Paper, Toolbar, IconButton } from '../../../../src/js';

export default class ListOutline extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  static propTypes = {
    children: PropTypes.node.isRequired,
    primary: PropTypes.bool,
    secondary: PropTypes.bool,
  }

  static defaultProps = {
    primary: false,
    secondary: false,
  }

  render() {
    return (
      <Paper>
        <Toolbar primary={this.props.primary} secondary={this.props.secondary}><IconButton>menu</IconButton></Toolbar>
        {this.props.children}
      </Paper>
    );
  }
}
