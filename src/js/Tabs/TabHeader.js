import React, { PropTypes } from 'react';
import classnames from 'classnames';

const TabHeader = ({ indicatorStyle, children, className, scrolling, fixedWidth, centered, ...props }) => {
  return (
    <header className={className}>
      <ul
        className={classnames('md-tabs', {
          'fixed-width': fixedWidth,
          'tabs-centered': centered,
          scrolling,
        })}
        {...props}
      >
        {children}
        <span className="md-tab-indicator" style={indicatorStyle} />
      </ul>
    </header>
  );
};

TabHeader.propTypes = {
  indicatorStyle: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string.isRequired,
  onTouchStart: PropTypes.func.isRequired,
  onTouchEnd: PropTypes.func.isRequired,
  onTouchMove: PropTypes.func.isRequired,
  style: PropTypes.object.isRequired,
  scrolling: PropTypes.bool.isRequired,
  fixedWidth: PropTypes.bool.isRequired,
  centered: PropTypes.bool.isRequired,
};

export default TabHeader;
