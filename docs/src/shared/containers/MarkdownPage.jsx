import React, { PureComponent, PropTypes } from 'react';

import Markdown from 'components/Markdown';
import { getMarkdownFileName } from 'utils/StringUtils';


function getMarkdown(pathname) {
  if (__CLIENT__) {
    const context = require.context('../../readmes', false, /\.md/);
    const fileName = `./${getMarkdownFileName(pathname)}.md`;

    let file = context(fileName);
    if (module.hot) {
      module.hot.accept(context.id, () => {
        const reloadedContext = require.context('../../readmes', false, /\.md$/);

        file = reloadedContext(fileName);
      });
    }

    return file;
  } else {
    return require(`../../readmes/${getMarkdownFileName(pathname)}.md`);
  }
}

export default class MarkdownPage extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      markdown: '',
    };
  }

  componentWillMount() {
    const { location: { pathname } } = this.props;

    this.setState({ markdown: getMarkdown(pathname) });
  }

  render() {
    return (
      <main className="markdown-page">
        <Markdown markdown={this.state.markdown} className="container text-container" />
      </main>
    );
  }
}
