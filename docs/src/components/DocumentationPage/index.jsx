import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Helmet from 'react-helmet';
import { CircularProgress } from 'react-md';

const ACCESSIBILITY_PROPS = {
  'aria-describedby': 'loading-documentation',
  'aria-busy': true,
};

const DocumentationPage = ({ loading, children, title, className, ...otherProps }) => {
  let content = children;
  let props;
  if (loading) {
    content = <CircularProgress id="loading-documentation" key="loading" />;
    props = ACCESSIBILITY_PROPS;
  }

  return (
    <section {...props} {...otherProps} className={cn('md-grid md-grid--40-16', className)}>
      <Helmet title={title} />
      {content}
    </section>
  );
};

DocumentationPage.propTypes = {
  loading: PropTypes.bool.isRequired,
  children: PropTypes.node,
  title: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default DocumentationPage;
