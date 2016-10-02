import React, { PureComponent, PropTypes } from 'react';
import mixinShape from './mixinShape';
import AccessibleFakeButton from 'react-md/lib/Helpers/AccessibleFakeButton';

import extractSource from './extractSource';
import Markdown from 'components/Markdown';
import ScssMarkdown from './ScssMarkdown';
import Parameters from './Parameters';

function hideSource(source) {
  const s = source.substring(0, source.indexOf('{') + 1);
  return `${s.replace(/\r?\n/g, '').replace(/ {2}/, '').replace(/ {2}/g, ' ')} ... }`;
}

export default class Mixin extends PureComponent {
  static propTypes = {
    mixin: mixinShape,
    rawFile: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);

    const source = extractSource(props.rawFile, props.mixin.context.line, props.mixin.commentRange);
    this.state = { source, visibleSource: hideSource(source) };
    this._toggle = this._toggle.bind(this);
  }

  _toggle() {
    const { source, visibleSource } = this.state;
    this.setState({
      visibleSource: source === visibleSource ? hideSource(source) : source,
    });
  }

  render() {
    const { mixin } = this.props;
    const { name } = mixin.context;
    return (
      <div className="sassdoc-group">
        <h2 id={name} className="md-headline">{name}</h2>
        <AccessibleFakeButton
          onClick={this._toggle}
          component={ScssMarkdown}
          style={{ marginBottom: 16 }}
          className="md-card-text md-paper md-paper--1"
          markdown={this.state.visibleSource}
        />
        <h5 className="md-cell--right md-color--secondary-text md-text-right">Click to expand</h5>
        <h4 className="md-title">Description</h4>
        <Markdown markdown={mixin.description} />
        <h4 className="md-title">Parameters</h4>
        <Parameters parameters={mixin.parameter} />
      </div>
    );
  }
}
