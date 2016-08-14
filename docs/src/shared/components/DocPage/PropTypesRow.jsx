import React, { PureComponent, PropTypes } from 'react';
import { TableRow, TableColumn } from 'react-md/lib/DataTables';

import { getAdditionalPropTypeDescriptions } from 'utils/StringUtils';
import Markdown from 'components/Markdown';
import PropType from './PropType';
import DefaultValue from './DefaultValue';

export default class PropTypeRow extends PureComponent {
  static propTypes = {
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    defaultValue: PropTypes.shape({
      computed: PropTypes.bool,
      value: PropTypes.string,
    }),
    required: PropTypes.bool,
    type: PropTypes.shape({
      name: PropTypes.string.isRequired,
      raw: PropTypes.string,
      value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object,
        PropTypes.arrayOf(PropTypes.object),
      ]),
    }).isRequired,
  };

  render() {
    const { description, required, type, name, defaultValue } = this.props;

    const additionalDescriptions = getAdditionalPropTypeDescriptions(type, name);
    return (
      <TableRow autoAdjust={false}>
        <TableColumn className="prop-name justified">{name}</TableColumn>
        <PropType type={type} required={required} />
        <TableColumn className="prop-info grow">
          <DefaultValue defaultValue={defaultValue} />
          <Markdown markdown={description + additionalDescriptions} className="prop-description" />
        </TableColumn>
      </TableRow>
    );
  }
}
