import React, { PureComponent, PropTypes } from 'react';
import mixinShape from './mixinShape';

import Markdown from 'components/Markdown';
import Parameters from './Parameters';
import ExpandableSource from './ExpandableSource';

export default class Mixin extends PureComponent {
  static propTypes = {
    mixin: mixinShape,
    rawFile: PropTypes.string.isRequired,
  };

  render() {
    const { mixin, rawFile } = this.props;
    const { name, line } = mixin.context;
    return (
      <div className="sassdoc-group">
        <h2 id={name} className="md-headline">{name}</h2>
        <ExpandableSource rawFile={rawFile} line={line} commentRange={mixin.commentRange} />
        <h4 className="md-title">Description</h4>
        <Markdown markdown={mixin.description} />
        <h4 className="md-title">Parameters</h4>
        <Parameters parameters={mixin.parameter} />
      </div>
    );
  }
}
