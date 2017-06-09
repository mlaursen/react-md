import React from 'react';
import PropTypes from 'prop-types';
import sassdocShape from './sassdocShape';

import SassDoc from './SassDoc';

const Section = ({ title, data }) => {
  if (!data.length) {
    return null;
  }

  return (
    <section className="md-cell md-cell--12">
      <h2 className="md-display-1">{title}</h2>
      {data.map(sassdoc => <SassDoc key={sassdoc.name} sassdoc={sassdoc} />)}
    </section>
  );
};

Section.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(sassdocShape).isRequired,
};

export default Section;
