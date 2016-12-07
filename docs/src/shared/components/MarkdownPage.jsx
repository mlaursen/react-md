import React, { PureComponent, PropTypes } from 'react';
import cn from 'classnames';
import toPageTitle from 'utils/StringUtils/toPageTitle';

import Markdown from './Markdown';

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
    this._getMarkdown = this._getMarkdown.bind(this);
  }

  componentWillMount() {
    const { location: { pathname } } = this.props;

    this._getMarkdown(pathname);
  }

  _getMarkdown(pathname) {
    let fileName;
    if (pathname.match(/upgrade-guides/)) {
      fileName = `upgrade-guides/${pathname.split('/').reverse()[0]}`;
    } else {
      fileName = toPageTitle(pathname).replace(/ /g, '');
    }

    fileName = `${fileName}.md`;

    if (__CLIENT__) {
      require.ensure([], require => {
        this.setState({ markdown: require(`readmes/${fileName}`) });
      });
    }

    this.setState({ markdown: require(`readmes/${fileName}`) });
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
