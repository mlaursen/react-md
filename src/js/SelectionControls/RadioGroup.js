import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';

/**
 * The `RadioGroup` component is a state manager for the `Radio` component.
 * It will automatically inject the name, an onChange function, and
 * determine whether a radio is checked.
 *
 * This is just a simple wrapper to reduce some prop redundancy.
 */
export default class RadioGroup extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      value: props.defaultValue || React.Children.toArray(props.children)[0].props.value,
    };
  }

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

  handleChange = (value, e) => {
    this.props.onChange && this.props.onChange(value, e);
    // prevents 2 change events triggering
    e.stopPropagation();

    if(typeof this.props.value === 'undefined') {
      this.setState({ value });
    }
  };

  getValue = () => {
    return typeof this.props.value === 'undefined' ? this.state.value : this.props.value;
  };

  render() {
    const { component, className, children, name, inline, disabled, ...props } = this.props;
    const fullProps = {
      ...props,
      className: classnames('md-radio-group', className),
    };
    const value = this.getValue();

    return React.createElement(component, fullProps, React.Children.map(children, (child, i) => {
      return React.cloneElement(child, {
        key: i,
        checked: value === child.props.value,
        onChange: this.handleChange,
        name: name || child.props.name,
        className: classnames({ inline }),
        disabled: child.props.disabled || disabled,
      });
    }));
  }
}
