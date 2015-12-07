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
    component: PropTypes.func.isRequired,
    propsDesc: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      desc: PropTypes.string.isRequired,
    })),
  }

  render() {
    const { imports, defaultImport, examples, component, propsDesc } = this.props;
    const componentName = component.name;
    const cssClassName = componentName.split('(?=[A-Z])').map(s => s.toLowerCase()).join('-');

    return (
      <div className={`react-md-doc react-md-${cssClassName}`}>
        <h1 className="md-display-2">
          {componentName}
          <a className="react-md-source" href={`https://github.com/mlaursen/tree/master/src/js/${componentName}`}>Source code <span className="fa fa-github" /></a>
        </h1>
        <DocCode imports={imports} defaultImport={defaultImport || componentName} />
        <h4 className="md-display-1">Examples</h4>
        <DocExamples examples={examples} className={cssClassName} />
        <DocProps propsDesc={propsDesc} component={component} />
      </div>
    );
  }
}
