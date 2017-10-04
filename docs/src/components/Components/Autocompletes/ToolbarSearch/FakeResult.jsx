import React from 'react';
import PropTypes from 'prop-types';
import { Paper } from 'react-md';

const FakeResult = ({ index, value }) => {
  let children;
  if (index === 0) {
    children = (
      <span className="toolbar-search__fake-result__maps md-text--secondary">
        {`Map results for ${value}`}
      </span>
    );
  }

  return (
    <Paper className="md-cell md-cell--12 toolbar-search__fake-result md-background--card">
      {children}
    </Paper>
  );
};

FakeResult.propTypes = {
  index: PropTypes.number.isRequired,
  value: PropTypes.string.isRequired,
};

export default FakeResult;
