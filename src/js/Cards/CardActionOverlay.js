import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import CardTitle from './CardTitle';
import CardActions from './CardActions';
import { FlatButton } from '../Buttons';

export default class CardActionOverlay extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  static propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
    actions: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string.isRequired,
    })),
    children: PropTypes.node,
  };

  render() {
    const { actions, ...titleProps } = this.props;
    return (
      <span>
        <CardTitle {...titleProps} />
        <CardActions>
          {actions.map((actionProps, i) => <FlatButton key={i} {...actionProps} />)}
        </CardActions>
      </span>
    );
  }
}
