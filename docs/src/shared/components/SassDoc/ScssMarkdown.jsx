import React, { PureComponent, PropTypes } from 'react';
import Markdown from 'components/Markdown';

export default class ScssMarkdown extends PureComponent {
  static propTypes = {
    markdown: PropTypes.string.isRequired,
  };

  render() {
    const { markdown, ...props } = this.props;
    return (
      <Markdown {...props} markdown={`\`\`\`scss\n${markdown}\n\`\`\``} />
    );
  }
}
