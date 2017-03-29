import React, { PropTypes } from 'react';
import TableBody from 'react-md/lib/DataTables/TableBody';

import Row from './Row';

const Body = ({ facts, mobile }) => (
  <TableBody>
    {facts.map(fact => <Row key={fact.id || `${fact.name}-${fact.type}`} {...fact} mobile={mobile} />)}
  </TableBody>
);

Body.propTypes = {
  facts: PropTypes.arrayOf(PropTypes.object).isRequired,
  mobile: PropTypes.bool.isRequired,
};

export default Body;
