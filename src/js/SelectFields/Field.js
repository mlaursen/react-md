import React, { PureComponent, PropTypes } from 'react';
import cn from 'classnames';

import FontIcon from '../FontIcons/FontIcon';
import AccessibleFakeInkedButton from '../Helpers/AccessibleFakeInkedButton';
import IconSeparator from '../Helpers/IconSeparator';
import Paper from '../Papers/Paper';
import TextFieldDivider from '../TextFields/TextFieldDivider';

export default class Field extends PureComponent {
  static propTypes = {
    style: PropTypes.object,
    className: PropTypes.string,
    active: PropTypes.bool,
    below: PropTypes.bool,
    label: PropTypes.node,
    placeholder: PropTypes.string,
    iconChildren: PropTypes.node,
    iconClassName: PropTypes.string,
    activeLabel: PropTypes.node,
    id: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    name: PropTypes.string,
    value: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    lineDirection: TextFieldDivider.propTypes.lineDirection,
    disabled: PropTypes.bool,
  };

  render() {
    const {
      id,
      name,
      value,
      active,
      below,
      style,
      className,
      label,
      disabled,
      placeholder,
      activeLabel,
      iconChildren,
      iconClassName,
      lineDirection,
      ...props
    } = this.props;

    let divider;
    if (!below) {
      divider = (
        <TextFieldDivider
          key="text-divider"
          active={active}
          error={false}
          lineDirection={lineDirection}
          className="md-divider--select-field"
        />
      );
    }

    return (
      <AccessibleFakeInkedButton
        {...props}
        disabled={disabled}
        component={Paper}
        zDepth={below && active ? 1 : 0}
        inkDisabled={!below}
        style={style}
        className={cn('md-select-field', {
          'md-text': activeLabel,
          'md-text--secondary': !activeLabel && placeholder,
          'md-text--disabled': disabled,
        }, className)}
      >
        <IconSeparator
          label={activeLabel || placeholder || ''}
          className={cn('md-text-field', {
            'md-select-field--text-field': !below,
            'md-select-field--btn': below,
            'md-text-field--margin': !below && !label,
            'md-text-field--floating-margin': label,
          })}
        >
          <FontIcon iconClassName={iconClassName}>{iconChildren}</FontIcon>
        </IconSeparator>
        {divider}
        <input key="value" type="hidden" id={id} name={name} value={value} />
      </AccessibleFakeInkedButton>
    );
  }
}
