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
    return (
      <code className="react-md-code">
        <CodeComment comment="Import statements" />
        {imports.map(name => {
          return <pre key={`whole-${name}`} className="react-md-code-block">{`import { ${name} } from 'react-md';`}</pre>;
        })}
        <CodeComment comment="Or from the component folder..." />
        {imports.map(name => {
          const isDefault = name === defaultImport;
          return <pre key={`specific-${name}`} className="react-md-code-block">{`import ${!isDefault ? '{ ' : ''}${name}${!isDefault ? ' }' : ''} from 'react-md/${defaultImport}';`}</pre>;
        })}
      </code>
    );
  }
}
