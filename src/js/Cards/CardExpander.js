import React, { Component } from 'react';
import cn from 'classnames';

import contextTypes from './contextTypes';
import Button from '../Buttons/Button';

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
      iconClassName,
      iconChildren,
      tooltipPosition,
      tooltipLabel,
      tooltipDelay,
    } = this.context;

    return (
      <Button
        icon
        className={cn('md-collapser md-collapser--card', {
          'md-collapser--flipped': expanded,
        })}
        onClick={onExpandClick}
        iconClassName={iconClassName}
        tooltipLabel={tooltipLabel}
        tooltipDelay={tooltipDelay}
        tooltipPosition={tooltipPosition}
      >
        {iconChildren}
      </Button>
    );
  }
}
