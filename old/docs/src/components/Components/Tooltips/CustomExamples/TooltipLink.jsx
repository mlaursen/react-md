/* eslint-disable react/prefer-stateless-function */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { injectTooltip } from 'react-md';

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
class TooltipLink extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    tooltip: PropTypes.node,
  };

  render() {
    const { children, tooltip } = this.props;

    return (
      <a style={styles.tooltipContainer} className="link">
        {tooltip}
        {children}
      </a>
    );
  }
}

export default injectTooltip(TooltipLink);
