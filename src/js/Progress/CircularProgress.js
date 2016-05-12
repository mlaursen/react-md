import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';
import { isBetween } from '../utils';

const ROATE_DISTANCE = 360 * 1.75;
const BASE_SIZE = 24; // font-icon font size

export default class CircularProgress extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  static propTypes = {
    style: PropTypes.object.isRequired,
    className: PropTypes.string,
    value: (props, propName, component) => {
      if(typeof props[propName] === 'undefined') { return; }
      let err = PropTypes.number(props, propName, component);
      if(!err) {
        const value = props[propName];
        if(!isBetween(value, 0, 100)) {
          err = new Error(`A determinate '${component}' was given a value '${value}'. The 'value' prop should be between 0 and 100`);
        }
      }

      return err;
    },
    scale: PropTypes.number,
    determinateDashoffset: PropTypes.number.isRequired,
    centered: PropTypes.bool,
  };

  static defaultProps = {
    style: {},
    scale: 1,
    determinateDashoffset: 187,
    centered: true,
  };

  render() {
    const {
      scale,
      style,
      className,
      value,
      determinateDashoffset,
      centered,
      ...props,
    } = this.props;

    const isDeterminate = typeof value === 'number';
    let circleStyle, svgStyle = style;
    if(isDeterminate) {
      const rotate = `rotate(${ROATE_DISTANCE / 100 * value}deg)`;
      circleStyle = {
        strokeDashoffset: determinateDashoffset - (determinateDashoffset / 100 * value),
      };

      svgStyle = Object.assign({}, style, {
        WebkitTransform: classnames(style.WebkitTransform, rotate),
        MozTransform: classnames(style.MozTransform, rotate),
        transform: classnames(style.transform, rotate),
      });
    }

    return (
      <svg
        {...props}
        style={svgStyle}
        className={classnames('md-circular-progress', className, {
          'determinate': isDeterminate,
          'indeterminate': !isDeterminate,
          'centered': centered,
        })}
        width={scale * BASE_SIZE}
        height={scale * BASE_SIZE}
        viewBox="0 0 66 66"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          className="md-circular-progress-path"
          strokeWidth="6"
          strokeLinecap="round"
          style={circleStyle}
          cx="33"
          cy="33"
          r="30"
        />
      </svg>
    );
  }
}
