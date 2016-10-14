import React, { PureComponent, PropTypes } from 'react';
import cn from 'classnames';
import { TableRow, TableColumn } from 'react-md/lib/DataTables';

import { getDeprecatedReason, getPropTypeString, getAdditionalPropTypeDescriptions } from 'utils/StringUtils';
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
    const { description, required, name, defaultValue } = this.props;
    const type = getPropTypeString(this.props.type);
    const deprecated = type === 'deprecated';

    const additionalDescriptions = getAdditionalPropTypeDescriptions(type, name);
    let markdown = description + additionalDescriptions;
    if (deprecated) {
      markdown += getDeprecatedReason(name, this.props.type);
    }
    return (
      <TableRow autoAdjust={false}>
        <TableColumn
          className={cn('prop-name justified', {
            'md-color--disabled': type === 'deprecated',
            'prop-name--deprecated': type === 'deprecated',
          })}
        >
          {name}
        </TableColumn>
        <PropType type={type} required={required} />
        <TableColumn className="prop-info grow">
          <DefaultValue defaultValue={defaultValue} />
          <Markdown markdown={markdown} className="prop-description" />
        </TableColumn>
      </TableRow>
    );
  }
}
