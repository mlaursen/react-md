import React from 'react';
import PropTypes from 'prop-types';
import { connectAdvanced } from 'react-redux';
import shallowEqual from 'shallowequal';
import { Collapse, Grid, Cell, bem } from 'react-md';
import QuickNavLink from './QuickNavLink';

const className = bem('footer', 'quick-nav', {}, Grid.getClassName({ noSpacing: true }), Cell.getClassName({ size: 12 }));

export const PureQuickNav = ({
  previousTo,
  previousName,
  nextTo,
  nextName,
  mobile,
}) => (
  <Collapse collapsed={!previousName && !nextName}>
    <nav className={className}>
      <QuickNavLink
        to={previousTo}
        titles={!mobile || !nextTo}
        name={previousName}
        label="Previous"
        icon="arrow_back"
        left
      />
      <QuickNavLink
        to={nextTo}
        name={nextName}
        label="Next"
        icon="arrow_forward"
        titles
      />
    </nav>
  </Collapse>
);

PureQuickNav.propTypes = {
  previousTo: PropTypes.string,
  previousName: PropTypes.string,
  nextTo: PropTypes.string,
  nextName: PropTypes.string,
  mobile: PropTypes.bool,
};

export default connectAdvanced(() => {
  let result;

  return (state, props) => {
    const nextResult = {
      mobile: state.media.mobile,
      ...state.quickNav,
      ...props,
    };

    if (!shallowEqual(result, nextResult)) {
      result = nextResult;
    }

    return result;
  };
})(PureQuickNav);
