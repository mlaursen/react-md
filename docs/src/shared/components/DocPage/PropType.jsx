import React, { PureComponent, PropTypes } from 'react';
import { TableColumn } from 'react-md/lib/DataTables';

import Markdown from 'components/Markdown';
import { getPropTypeString } from 'utils/StringUtils';

export default class PropType extends PureComponent {
  static propTypes = {
    type: PropTypes.shape({
      name: PropTypes.string.isRequired,
      raw: PropTypes.string,
      value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object,
        PropTypes.arrayOf(PropTypes.object),
      ]),
      description: PropTypes.string,
      computed: PropTypes.bool,
    }).isRequired,
    required: PropTypes.bool,
  };

  render() {
    const { type, required } = this.props;

    const markdown = `\`\`\`js\n${getPropTypeString(type) + (required ? ' *' : '')}\n\`\`\``;
    return (
      <TableColumn className="prop-name justified" tooltipLabel={required ? 'Required' : null} tooltipPosition="top" tooltipDelay={300}>
        <Markdown markdown={markdown} />
      </TableColumn>
    );
  }
}
