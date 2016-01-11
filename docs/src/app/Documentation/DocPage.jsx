import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import marked from 'marked';

import Example from './Example';
import ComponentProperties from './ComponentProperties';
import './_documentation.scss';
import './_markdown.scss';

export default class DocPage extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  static propTypes = {
    sectionName: PropTypes.string,
    examples: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      markdown: PropTypes.string.isRequired,
      children: PropTypes.node.isRequired,
    })).isRequired,
    components: PropTypes.arrayOf(PropTypes.shape({
      component: PropTypes.func.isRequired,
      desc: PropTypes.string,
      details: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        desc: PropTypes.string.isRequired,
        pt: PropTypes.string,
      })).isRequired,
    })).isRequired,
    children: PropTypes.node.isRequired,
    allRemaining: PropTypes.bool,
  };

  static defaultProps = {
    allRemaining: true,
  };

  componentWillMount() {
    marked.setOptions({
      renderer: new marked.Renderer(),
      gfm: true,
      tables: true,
      breaks: false,
      pedantic: false,
      sanitize: false,
      smartLists: true,
      smartypants: false,
      highlight: (code, lang) => require('highlight.js').highlight(lang, code).value, // eslint-disable-line no-undef
    });
  }

  render() {
    const { sectionName, examples, children, components, allRemaining } = this.props;
    let docSectionName = (sectionName || components[0].component.name).split(/(?=[A-Z])/);
    const cssSectionName = docSectionName.map(s => s.toLowerCase()).join('-');
    const title = docSectionName.join(' ');
    docSectionName = docSectionName.join();

    return (
      <div className={`documentation documentation-${cssSectionName}`}>
        <header className="component-info">
          <h1 className="md-display-2">{title}</h1>
          <hr />
          {typeof children === 'string' ? <p>{children}</p> : children}
        </header>
        {examples.map((example, i) => <Example key={`example-${i}`} {...example} marked={marked} />)}
        {components.map((component, i) => (
          <ComponentProperties
            key={`properties-${i}`}
            marked={marked}
            sectionName={docSectionName}
            allRemaining={allRemaining}
            {...component}
          />
        ))}
      </div>
    );
  }
}
