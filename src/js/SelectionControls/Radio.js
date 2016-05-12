import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import FontIcon from '../FontIcons';
import ControlContainer from './ControlContainer';


/**
 * The `Radio` component can be used with the `RadioGroup` component for
 * additional state management. It is completely optional to use these
 * two components together though. It is just to eliminate some redundancies.
 */
export default class Radio extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  static propTypes = {
    /**
     * The optional className to apply to the surrounding label.
     */
    className: PropTypes.string,

    /**
     * Boolean if the radio is disabled.
     */
    disabled: PropTypes.bool,

    /**
     * An optional function to call when the checked state is called.
     * The radio value and change event will be passed.
     *
     * `onChange(value, event)`.
     */
    onChange: PropTypes.func,

    /**
     * The value for the radio
     */
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]).isRequired,

    /**
     * Boolean if the radio should be checked by default. Only use this
     * if you are not using the `RadioGroup` component.
     */
    defaultChecked: PropTypes.bool.isRequired,

    /**
     * Boolean if the radio button is checked. If you are using the
     * `RadioGroup` component, this will be injected automatically
     * for you. If this prop is defined, it has become a controlled component
     * so you will need to use include the `onChange` prop as well.
     */
    checked: PropTypes.bool,

    /**
     * The icon to use for the checked state of the radio.
     */
    checkedIcon: PropTypes.node.isRequired,

    /**
     * The icon to use for the unchecked state of the radio.
     */
    uncheckedIcon: PropTypes.node.isRequired,

      /**
    * The optional label to display with the radio button.
    */
    label: PropTypes.node,

    /**
     * Boolean if the label should appear before the radio button.
     */
    labelBefore: PropTypes.bool.isRequired,

    /**
     * The name to use for the radio. If you are usng the `RadioGroup` component,
     * this will be injected automatically.
     */
    name: PropTypes.string,
  };

  static defaultProps = {
    labelBefore: false,
    defaultChecked: false,
    checkedIcon: <FontIcon>radio_button_checked</FontIcon>,
    uncheckedIcon: <FontIcon>radio_button_unchecked</FontIcon>,
  };

  render() {
    return <ControlContainer {...this.props} type="radio" />;
  }
}
