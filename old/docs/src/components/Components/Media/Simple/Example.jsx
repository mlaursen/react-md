import React from 'react';
import PropTypes from 'prop-types';
import loremIpsum from 'lorem-ipsum';
import { Paper } from 'react-md';

const Example = ({ children }) => (
  <Paper className="md-cell md-cell--12 md-grid">
    <section className="md-cell md-cell--3-tablet md-cell--4-desktop">
      {children}
    </section>
    <section className="md-cell md-cell--5-tablet md-cell--8-desktop">
      <p>{loremIpsum({ count: 1, units: 'paragraphs' })}</p>
    </section>
  </Paper>
);

Example.propTypes = {
  children: PropTypes.node.isRequired,
};
export default Example;
