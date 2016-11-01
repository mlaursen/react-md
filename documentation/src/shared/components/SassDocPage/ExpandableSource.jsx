import React, { PureComponent, PropTypes } from 'react';
import AccessibleFakeButton from 'react-md/lib/Helpers/AccessibleFakeButton';
import { Motion, spring } from 'react-motion';

import toOneLineCode from 'utils/StringUtils/toOneLineCode';
import ScssMarkdown from './ScssMarkdown';

const INITIAL_HEIGHT = 83;

export default class ExpandableSource extends PureComponent {
  static propTypes = {
    code: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);

    const { code } = props;
    if (code.match(/\r?\n/)) {
      const oneLineCode = toOneLineCode(code);
      this.state = {
        multiline: true,
        oneLineCode,
        decrementing: false,
        height: INITIAL_HEIGHT,
        collapsed: true,
      };
    } else {
      this.state = { multiline: false };
    }

    this._setContainer = this._setContainer.bind(this);
    this._updateHeight = this._updateHeight.bind(this);
    this._toggleSource = this._toggleSource.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.collapsed !== prevState.collapsed && !this.state.collapsed) {
      this._updateHeight();
    }
  }

  _updateHeight() {
    if (!this._container) {
      return;
    }

    this.setState({ height: this._container.querySelector('pre').offsetHeight + 32 });
  }

  _setContainer(container) {
    if (container) {
      this._container = container;
    }
  }

  _toggleSource() {
    const collapsed = !this.state.collapsed;
    this.setState({ collapsed, height: collapsed ? INITIAL_HEIGHT : this.state.height });
  }

  render() {
    const { multiline, collapsed, height, oneLineCode } = this.state;
    const { code } = this.props;

    const props = {
      className: 'md-paper md-paper--1 md-card-text expandable-source',
      component: AccessibleFakeButton,
      markdown: code,
    };

    if (!multiline) {
      return <ScssMarkdown {...props} disabled />;
    }

    return (
      <Motion
        style={{ height: spring(height) }}
        defaultStyle={{ height: INITIAL_HEIGHT }}
      >
        {style => {
          if (collapsed && style.height < 100) {
            props.markdown = oneLineCode;
          }

          return (
            <div ref={this._setContainer}>
              <ScssMarkdown
                {...props}
                style={style}
                onClick={this._toggleSource}
              />
              <h5 className="md-cell--right md-color--secondary-text md-text-right">
                {`Click to ${collapsed ? 'expand' : 'collapse'}`}
              </h5>
            </div>
          );
        }}
      </Motion>
    );
  }
}
