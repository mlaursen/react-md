import React, { PureComponent, PropTypes } from 'react';
import toPageTitle from 'utils/StringUtils/toPageTitle';

import Markdown from './Markdown';

function getMarkdown(pathname) {
  const fileName = `./${toPageTitle(pathname).replace(/ /g, '')}.md`;
  if (__CLIENT__) {
    const context = require.context('readmes', false, /\.md$/);

    return context(fileName);
  }

  return require(`readmes/${fileName}`);
}

export default class MarkdownPage extends PureComponent {
  static propTypes = {
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props);

    this.state = { markdown: '' };
  }

  componentWillMount() {
    const { location: { pathname } } = this.props;

    this.setState({ markdown: getMarkdown(pathname) });
  }

  render() {
    return (
      <section className="md-grid">
        <Markdown markdown={this.state.markdown} className="md-text-container md-cell md-cell--12" />
      </section>
    );
  }
}
