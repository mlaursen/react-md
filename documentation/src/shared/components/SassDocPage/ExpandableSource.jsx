import React, { PureComponent, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import AccessibleFakeButton from 'react-md/lib/Helpers/AccessibleFakeButton';
import { Motion, spring } from 'react-motion';

import ScssMarkdown from './ScssMarkdown';

export default class ExpandableSource extends PureComponent {
  static propTypes = {
    code: PropTypes.string.isRequired,
    className: PropTypes.string,
    children: PropTypes.node,
  };

  constructor(props) {
    super(props);

    this.state = {};

    this._setButton = this._setButton.bind(this);
    this._toggleSource = this._toggleSource.bind(this);
  }

  _setButton(button) {
    this._button = findDOMNode(button);
  }

  _toggleSource(e) {
    
  }

  render() {
    const { code } = this.props;
    if (!code.match(/\r?\n/)) {
      return (
        <AccessibleFakeButton
          disabled
          className="md-paper md-paper--1 md-card-text expandable-source"
          component={ScssMarkdown}
          markdown={code}
        />
      );
    }

    const decrementing = false;

    return (
      <Motion
        style={{ height: spring(88) }}
        defaultStyle={{ height: 88 }}
      >
        {style => (
          <div>
            <AccessibleFakeButton
              ref={this._setButton}
              style={style}
              onClick={this._toggleSource}
              component={ScssMarkdown}
              className="md-paper md-paper--1 md-card-text expandable-source"
              markdown={code}
            />
            <h5 className="md-cell--right md-color--secondary-text md-text-right">
              {`Click to ${decrementing ? 'expand' : 'collapse'}`}
            </h5>
          </div>
        )}
      </Motion>
    );
  }
}
