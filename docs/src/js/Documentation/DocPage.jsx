import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import Example from './Example';
import ComponentProperties from './ComponentProperties';
import './_documentation.scss';

export default class DocPage extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  static propTypes = {
    sectionName: PropTypes.string,
    examples: PropTypes.arrayOf(PropTypes.shape({
      markdown: PropTypes.string.isRequired,
      children: PropTypes.node.isRequired,
    })).isRequired,
    components: PropTypes.arrayOf(PropTypes.shape({
      component: PropTypes.func.isRequired,
      details: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        desc: PropTypes.string.isRequired,
        pt: PropTypes.string,
      })).isRequired,
    })).isRequired,
    children: PropTypes.node.isRequired,
  };

  render() {
    const { sectionName, examples, children, components } = this.props;
    let docSectionName = (sectionName || components[0].component.name).split(/(?=[A-Z])/);
    const cssSectionName = docSectionName.map(s => s.toLowerCase()).join('-');
    const title = docSectionName.join(' ');
    docSectionName = docSectionName.join();

    return (
      <div className={`documentation documentation-${cssSectionName}`}>
        <header className="component-info">
          <h1 className="md-display-2">{title}</h1>
          <hr />
          <p>{children}</p>
        </header>
        {examples.map((example, i) => <Example key={`example-${i}`} {...example} />)}
        <section className="prop-types">
          {components.map((component, i) => <ComponentProperties key={`properties-${i}`} {...component} />)}
        </section>
      </div>
    );
  }
}
