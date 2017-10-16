import React from 'react';
import PropTypes from 'prop-types';
import { kebabCase } from 'lodash/string';
import { TableRow, TableColumn, bem } from 'react-md';

import QuickLink from 'components/QuickLink';
import Markdown from 'components/Markdown';

const quick = 'quick-link';
const base = 'prop-types';
const cell = bem(base, 'cell');

const PropTypesRow = ({ propName, type, required, defaultValue, description, baseId }) => {
  let descriptionMarkdown = description;
  if (defaultValue) {
    descriptionMarkdown = `default: \`${defaultValue}\`\n\n${description}`;
  }

  const deprecated = type.indexOf('deprecated') !== -1;
  const id = `${baseId}-proptypes-${kebabCase(propName)}`;

  return (
    <TableRow id={id} tabIndex={-1} className={quick}>
      <TableColumn
        className={bem(quick, 'container', {}, cell, bem(base, 'prop-name', {
          'deprecated md-text--secondary': deprecated,
        }))}
      >
        <QuickLink id={id} props />
        {propName}
      </TableColumn>
      <TableColumn
        className={bem(base, 'prop-type', {}, cell)}
        tooltipLabel={required ? 'Required' : null}
        tooltipDelay={300}
        tooltipPosition="top"
      >
        <Markdown markdown={`\`\`\`js\n${type}${required ? ' *' : ''}\n\`\`\``} lineNumbers={false} />
      </TableColumn>
      <TableColumn className={bem(base, 'normal-column', {}, cell)}>
        <Markdown markdown={descriptionMarkdown} lineNumbers={false} />
      </TableColumn>
    </TableRow>
  );
};

PropTypesRow.propTypes = {
  propName: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  required: PropTypes.bool.isRequired,
  defaultValue: PropTypes.string,
  description: PropTypes.string,
  baseId: PropTypes.string.isRequired,
};

export default PropTypesRow;
