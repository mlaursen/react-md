import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import { CardTitle, CardActions, FlatButton } from '../index';

export default class CardActionOverlay extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  static propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
    actions: PropTypes.arrayOf(PropTypes.shape({
      default: PropTypes.bool,
      primary: PropTypes.bool,
      secondary: PropTypes.bool,
      children: PropTypes.node.isRequired,
    })),
  }

  render() {
    const { title, subtitle, actions } = this.props;
    return (
      <span>
        <CardTitle title={title} subtitle={subtitle} />
        <CardActions>
          {actions.map((actionProps, i) => {
            const isDefault = !actionProps.primary && !actionProps.secondary;
            return <FlatButton default={isDefault} key={i} {...actionProps} />;
          })}
        </CardActions>
      </span>
    );
  }
}
