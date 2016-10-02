import React, { PureComponent, PropTypes, Children, cloneElement } from 'react';
import { findDOMNode } from 'react-dom';
import { Motion, spring } from 'react-motion';

/**
 * The `Collapse` component is used to animate a single child entering
 * or leaving.
 */
export default class Collapse extends PureComponent {
  static propTypes = {
    collapsed: PropTypes.bool.isRequired,
    className: PropTypes.string,
    children: PropTypes.element.isRequired,
  };

  constructor(props) {
    super(props);

    if (!props.collapsed) {
      this.state = { initialOpen: true };
    } else {
      this.state = { height: 0, paddingTop: 0, paddingBottom: 0 };
    }

    this._setHeight = this._setHeight.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.initialOpen && nextProps.collapsed) {
      this.setState({ initialOpen: false });
    }
  }

  _spring(collapsed, initialOpen, value) {
    const nextValue = !collapsed ? Math.max(0, value) : 0;
    if (initialOpen && !collapsed) {
      return nextValue;
    }

    return spring(nextValue);
  }

  _setHeight(child) {
    let height = 0;
    let paddingTop = 0;
    let paddingBottom = 0;
    if (child !== null) {
      const node = findDOMNode(child);
      const cs = window.getComputedStyle(node);
      height = node.offsetHeight;
      paddingTop = parseInt(cs.getPropertyValue('padding-top'), 10);
      paddingBottom = parseInt(cs.getPropertyValue('padding-bottom'), 10);
    }

    this.setState({ height, paddingTop, paddingBottom });
  }

  render() {
    const { height, paddingTop, paddingBottom, initialOpen } = this.state;
    const { children, collapsed } = this.props;
    return (
      <Motion
        style={{
          height: this._spring(collapsed, initialOpen, height),
          paddingTop: this._spring(collapsed, initialOpen, paddingTop),
          paddingBottom: this._spring(collapsed, initialOpen, paddingBottom),
        }}
        defaultStyle={{
          height,
          paddingTop,
          paddingBottom,
        }}
      >
        {style => {
          if (collapsed && !style.height) {
            return null;
          }

          const child = Children.only(children);
          let nextStyle = child.props.style;
          if (collapsed || style.height !== height) {
            nextStyle = Object.assign({}, child.props.style, {
              ...style,
              overflow: 'hidden',
            });
          }
          return cloneElement(child, {
            ref: this._setHeight,
            style: nextStyle,
          });
        }}
      </Motion>
    );
  }
}
