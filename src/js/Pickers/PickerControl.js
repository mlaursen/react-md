import React, { PureComponent, PropTypes } from 'react';
import cn from 'classnames';

/**
 * The `PickerControl` component is the button that goes in the header
 * of a `Picker` component. It is used to switch the view of the `Picker`
 * from state to state.
 *
 * For example, this is the year and date views for the `DatePicker`.
 */
export default class PickerControl extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    active: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
  };

  render() {
    const { className, active, ...props } = this.props;
    return (
      <button
        {...props}
        type="button"
        className={cn('md-btn md-pointer--hover md-picker-control md-picker-text', {
          'md-picker-text--active': active,
        }, className)}
      />
    );
  }
}
