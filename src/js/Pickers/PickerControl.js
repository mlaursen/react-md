import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';

/**
 * The `PickerControl` component is the button that goes in the header
 * of a `Picker` component. It is used to switch the view of the `Picker`
 * from state to state.
 *
 * For example, this is the year and date views for the `DatePicker`.
 */
export default class PickerControl extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  static propTypes = {
    className: PropTypes.string,
    active: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
  };

  render() {
    const { className, onClick, active, children, ...props } = this.props;
    return (
      <button
        type="button"
        className={classnames('md-picker-control', className, { active })}
        onClick={onClick}
        {...props}
      >
        {children}
      </button>
    );
  }
}
