import React, { PureComponent } from 'react';
import cn from 'classnames';

import contextTypes from './contextTypes';
import IconButton from '../Buttons/IconButton';

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
export default class CardExpander extends PureComponent {
  static contextTypes = contextTypes;

  render() {
    const {
      isExpanded,
      onExpandClick,
      iconClassName,
      iconChildren,
      tooltipPosition,
      tooltipLabel,
    } = this.context;

    return (
      <IconButton
        className={cn('md-card-expander', {
          'flipped': isExpanded,
        })}
        onClick={onExpandClick}
        iconClassName={iconClassName}
        children={iconChildren}
        tooltipLabel={tooltipLabel}
        tooltipPosition={tooltipPosition}
      />
    );
  }
}
