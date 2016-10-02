import React, { PureComponent, PropTypes } from 'react';
import Paper from 'react-md/lib/Papers';

import extractSource from './extractSource';
import variableShape from './variableShape';
import ScssMarkdown from './ScssMarkdown';
import Markdown from 'components/Markdown';

export default class Variable extends PureComponent {
  static propTypes = {
    rawFile: PropTypes.string.isRequired,
    variable: variableShape,
  };

  render() {
    const { variable, rawFile } = this.props;
    const { name } = variable.context;
    return (
      <div className="sassdoc-group">
        <h3 id={name} className="md-headline">{name}</h3>
        <ScssMarkdown
          component={Paper}
          zDepth={1}
          style={{ marginBottom: 16 }}
          className="md-card-text"
          markdown={extractSource(rawFile, variable.context.line)}
        />
        <h4 className="md-title">Description</h4>
        <Markdown markdown={variable.description} />
        <h4 className="md-title">Variable</h4>
        <p>{variable.type}</p>
      </div>
    );
  }
}
