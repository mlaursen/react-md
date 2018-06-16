import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
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
    defaultOpen: PropTypes.bool,
    itemComponent: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
    ]).isRequired,
  };

  static defaultProps = {
    activeClassName: 'md-text--theme-primary',
    component: 'div',
    itemComponent: 'li',
  };

  state = { active: false };

  componentWillUnmount() {
    if (this._touchTimeout) {
      clearTimeout(this._touchTimeout);
    }
  }

  _handleMouseOver = (e) => {
    if (this.props.onMouseOver) {
      this.props.onMouseOver(e);
    }

    if (!this.props.disabled) {
      this.setState({ active: true });
    }
  };

  _handleMouseLeave = (e) => {
    if (this.props.onMouseLeave) {
      this.props.onMouseLeave(e);
    }

    if (!this.props.disabled) {
      this.setState({ active: false });
    }
  };

  _handleTouchStart = (e) => {
    if (this.props.onTouchStart) {
      this.props.onTouchStart(e);
    }

    this._touched = true;

    this.setState({ active: true, touchedAt: Date.now() });
  };

  _handleTouchEnd = (e) => {
    if (this.props.onTouchEnd) {
      this.props.onTouchEnd(e);
    }

    const time = Date.now() - this.state.touchedAt;
    this._touchTimeout = setTimeout(() => {
      this._touchTimeout = null;

      this.setState({ active: false });
    }, time > 450 ? 0 : 450 - time);
  };

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
      itemComponent: ItemComponent,
      /* eslint-disable no-unused-vars,react/prop-types */
      primaryText,
      secondaryText,
      rightIcon,
      rightAvatar,
      threeLines,
      children,
      defaultOpen,
      isOpen,
      inset,
      nestedItems,
      animateNestedItems,
      expanderIcon,

      // deprecated
      expanderIconChildren,
      expanderIconClassName,
      /* eslint-enable no-unused-vars,react/prop-types */
      ...props
    } = this.props;

    return (
      <ItemComponent style={style} className={className}>
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
      </ItemComponent>
    );
  }
}
