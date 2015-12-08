import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import DocCode from './DocCode.jsx';
import DocExamples from './DocExamples.jsx';
import DocProps from './DocProps.jsx';

export default class DocPage extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  static propTypes = {
    imports: PropTypes.arrayOf(PropTypes.string).isRequired,
    defaultImport: PropTypes.string,
    examples: PropTypes.arrayOf(PropTypes.object),
    sectionName: PropTypes.string,
    components: PropTypes.arrayOf(PropTypes.shape({
      component: PropTypes.func.isRequired,
      details: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        desc: PropTypes.string.isRequired,
        propType: PropTypes.string,
      })).isRequired,
    })).isRequired,
  }

  render() {
    const { imports, defaultImport, examples, components, sectionName } = this.props;
    let docSectionName = (sectionName || components[0].component.name).split(/(?=[A-Z])/);
    const cssClassName = docSectionName.map(s => s.toLowerCase()).join('-');
    const title = docSectionName.join(' ');
    docSectionName = docSectionName.join();

    return (
      <div className={`react-md-doc react-md-${cssClassName}`}>
        <h1 className="md-display-2">
          {title}
          <a className="react-md-source" href={`https://github.com/mlaursen/tree/master/src/js/${docSectionName}`}>Source code <span className="fa fa-github" /></a>
        </h1>
        <DocCode imports={imports} defaultImport={defaultImport || docSectionName} />
        <DocExamples examples={examples} className={cssClassName} />
        {components.map(component => <DocProps key={component.component.name} {...component} />)}
      </div>
    );
  }
}
