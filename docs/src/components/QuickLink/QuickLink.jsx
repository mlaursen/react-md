import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import FontIcon from 'react-md/lib/FontIcons';

import NativeLink from 'components/NativeLink';

import './_styles.scss';

const QuickLink = ({ id, props, title }) => (
  <NativeLink
    href={`#${id}`}
    className={cn('quick-link__link', {
      'quick-link__link--props': props,
      'quick-link__link--title': title,
    })}
  >
    <FontIcon>link</FontIcon>
  </NativeLink>
);

QuickLink.propTypes = {
  id: PropTypes.string.isRequired,
  props: PropTypes.bool,
  title: PropTypes.bool,
};

export default QuickLink;
