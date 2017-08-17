import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import CardTitle from './CardTitle';
import CardActions from './CardActions';
import Button from '../Buttons/Button';
import componentDeprecated from '../utils/PropTypes/componentDeprecated';

/**
 * The `CardActionOverlay` component is a simple wrapper for generating an overlay
 * for the `CardMedia` component by having a `CardTitle` and an array of props
 * for generating `FlatButton` for the `CardActions` component.
 */
export default class CardActionOverlay extends PureComponent {
  static propTypes = {
    /**
     * The title to use.
     */
    title: PropTypes.node,

    /**
     * The optional subtitle to use.
     */
    subtitle: PropTypes.node,

    /**
     * An array of flat button props.
     */
    actions: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.node.isRequired,
    })),

    /**
     * Any children to display in the `CardTitle` component.
     */
    children: PropTypes.node,
    deprecated: componentDeprecated(
      'It is not a worthwhile component since the same thing can be accomplished with the `MediaOverlay` component.'
    ),
  };

  render() {
    const { actions, ...titleProps } = this.props;
    return (
      <span>
        <CardTitle {...titleProps} />
        <CardActions>
          {actions.map((actionProps, i) => <Button flat key={i} {...actionProps} />)}
        </CardActions>
      </span>
    );
  }
}
