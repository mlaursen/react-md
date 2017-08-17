import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import cn from 'classnames';

import { TAB } from '../constants/keyCodes';
import captureNextEvent from '../utils/EventUtils/captureNextEvent';
import { addTouchEvent, removeTouchEvent } from '../utils/EventUtils/touches';
import Tooltip from './Tooltip';

export default class TooltipContainer extends PureComponent {
  static propTypes = {
    style: PropTypes.object,
    className: PropTypes.string,
    tooltipStyle: PropTypes.object,
    tooltipClassName: PropTypes.string,
    label: PropTypes.node.isRequired,
    position: Tooltip.propTypes.position,
    delay: PropTypes.number.isRequired,
    enterTimeout: PropTypes.number.isRequired,
    leaveTimeout: PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = { visible: false };
    this._delayedTimeout = null;

    this._setContainers = this._setContainers.bind(this);
    this._showTooltip = this._showTooltip.bind(this);
    this._hideTooltip = this._hideTooltip.bind(this);
    this._stopContextMenu = this._stopContextMenu.bind(this);
    this._handleKeyUp = this._handleKeyUp.bind(this);
  }

  componentWillUnmount() {
    if (this._container) {
      removeTouchEvent(this._container, 'start', this._showTooltip);
      removeTouchEvent(this._container, 'end', this._hideTooltip);
      this._container.removeEventListener('mouseover', this._showTooltip);
      this._container.removeEventListener('mouseleave', this._hideTooltip);
      this._container.removeEventListener('keyup', this._handleKeyUp);
      this._container.removeEventListener('blur', this._hideTooltip);
    }

    if (this._delayedTimeout) {
      clearTimeout(this._delayedTimeout);
    }
  }

  _setContainers(span) {
    if (span) {
      this._container = span.parentNode.parentNode;

      addTouchEvent(this._container, 'start', this._showTooltip);
      addTouchEvent(this._container, 'end', this._hideTooltip);
      this._container.addEventListener('mouseover', this._showTooltip);
      this._container.addEventListener('mouseleave', this._hideTooltip);
      this._container.addEventListener('keyup', this._handleKeyUp);
      this._container.addEventListener('blur', this._hideTooltip);
    }
  }

  _stopContextMenu(e) {
    e.preventDefault();
    window.removeEventListener('contextmenu', this._stopContextMenu, true);
    captureNextEvent('click');
    this.setState({ visible: true });
  }

  _showTooltip(e) {
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
  }

  _hideTooltip(e) {
    if (this._delayedTimeout) {
      clearTimeout(this._delayedTimeout);
    }

    if (e.type === 'mouseover' && this._touched) {
      return;
    }

    this.setState({ visible: false });
  }

  _handleKeyUp(e) {
    if ((e.which || e.keyCode) === TAB) {
      this._showTooltip(e);
    }
  }

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
