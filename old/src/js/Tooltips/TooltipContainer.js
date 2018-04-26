import React, { PureComponent } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import cn from 'classnames';

import { TAB } from '../constants/keyCodes';
import captureNextEvent from '../utils/EventUtils/captureNextEvent';
import { addTouchEvent, removeTouchEvent } from '../utils/EventUtils/touches';
import Tooltip from './Tooltip';


function getContainer(tooltip) {
  return tooltip.parentNode;
}

export default class TooltipContainer extends PureComponent {
  static propTypes = {
    style: PropTypes.object,
    className: PropTypes.string,
    tooltipStyle: PropTypes.object,
    tooltipClassName: PropTypes.string,
    label: PropTypes.node.isRequired,
    position: Tooltip.propTypes.position,
    delay: PropTypes.number,
    enterTimeout: Tooltip.propTypes.enterTimeout,
    leaveTimeout: Tooltip.propTypes.leaveTimeout,
    /**
     * A function that returns a DOM element that will be used as the tooltip's container.
     * A ref to the tooltip's DOM element will be passed into the function.
     */
    container: PropTypes.func,
    /**
     * A component/element the tooltip should be linked to,
     * or a function that returns such a component/element.
     * A ref to the tooltip's container will be passed into the function.
     *
     * By default the tooltip's container will be used as the target.
     */
    target: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.func,
    ]),
  };

  static defaultProps = {
    container: getContainer,
    delay: 0,
  };

  state = { visible: false };

  componentDidMount() {
    this._setTarget();
  }

  componentDidUpdate(prevProps) {
    if (this.props.target !== prevProps.target) {
      this._setTarget();
    }
  }

  componentWillUnmount() {
    this._unlinkTarget();
    this._target = null;

    if (this._delayedTimeout) {
      clearTimeout(this._delayedTimeout);
    }
  }

  _delayedTimeout = null;

  _unlinkTarget = () => {
    const target = this._target;
    if (target) {
      removeTouchEvent(target, 'start', this._showTooltip);
      removeTouchEvent(target, 'end', this._hideTooltip);
      target.removeEventListener('mouseover', this._showTooltip);
      target.removeEventListener('mouseleave', this._hideTooltip);
      target.removeEventListener('keyup', this._handleKeyUp);
      target.removeEventListener('blur', this._hideTooltip);
    }
  };

  _setTarget = () => {
    const container = this._container;
    let { target } = this.props;

    this._unlinkTarget();

    if (typeof target === 'function') {
      target = target(container, this);
    }
    target = target ? findDOMNode(target) : container;
    this._target = target || null;

    if (target) {
      addTouchEvent(target, 'start', this._showTooltip);
      addTouchEvent(target, 'end', this._hideTooltip);
      target.addEventListener('mouseover', this._showTooltip);
      target.addEventListener('mouseleave', this._hideTooltip);
      target.addEventListener('keyup', this._handleKeyUp);
      target.addEventListener('blur', this._hideTooltip);
    }
  };

  _setContainers = (span) => {
    if (span) {
      this._container = this.props.container(span.parentNode, this);
    }
  };

  _stopContextMenu = (e) => {
    e.preventDefault();
    window.removeEventListener('contextmenu', this._stopContextMenu, true);
    captureNextEvent('click');
    this.setState({ visible: true });
  };

  _showTooltip = (e) => {
    if (e.type === 'mouseover' && this._touched) {
      return;
    }

    if (e.type === 'touchstart') {
      this._touched = true;

      window.addEventListener('contextmenu', this._stopContextMenu, true);
      return;
    }


    const { delay } = this.props;
    if (this._delayedTimeout) {
      clearTimeout(this._delayedTimeout);
    }

    if (delay) {
      this._delayedTimeout = setTimeout(() => {
        this._delayedTimeout = null;

        this.setState({ visible: true });
      }, delay);
    } else {
      this.setState({ visible: true });
    }
  };

  _hideTooltip = (e) => {
    if (this._delayedTimeout) {
      clearTimeout(this._delayedTimeout);
    }

    if (e.type === 'mouseover' && this._touched) {
      return;
    }

    this.setState({ visible: false });
  };

  _handleKeyUp = (e) => {
    if ((e.which || e.keyCode) === TAB) {
      this._showTooltip(e);
    }
  };

  render() {
    const { visible } = this.state;
    const {
      style,
      className,
      tooltipStyle,
      tooltipClassName,
      label,
      position,
      enterTimeout,
      leaveTimeout,
    } = this.props;

    const tooltip = (
      <Tooltip
        key="tooltip"
        style={tooltipStyle}
        className={tooltipClassName}
        position={position}
        enterTimeout={enterTimeout}
        leaveTimeout={leaveTimeout}
      >
        {label}
      </Tooltip>
    );

    return (
      <TransitionGroup
        style={style}
        className={cn('md-tooltip-container', className)}
        component="div"
      >
        <span ref={this._setContainers} aria-hidden />
        {visible ? tooltip : null}
      </TransitionGroup>
    );
  }
}
