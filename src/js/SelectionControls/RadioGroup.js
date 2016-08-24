import React, { PureComponent, PropTypes } from 'react';
import cn from 'classnames';

/**
 * The `RadioGroup` component is a state manager for the `Radio` component.
 * It will automatically inject the name, an onChange function, and
 * determine whether a radio is checked.
 *
 * This is just a simple wrapper to reduce some prop redundancy.
 */
export default class RadioGroup extends PureComponent {
  static propTypes = {
    /**
     * The default value for the radio group. This will check the radio that
     * has the same value first by default.
     *
     * If this is omitted, the first radio will be selected.
     */
    defaultValue: PropTypes.string,

    /**
     * Boolean if the entire radio group is disabled.
     */
    disabled: PropTypes.bool,

    /**
     * An optional className to apply to the radio group.
     */
    className: PropTypes.string,

    /**
     * The radio buttons to manage.
     */
    children: PropTypes.arrayOf(PropTypes.node).isRequired,

    /**
     * The component to render the radio group as.
     */
    component: PropTypes.string.isRequired,

    /**
     * Boolean if the radio buttons should be force to be inline.
     */
    inline: PropTypes.bool,

    /**
     * An optional onChange function to call when any of the radio buttons are clicked.
     * This will return the clicked radio's value and the change event.
     *
     * `onChange(value, event)`.
     */
    onChange: PropTypes.func,

    /**
     * The name to give to all the radio buttons.
     */
    name: PropTypes.string,

    /**
     * The current value for the radio group. This will convert the radio group
     * into a controlled component which will require the onChange prop
     * to be given.
     */
    value: PropTypes.string,
  };

  static defaultProps = {
    component: 'div',
    inline: false,
  };

  constructor(props) {
    super(props);

    this.state = {
      value: props.defaultValue || React.Children.toArray(props.children)[0].props.value,
    };

    this._handleChange = this._handleChange.bind(this);
  }

  _getValue(props, state) {
    return typeof props.value === 'undefined' ? state.value : props.value;
  }

  _handleChange(value, e) {
    if (this.props.onChange) {
      this.props.onChange(value, e);
    }
    // prevents 2 change events triggering
    e.stopPropagation();

    if (typeof this.props.value === 'undefined') {
      this.setState({ value });
    }
  }

  render() {
    const { component, className, children, name, inline, disabled, ...props } = this.props;
    const fullProps = {
      ...props,
      className: cn('md-radio-group', className),
    };
    const value = this._getValue(this.props, this.state);

    return React.createElement(component, fullProps, React.Children.map(children, (child, i) =>
        React.cloneElement(child, {
          key: i,
          checked: value === child.props.value,
          onChange: this._handleChange,
          name: name || child.props.name,
          className: cn({ inline }),
          disabled: child.props.disabled || disabled,
        })
    ));
  }
}
