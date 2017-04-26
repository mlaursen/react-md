import React, { PureComponent, PropTypes } from 'react';
import { Motion, spring } from 'react-motion';

export default class TabIndicator extends PureComponent {
  static propTypes = {
    offset: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    visible: PropTypes.bool,
  };

  render() {
    const { visible } = this.props;
    return (
      <Motion
        style={{
          x: spring(this.props.offset),
          width: spring(this.props.width),
          height: spring(visible ? 2 : 0),
        }}
      >
        {({ x, height, width }) => {
          const transform = `translate3d(${x}px, 0, 0)`;
          return (
            <span
              style={{
                height,
                width,
                WebkitTransform: transform,
                MozTransform: transform,
                msTransform: transform,
                transform,
              }}
              className="md-tab-indicator"
            />
          );
        }}
      </Motion>
    );
  }
}
