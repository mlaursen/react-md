import React, { PureComponent, PropTypes } from 'react';
import { TableColumn } from 'react-md/lib/DataTables';

import Markdown from 'components/Markdown';

export default class PropType extends PureComponent {
  static propTypes = {
    type: PropTypes.string.isRequired,
    required: PropTypes.bool,
  };

  render() {
    const { type, required } = this.props;

    const markdown = `\`\`\`js\n${type + (required ? ' *' : '')}\n\`\`\``;
    return (
      <TableColumn className="prop-name justified" tooltipLabel={required ? 'Required' : null} tooltipPosition="top" tooltipDelay={300}>
        <Markdown markdown={markdown} />
      </TableColumn>
    );
  }
}
