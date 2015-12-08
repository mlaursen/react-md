import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

//import { Card, CardTitle, CardText } from '../../../src/js/index';
import CodeComment from './CodeComment.jsx';

export default class DocCode extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  static propTypes = {
    imports: PropTypes.arrayOf(PropTypes.string).isRequired,
    defaultImport: PropTypes.string.isRequired,
  }

  render() {
    const { imports, defaultImport } = this.props;
    let di = null;
    imports.some(i => {
      if(i === defaultImport) { di = i; }
      return i === defaultImport;
    });
    return (
      <code className="react-md-code">
        <CodeComment comment="Import statements" />
        <span key="imports" className="react-md-code-block">
          {`import { ${imports.join(', ')} } from 'react-md';`}
        </span>
        <CodeComment comment="Or from the component folder..." />
        <span key="folder-imports" className="react-md-code-block">
          {`import${di ? (' ' + di + ',') : ''} { ${imports.filter(i => i !== di).join(', ')} } from 'react-md/${defaultImport}';`}
        </span>
      </code>
    );
  }
}
