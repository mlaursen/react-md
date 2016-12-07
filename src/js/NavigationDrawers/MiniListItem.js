import React, { PureComponent, PropTypes } from 'react';
import cn from 'classnames';

import AccessibleFakeInkedButton from '../Helpers/AccessibleFakeInkedButton';
import TileAddon from '../Lists/TileAddon';

export default class MiniListItem extends PureComponent {
  static propTypes = {
    style: PropTypes.object,
    className: PropTypes.string,
    tileStyle: PropTypes.object,
    tileClassName: PropTypes.string,
    component: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.string,
    ]),
    active: PropTypes.bool,
    activeClassName: PropTypes.string,
    leftIcon: PropTypes.node,
    leftAvatar: PropTypes.node,
    disabled: PropTypes.bool,
    onTouchStart: PropTypes.func,
    onTouchEnd: PropTypes.func,
    onMouseOver: PropTypes.func,
    onMouseLeave: PropTypes.func,
  };

  static defaultProps = {
    activeClassName: 'md-text--theme-primary',
    component: 'div',
  };

  constructor(props) {
    super(props);

    this.state = { active: false };
    this._handleTouchStart = this._handleTouchStart.bind(this);
    this._handleTouchEnd = this._handleTouchEnd.bind(this);
    this._handleMouseOver = this._handleMouseOver.bind(this);
    this._handleMouseLeave = this._handleMouseLeave.bind(this);
  }

  componentWillUnmount() {
    if (this._touchTimeout) {
      clearTimeout(this._touchTimeout);
    }
  }

  _handleMouseOver(e) {
    if (this.props.onMouseOver) {
      this.props.onMouseOver(e);
    }

    if (!this.props.disabled) {
      this.setState({ active: true });
    }
  }

  _handleMouseLeave(e) {
    if (this.props.onMouseLeave) {
      this.props.onMouseLeave(e);
    }

    if (!this.props.disabled) {
      this.setState({ active: false });
    }
  }

  _handleTouchStart(e) {
    if (this.props.onTouchStart) {
      this.props.onTouchStart(e);
    }

    this._touched = true;

    this.setState({ active: true, touchedAt: Date.now() });
  }

  _handleTouchEnd(e) {
    if (this.props.onTouchEnd) {
      this.props.onTouchEnd(e);
    }

    const time = Date.now() - this.state.touchedAt;
    this._touchTimeout = setTimeout(() => {
      this._touchTimeout = null;

      this.setState({ active: false });
    }, time > 450 ? 0 : 450 - time);
  }

  render() {
    const {
      style,
      className,
      tileStyle,
      tileClassName,
      leftIcon,
      leftAvatar,
      active,
      activeClassName,
      ...props
    } = this.props;
    delete props.defaultOpen;
    return (
      <li style={style} className={className}>
        <AccessibleFakeInkedButton
          {...props}
          style={tileStyle}
          className={cn('md-list-tile md-list-tile--icon md-list-tile--mini', {
            'md-list-tile--active': this.state.active && !this._touched,
          }, tileClassName)}
          onMouseOver={this._handleMouseOver}
          onMouseLeave={this._handleMouseLeave}
          onTouchStart={this._handleTouchStart}
          onTouchEnd={this._handleTouchEnd}
        >
          <TileAddon
            active={active}
            activeClassName={activeClassName}
            icon={leftIcon}
            avatar={leftAvatar}
          />
        </AccessibleFakeInkedButton>
      </li>
    );
  }
}
