import React, { PureComponent, PropTypes } from 'react';
import cn from 'classnames';

import Markdown from 'components/Markdown';
import ExampleCard from './ExampleCard';

export default class ExamplesPage extends PureComponent {
  static propTypes = {
    style: PropTypes.object,
    className: PropTypes.string,
    params: PropTypes.shape({
      component: PropTypes.string.isRequired,
      section: PropTypes.string,
    }).isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,

    children: PropTypes.node,
  };

  constructor(props) {
    super(props);

    this.state = { examples: [], readme: '' };
  }

  componentWillMount() {
    const { component, section } = this.props.params;
    let folder = component;
    if (component === 'selection-control') {
      folder = section;
    } else if (section) {
      folder = `${section}/${component}`;
    }

    if (__CLIENT__) {
      require.ensure([], require => {
        const examples = require(`components/${folder}/index.js`).default;
        const readme = require(`components/${folder}/README.md`);

        this.setState({ examples, readme });
      });
    } else {
      const examples = require(`components/${folder}/index.js`).default;
      const readme = require(`components/${folder}/README.md`);

      this.setState({ examples, readme });
    }
  }

  render() {
    const { readme } = this.state;
    const { style, className } = this.props;
    const examples = this.state.examples.map((example, i) => (
      <ExampleCard key={example.title || i} {...example} fallbackId={`example-${i}`} />
    ));

    return (
      <section style={style} className={cn('examples-page md-grid md-grid--40-16', className)}>
        <Markdown markdown={readme} component="header" className="md-cell md-cell--12 md-text-container" />
        {examples}
      </section>
    );
  }
}
