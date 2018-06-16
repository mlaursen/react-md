import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import TICK from '../constants/CSSTransitionGroupTick';
import themeColors from '../utils/themeColors';
import FontIcon from '../FontIcons/FontIcon';
import AccessibleFakeInkedButton from '../Helpers/AccessibleFakeInkedButton';
import IconSeparator from '../Helpers/IconSeparator';
import Paper from '../Papers/Paper';
import TextFieldDivider from '../TextFields/TextFieldDivider';

export default class SelectFieldInput extends PureComponent {
  static propTypes = {
    id: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    style: PropTypes.object,
    className: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]).isRequired,
    disabled: PropTypes.bool,
    required: PropTypes.bool,
    label: PropTypes.node,
    placeholder: PropTypes.string,
    active: PropTypes.bool,
    activeLabel: PropTypes.node,
    below: PropTypes.bool,
    error: PropTypes.bool,
    toolbar: PropTypes.bool,
    dropdownIcon: PropTypes.element,
    iconClassName: PropTypes.string,
    iconChildren: PropTypes.node,
    transitionName: PropTypes.string.isRequired,
    transitionTime: PropTypes.number.isRequired,
    lineDirection: TextFieldDivider.propTypes.lineDirection,
  };

  static defaultProps = {
    transitionName: 'md-drop',
    transitionTime: 300,
  };

  state = { transition: null };

  componentWillReceiveProps(nextProps) {
    if (this.props.value !== nextProps.value) {
      this._transitionNewValue();
    }
  }

  componentWillUnmount() {
    if (this._timeout) {
      clearTimeout(this._timeout);
    }
  }

  _timeout = null;
  _transitionNewValue = () => {
    const { transitionTime, transitionName } = this.props;
    if (this._timeout) {
      clearTimeout(this._timeout);
    }

    this._timeout = setTimeout(() => {
      this._timeout = setTimeout(() => {
        this._timeout = null;
        this.setState({ transition: null });
      }, transitionTime);

      this.setState({ transition: `${this.state.transition} ${transitionName}-enter-active` });
    }, TICK);

    this.setState({ transition: `${transitionName}-enter` });
  };

  render() {
    const {
      id,
      className,
      name,
      value,
      label,
      placeholder,
      active,
      activeLabel,
      error,
      disabled,
      required,
      toolbar,
      below,
      lineDirection,
      dropdownIcon,

      // deprecated
      iconChildren,
      iconClassName,
      /* eslint-disable no-unused-vars */
      transitionName,
      transitionTime,
      /* eslint-enable no-unused-vars */
      ...props
    } = this.props;

    const { transition } = this.state;

    let divider;
    if (!below && !toolbar) {
      divider = (
        <TextFieldDivider
          key="text-divider"
          active={active}
          error={error}
          lineDirection={lineDirection}
          className="md-divider--select-field"
        />
      );
    }

    let visibleLabel = activeLabel;
    if (!activeLabel && activeLabel !== 0) {
      visibleLabel = ((!label || active) && placeholder) || '';
    }

    const labelActive = !!activeLabel || activeLabel === 0;

    let icon = dropdownIcon;
    if (iconClassName || iconChildren) {
      icon = <FontIcon iconClassName={iconClassName}>{iconChildren}</FontIcon>;
    }
    icon = React.cloneElement(icon, { disabled });

    return (
      <AccessibleFakeInkedButton
        {...props}
        id={`${id}-toggle`}
        role="listbox"
        disabled={disabled}
        component={Paper}
        zDepth={below && active ? 1 : 0}
        inkDisabled={!below}
        className={cn('md-select-field', themeColors({
          disabled,
          hint: !labelActive && placeholder,
          text: labelActive,
        }), className)}
      >
        <IconSeparator
          label={visibleLabel}
          labelClassName={transition}
          className={cn('md-text-field', {
            'md-text-field--margin': !below && !label,
            'md-text-field--floating-margin': label,
            'md-text-field--toolbar': toolbar && !below,
            'md-select-field--text-field': !below,
            'md-select-field--btn': below,
          })}
        >
          {icon}
        </IconSeparator>
        {divider}
        <input
          key="value"
          type="hidden"
          id={id}
          name={name}
          value={value}
          required={required}
          disabled={disabled}
        />
      </AccessibleFakeInkedButton>
    );
  }
}
