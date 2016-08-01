import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

import { IconButton } from '../Buttons';

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
  constructor(props, context) {
    super(props, context);
  }

  static contextTypes = {
    isExpanded: PropTypes.bool.isRequired,
    onExpandClick: PropTypes.func.isRequired,
    iconClassName: PropTypes.string.isRequired,
    iconChildren: PropTypes.string,
    tooltipPosition: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
    tooltipLabel: PropTypes.string,
  };

  render() {
    const { isExpanded, onExpandClick, iconClassName, iconChildren, tooltipPosition, tooltipLabel } = this.context;


    return (
      <IconButton
        className={classnames('md-card-expander', {
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
