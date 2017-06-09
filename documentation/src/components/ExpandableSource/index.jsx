import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import AccessibleFakeButton from 'react-md/lib/Helpers/AccessibleFakeButton';
import { Motion, spring } from 'react-motion';

import './_styles.scss';
import { ScssMarkdown } from 'components/Markdown';
import getSelectedText from 'utils/getSelectedText';

const BUTTON_HEIGHT = 49;

export default class ExpandableSource extends PureComponent {
  static propTypes = {
    code: PropTypes.string.isRequired,
    oneLineCode: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      multiline: props.code !== props.oneLineCode,
      height: BUTTON_HEIGHT,
      collapsed: true,
    };
  }

  setContainer = (container) => {
    this.container = container && container.querySelector('.md-fake-btn');
  };

  updateHeight = () => {
    if (!this.container || this.state.collapsed) {
      return;
    }

    const pre = this.container.querySelector('pre');
    const height = pre.offsetHeight;
    this.setState({ height });
  };

  toggleSource = (e) => {
    if (!this.container) {
      return;
    }

    const code = this.container.querySelector('code');
    const toolbar = this.container.querySelector('.toolbar');
    const text = getSelectedText();

    if (toolbar && toolbar.contains(e.target)) {
      return;
    }

    if (!text || (code && code.innerText.indexOf(text) === -1)) {
      const collapsed = !this.state.collapsed;
      this.setState({
        collapsed,
        height: collapsed ? BUTTON_HEIGHT : this.state.height,
      });
    }
  };

  render() {
    const { code, oneLineCode } = this.props;
    const { multiline, height, collapsed } = this.state;
    const props = {
      className: 'md-paper md-paper--1 expandable-source',
      component: AccessibleFakeButton,
      markdown: code,
    };

    if (!multiline) {
      return <ScssMarkdown {...props} disabled />;
    }

    return (
      <Motion
        style={{ height: spring(height) }}
        defaultStyle={{ height: BUTTON_HEIGHT }}
      >
        {(style) => {
          if (collapsed && style.height <= BUTTON_HEIGHT + 4) {
            props.markdown = oneLineCode;
          }

          let styles;
          if (style.height !== height) {
            styles = { ...style, overflow: 'hidden' };
          }

          return (
            <div ref={this.setContainer}>
              <ScssMarkdown {...props} style={styles} onClick={this.toggleSource} onHighlightFinish={this.updateHeight} />
              <h5 className="md-cell--right md-color--secondary-text md-text-right expandable-source__label">
                {`Click to ${collapsed ? 'expand' : 'collapse'}`}
              </h5>
            </div>
          );
        }}
      </Motion>
    );
  }
}
