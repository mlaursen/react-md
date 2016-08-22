import React, { PureComponent, PropTypes } from 'react';

import Markdown from 'components/Markdown';
import { getMarkdownFileName } from 'utils/StringUtils';

export default class MarkdownPage extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      markdown: '',
    };
  }

  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  };

  componentWillMount() {
    const { location: { pathname } } = this.props;

    if (__CLIENT__) {
      require.ensure([], require => {
        this.setState({ markdown: require(`../../../${getMarkdownFileName(pathname)}.md`) });
      });
    } else {
      this.setState({ markdown: require(`../../../${getMarkdownFileName(pathname)}.md`) });
    }
  }

  render() {
    return (
      <main className="markdown-page">
        <Markdown markdown={this.state.markdown} className="container text-container" />
      </main>
    );
  }
}
