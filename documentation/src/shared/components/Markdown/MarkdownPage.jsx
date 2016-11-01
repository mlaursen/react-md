import React, { PureComponent, PropTypes } from 'react';
import cn from 'classnames';
import toPageTitle from 'utils/StringUtils/toPageTitle';

import Markdown from './Markdown';

function getMarkdown(pathname) {
  let fileName;
  if (pathname.match(/upgrade-guides/)) {
    fileName = `./upgrade-guides/${pathname.split('/').reverse()[0]}.md`;
  } else {
    fileName = `./${toPageTitle(pathname).replace(/ /g, '')}.md`;
  }

  if (__CLIENT__) {
    const context = require.context('readmes', true, /\.md$/);

    return context(fileName);
  }

  return require(`readmes/${fileName}`);
}

export default class MarkdownPage extends PureComponent {
  static propTypes = {
    style: PropTypes.object,
    className: PropTypes.string,
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
    const { style, className } = this.props;

    return (
      <section style={style} className={cn('md-grid', className)}>
        <Markdown markdown={this.state.markdown} className="md-text-container md-cell md-cell--12" />
      </section>
    );
  }
}
