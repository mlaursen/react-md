/* eslint-disable react/prefer-stateless-function */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { FontIcon, injectTooltip } from 'react-md';

const styles = {
  tooltipContainer: {
    position: 'relative',
    display: 'inline-block',
    margin: '1em',
  },
};

/**
 * Starting with React 16, Stateless functions can not have refs, so need to create
 * a component class to work as expected.
 */
class TooltipFontIcon extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    tooltip: PropTypes.node,
    iconClassName: PropTypes.string,
  };

  render() {
    const { children, iconClassName, tooltip } = this.props;
    return (
      <div style={styles.tooltipContainer}>
        {tooltip}
        <FontIcon iconClassName={iconClassName}>{children}</FontIcon>
      </div>
    );
  }
}

export default injectTooltip(TooltipFontIcon);
