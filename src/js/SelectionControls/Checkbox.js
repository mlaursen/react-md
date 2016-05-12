import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import FontIcon from '../FontIcons';
import ControlContainer from './ControlContainer';


/**
 * Checkboxes can be toggle by clicking the label of the checkbox or the checkbox itself. If the icon itself is clicked, ink will appear. There will be no
 * ink when the label is clicked.
 */
export default class Checkbox extends Component {
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
     * Boolean if the checkbox is disabled.
     */
    disabled: PropTypes.bool,

    /**
     * An optional function to call when the checked state is called.
     * The next checked state and change event will be passed.
     *
     * `onChange(!checked, event)`.
     */
    onChange: PropTypes.func,

    /**
     * An optional value for the checkbox.
     */
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),

    /**
     * Boolean if the checkbox is checked by default.
     */
    defaultChecked: PropTypes.bool.isRequired,

    /**
     * Boolean if this checkbox is currently checked. This will
     * require the `onChange` prop to be defined since it will
     * become a controlled component.
     */
    checked: PropTypes.bool,

    /**
     * The icon to use for the checked state.
     */
    checkedIcon: PropTypes.node.isRequired,

    /**
     * The icon to use for the unchecked state.
     */
    uncheckedIcon: PropTypes.node.isRequired,

    /**
     * An optional label to display with the checkbox.
     */
    label: PropTypes.node,

    /**
     * Boolean if the label should be displayed before or after the checkbox.
     */
    labelBefore: PropTypes.bool.isRequired,

    /**
     * An optional form name to give to the checkbox.
     */
    name: PropTypes.string,
  };

  static defaultProps = {
    defaultChecked: false,
    labelBefore: false,
    checkedIcon: <FontIcon>check_box</FontIcon>,
    uncheckedIcon: <FontIcon>check_box_outline_blank</FontIcon>,
  };

  render() {
    return <ControlContainer {...this.props} type="checkbox" />;
  }
}
