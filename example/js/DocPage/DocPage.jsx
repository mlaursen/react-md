import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import DocCode from './DocCode.jsx';
import DocExamples from './DocExamples.jsx';
import DocProps from './DocProps.jsx';
import DocExampleCode from './DocExampleCode.jsx';

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
    code: PropTypes.string.isRequired,
  }

  render() {
    const { imports, defaultImport, examples, components, sectionName, code } = this.props;
    let docSectionName = (sectionName || components[0].component.name).split(/(?=[A-Z])/);
    const cssClassName = docSectionName.map(s => s.toLowerCase()).join('-');
    const title = docSectionName.join(' ');
    docSectionName = docSectionName.join('');
    const href = `https://github.com/mlaursen/react-md/tree/master/src/js/${docSectionName}`;

    return (
      <div className={`react-md-doc react-md-${cssClassName}`}>
        <h1 className="md-display-2">{title}</h1>
        <DocCode imports={imports} defaultImport={defaultImport || docSectionName} />
        {examples && <DocExamples examples={examples} className={cssClassName} />}
        <DocExampleCode code={code} href={href} />
        {components.map(component => <DocProps key={component.component.name} {...component} href={href} />)}
      </div>
    );
  }
}
