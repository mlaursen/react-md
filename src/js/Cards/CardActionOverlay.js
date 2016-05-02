import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import CardTitle from './CardTitle';
import CardActions from './CardActions';
import { FlatButton } from '../Buttons';

/**
 * The `CardActionOverlay` component is a simple wrapper for generating an overlay
 * for the `CardMedia` component by having a `CardTitle` and an array of props
 * for generating `FlatButton` for the `CardActions` component.
 */
export default class CardActionOverlay extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  static propTypes = {
    /**
     * The title to use.
     */
    title: PropTypes.string,

    /**
     * The optional subtitle to use.
     */
    subtitle: PropTypes.string,

    /**
     * An array of flat button props.
     */
    actions: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string.isRequired,
    })),

    /**
     * Any children to display in the `CardTitle` component.
     */
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
