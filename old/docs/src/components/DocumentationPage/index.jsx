import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Grid, CircularProgress } from 'react-md';

const ACCESSIBILITY_PROPS = {
  'aria-describedby': 'loading-documentation',
  'aria-busy': true,
};

const DocumentationPage = ({ loading, children, title, ...otherProps }) => {
  let content = children;
  let props;
  if (loading) {
    content = <CircularProgress id="loading-documentation" key="loading" />;
    props = ACCESSIBILITY_PROPS;
  }

  return (
    <Grid component="section" gutter={40} spacing={16} {...props} {...otherProps}>
      <Helmet title={title} />
      {content}
    </Grid>
  );
};

DocumentationPage.propTypes = {
  loading: PropTypes.bool.isRequired,
  children: PropTypes.node,
  title: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default DocumentationPage;
