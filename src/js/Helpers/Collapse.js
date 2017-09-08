import React, { PureComponent, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import { Motion, spring } from 'react-motion';

/**
 * The `Collapse` component is used to animate a single child entering
 * or leaving. This uses the `react-motion` library to animate the height,
 * padding-top, and padding-bottom of an element when the `collapsed` prop
 * changes.
 */
export default class Collapse extends PureComponent {
  static propTypes = {
    /**
     * An optional style to merge with the `Motion` style.
     */
    style: PropTypes.object,

    /**
     * An optional default style to merge with the `Motion` default style.
     */
    defaultStyle: PropTypes.object,

    /**
     * Boolean if the children are currently collapsed.
     */
    collapsed: PropTypes.bool.isRequired,

    /**
     * A single child to collapse or expand.
     */
    children: PropTypes.element.isRequired,

    /**
     * The spring config to use for the animation.
     */
    springConfig: PropTypes.object.isRequired,

    /**
     * Boolean if the single child entering or leaving should be animated.
     */
    animate: PropTypes.bool,

    /**
     * The min height to apply for the collapse div.
     */
    minHeight: PropTypes.number.isRequired,
  };

  static defaultProps = {
    animate: true,
    springConfig: {
      precision: 0.5,
    },
    minHeight: 0,
  };

  constructor(props) {
    super(props);

    if (!props.collapsed) {
      this.state = { initialOpen: true };
    } else {
      this.state = {
        height: props.minHeight,
        paddingTop: 0,
        paddingBottom: 0,
      };
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.initialOpen && nextProps.collapsed) {
      this.setState({ initialOpen: false });
    }
  }

  _spring(collapsed, initialOpen, value, config, min = 0) {
    const nextValue = !collapsed ? Math.max(min, value) : min;
    if (initialOpen && !collapsed) {
      return nextValue;
    }

    return spring(nextValue, config);
  }

  _setHeight = (child) => {
    if (this._child && typeof this._child.ref === 'function') {
      this._child.ref(child);
    }

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

    height = Math.max(this.props.minHeight, height);

    this.setState({ height, paddingTop, paddingBottom });
  };

  render() {
    const { height, paddingTop, paddingBottom, initialOpen } = this.state;
    const {
      children,
      collapsed,
      defaultStyle,
      style: motionStyle,
      springConfig,
      animate,
      minHeight,
    } = this.props;

    if (!animate) {
      return collapsed ? null : children;
    }

    return (
      <Motion
        style={{
          ...motionStyle,
          height: this._spring(collapsed, initialOpen, height, springConfig, minHeight),
          paddingTop: this._spring(collapsed, initialOpen, paddingTop, springConfig),
          paddingBottom: this._spring(collapsed, initialOpen, paddingBottom, springConfig),
        }}
        defaultStyle={{
          ...defaultStyle,
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
          this._child = child;
          let nextStyle = child.props.style;
          if ((collapsed && (!minHeight || style.height !== minHeight)) || style.height !== height) {
            nextStyle = {
              ...child.props.style,
              ...style,
              overflow: 'hidden',
            };
          }
          return cloneElement(child, {
            ref: !collapsed && this._setHeight,
            style: nextStyle,
          });
        }}
      </Motion>
    );
  }
}
