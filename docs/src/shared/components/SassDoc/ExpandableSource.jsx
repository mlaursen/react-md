import React, { PureComponent, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import AccessibleFakeButton from 'react-md/lib/Helpers/AccessibleFakeButton';
import { Motion, spring } from 'react-motion';

import lineType from './lineType';
import ScssMarkdown from './ScssMarkdown';

const INITIAL_HEIGHT = 83;

function isMultiline(source) {
  return source && !!source.match(/\r?\n/);
}

function extractSource(source, { start: sourceStart, end: sourceEnd }, { end: commentEnd } = {}) {
  const start = commentEnd ? commentEnd + 1 : sourceStart;

  const split = source.split(/\r?\n/);

  if (start === sourceEnd) {
    return split[start - 1];
  }

  return split.slice(start - 1, sourceEnd).join('\n');
}

function trim(string) {
  return string.replace(/\r?\n/g, '').replace(/ {2}/, '').replace(/ {2}/g, ' ');
}

const MAP_SPLIT = ': (';
const MIXIN_SPLIT = '{';

function hideSource(source) {
  let s;
  let delimiter = '}';
  if (!source.match(/@mixin/)) {
    delimiter = ')';
    s = source.substring(0, source.indexOf(MAP_SPLIT) + MAP_SPLIT.length);
  } else {
    s = source.substring(0, source.indexOf(MIXIN_SPLIT) + MIXIN_SPLIT.length);
  }

  return `${trim(s)} \u2026 ${delimiter}`;
}

function getSelectedText() {
  if (typeof window.getSelection === 'function') {
    return window.getSelection().toString();
  } else if (typeof document.selection !== 'undefined' && document.selection.type === 'Text') {
    return document.selection.createRange().text;
  }

  return '';
}

export default class ExpandableSource extends PureComponent {
  static propTypes = {
    commentRange: lineType,
    line: lineType,
    rawFile: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);

    const source = extractSource(props.rawFile, props.line, props.commentRange);
    const oneLineSource = hideSource(source);
    this.state = {
      source,
      height: INITIAL_HEIGHT,
      decrementing: false,
      oneLineSource,
      visibleSource: isMultiline(source) ? oneLineSource : source,
    };

    this._setHeight = this._setHeight.bind(this);
    this._setButton = this._setButton.bind(this);
    this._toggleSource = this._toggleSource.bind(this);
    this._maybeToggleSource = this._maybeToggleSource.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.rawFile !== nextProps.rawFile) {
      const source = extractSource(nextProps.rawFile, nextProps.line, nextProps.commentRange);
      const oneLineSource = hideSource(source);
      this.setState({
        source,
        oneLineSource,
        visibleSource: isMultiline(source) ? oneLineSource : source,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { height, visibleSource } = this.state;
    if (height === INITIAL_HEIGHT && visibleSource !== prevState.visibleSource) {
      this._setHeight();
    }
  }

  _setButton(button) {
    this._button = findDOMNode(button);
  }

  _setHeight() {
    if (!this._button) {
      return;
    }

    this.setState({ height: this._button.childNodes[0].offsetHeight + 32 });
  }

  _toggleSource() {
    if (this._button) {
      const text = getSelectedText();
      if (text && this._button.textContent.indexOf(text) !== -1) {
        return;
      }
    }

    if (this.state.height > INITIAL_HEIGHT) {
      this.setState({ height: INITIAL_HEIGHT, decrementing: true });
    } else {
      this.setState({ visibleSource: this.state.source });
    }
  }

  _maybeToggleSource() {
    if (this.state.height === INITIAL_HEIGHT) {
      this.setState({ visibleSource: this.state.oneLineSource, decrementing: false });
    }
  }

  render() {
    const { visibleSource, height, oneLineSource, decrementing, source } = this.state;
    if (!isMultiline(source)) {
      return (
        <AccessibleFakeButton
          component={ScssMarkdown}
          disabled
          className="md-paper md-paper--1 md-card-text expandable-source"
          markdown={source}
        />
      );
    }

    return (
      <Motion
        style={{ height: spring(height) }}
        defaultStyle={{ height: INITIAL_HEIGHT }}
        onRest={this._maybeToggleSource}
      >
        {style => {
          let markdown = visibleSource;
          if (style.height < 100 && decrementing) {
            markdown = oneLineSource;
          }

          return (
            <div>
              <AccessibleFakeButton
                ref={this._setButton}
                style={style}
                onClick={this._toggleSource}
                component={ScssMarkdown}
                className="md-paper md-paper--1 md-card-text expandable-source"
                markdown={markdown}
              />
              <h5 className="md-cell--right md-color--secondary-text md-text-right">
                {`Click to ${decrementing || visibleSource === oneLineSource ? 'expand' : 'collapse'}`}
              </h5>
            </div>
          );
        }}
      </Motion>
    );
  }
}
