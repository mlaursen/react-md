import React from 'react';
import PropTypes from 'prop-types';
import { CardText } from 'react-md';

import Markdown from 'components/Markdown';
import FunctionParameterTable from './FunctionParameterTable';

const FunctionsSection = ({ id, name, description, returns, params }) => {
  const fnParams = params.reduce((str, p) => `${str}${str.length ? ', ' : ''}${p.name}`, '');

  return (
    <section className="prop-types__functions" id={`${id}-${name}`}>
      <Markdown component="h3" markdown={`\`\`\`js\n${name}(${fnParams})${returns ? `: ${returns.type}` : ''}\n\`\`\``} />
      <Markdown markdown={description} component={CardText} />
      <FunctionParameterTable params={params} />
    </section>
  );
};

FunctionsSection.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  returns: PropTypes.shape({
    description: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }),
  params: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  })).isRequired,
};

export default FunctionsSection;
