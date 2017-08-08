import React, { Component } from 'react';

import contextTypes from './contextTypes';
import Button from '../Buttons/Button';
import getCollapserStyles from '../utils/getCollapserStyles';

/**
 * The CardExpander component is just a simple `IconButton` that
 * gets generated through the `Card`'s `contextTypes`. Props are not used
 * at all.
 *
 * Any component below a component that has this component inject into it
 * and has the prop `expandable={true}` will be toggleable when this is clicked.
 *
 * You can manually inject the `CardExpander` component yourself if you want to
 * use a component that is not a `CardActions` or a `CardTitle`.
 */
export default class CardExpander extends Component {
  static contextTypes = contextTypes;

  render() {
    const {
      expanded,
      onExpandClick,
      icon,
      tooltipPosition,
      tooltipLabel,
      tooltipDelay,
    } = this.context;

    return (
      <Button
        icon
        className={getCollapserStyles({ flipped: expanded }, 'md-collapser--card')}
        onClick={onExpandClick}
        tooltipLabel={tooltipLabel}
        tooltipDelay={tooltipDelay}
        tooltipPosition={tooltipPosition}
        iconEl={icon}
      />
    );
  }
}
