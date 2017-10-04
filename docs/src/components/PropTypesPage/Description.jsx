import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { CardText } from 'react-md';
import Markdown from 'components/Markdown';

const Description = ({ description, mobileFilterVisible }) => {
  if (!description) {
    return null;
  }

  return <Markdown component={CardText} markdown={description} className={cn({ 'md-cell--phone-hidden': mobileFilterVisible })} />;
};

Description.propTypes = {
  description: PropTypes.string,
  mobileFilterVisible: PropTypes.bool.isRequired,
};

export default Description;
