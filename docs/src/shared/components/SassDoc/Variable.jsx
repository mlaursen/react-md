import React, { PureComponent, PropTypes } from 'react';

import variableShape from './variableShape';
import Markdown from 'components/Markdown';
import ExpandableSource from './ExpandableSource';

export default class Variable extends PureComponent {
  static propTypes = {
    rawFile: PropTypes.string.isRequired,
    variable: variableShape,
  };

  render() {
    const { variable, rawFile } = this.props;
    const { name, line } = variable.context;
    return (
      <div className="sassdoc-group">
        <h3 id={name} className="md-headline">{name}</h3>
        <ExpandableSource rawFile={rawFile} line={line} commentRange={variable.commentRange} />
        <h4 className="md-title">Description</h4>
        <Markdown markdown={variable.description} />
        <h4 className="md-title">Variable</h4>
        <p>{variable.type}</p>
      </div>
    );
  }
}
