import React, { PropTypes } from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import cn from 'classnames';

import CircularProgress from 'react-md/lib/Progress/CircularProgress';

const CardGrid = ({ className, children, component, ...props }) => (
  <CSSTransitionGroup
    {...props}
    component={component}
    className={cn('md-grid', className)}
    transitionName="md-cross-fade"
    transitionEnterTimeout={300}
    transitionLeave={false}
  >
    {!children || !children.length ? <CircularProgress id="loading-content" key="progress" /> : null}
    {children}
  </CSSTransitionGroup>
);

CardGrid.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  component: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string,
  ]).isRequired,
};

CardGrid.defaultProps = {
  component: 'section',
};

export default CardGrid;
