import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cn from 'classnames';
import CloseEmulator from 'components/PhoneEmulator/CloseEmulator';

const CloseExample = ({ mobile, navigationVisible }) => {
  if (!mobile) {
    return null;
  }

  return (
    <CloseEmulator
      id="close-fixed-navigation-demo"
      floating
      fixed
      secondary
      className={cn('bottom-navigations__dynamic__fab', {
        'bottom-navigations__dynamic__fab--offset': navigationVisible,
      })}
    >
      close
    </CloseEmulator>
  );
};

CloseExample.propTypes = {
  mobile: PropTypes.bool,
  navigationVisible: PropTypes.bool,
};

export default connect(({ media: { mobile } }) => ({ mobile }))(CloseExample);
