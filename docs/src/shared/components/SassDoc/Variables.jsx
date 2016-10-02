import React, { PureComponent, PropTypes } from 'react';
import variableShape from './variableShape';

import Variable from './Variable';

export default class Variables extends PureComponent {
  static propTypes = {
    rawFile: PropTypes.string.isRequired,
    variables: PropTypes.arrayOf(variableShape).isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { variables, rawFile } = this.props;
    return (
      <section className="md-cell md-cell--12">
        <header>
          <h2 className="md-display-1">Variables</h2>
        </header>
        {variables.map(variable => <Variable key={variable.context.name} variable={variable} rawFile={rawFile} />)}
      </section>
    );
  }
}
