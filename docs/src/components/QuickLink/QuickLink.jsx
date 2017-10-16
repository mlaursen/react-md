import React from 'react';
import PropTypes from 'prop-types';
import { FontIcon, bem } from 'react-md';

import NativeLink from 'components/NativeLink';

import './_styles.scss';

const QuickLink = ({ id, props, title }) => (
  <NativeLink href={`#${id}`} className={bem('quick-link', 'link', { props, title })}>
    <FontIcon>link</FontIcon>
  </NativeLink>
);

QuickLink.propTypes = {
  id: PropTypes.string.isRequired,
  props: PropTypes.bool,
  title: PropTypes.bool,
};

export default QuickLink;
