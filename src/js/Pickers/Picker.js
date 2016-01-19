import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';

import TextField from '../TextFields';
import FontIcon from '../FontIcons';
import PickerInline from './PickerInline';
import PickerDialog from './PickerDialog';

export default class Picker extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    const date = props.defaultValue || new Date();
    this.state = {
      isOpen: props.isInitiallyOpen,
      value: props.defaultValue,
      pickerDate: date,
      tempValue: date,
    };
  }

  static propTypes = {
    className: PropTypes.string,
    display: PropTypes.oneOf(['landscape', 'portrait']),
    inline: PropTypes.bool,
    onChange: PropTypes.func,
    floatingLabel: PropTypes.bool,
    value: PropTypes.instanceOf(Date),
    defaultValue: PropTypes.instanceOf(Date),
    label: PropTypes.string,
    icon: PropTypes.node,
    isInitiallyOpen: PropTypes.bool,
    okLabel: PropTypes.string.isRequired,
    cancelLabel: PropTypes.string.isRequired,
    nextIcon: PropTypes.node.isRequired,
    previousIcon: PropTypes.node.isRequired,
    DateTimeFormat: PropTypes.func.isRequired,
    children: PropTypes.node,
  };

  static defaultProps = {
    isInitiallyOpen: false,
    okLabel: 'Ok',
    cancelLabel: 'Cancel',
    nextIcon: <FontIcon>chevron_right</FontIcon>,
    previousIcon: <FontIcon>chevron_left</FontIcon>,
    DateTimeFormat: typeof Intl !== 'undefined' && Intl.DateTimeFormat,
  };

  toggleOpen = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  close = () => {
    this.setState({ isOpen: false });
  };

  render() {
    const {
      className,
      display,
      inline,
      floatingLabel,
      label,
      onChange,
      icon,
      children,
      value,
    } = this.props;

    const fieldValue = typeof value !== 'undefined' ? value : this.state.value;

    return (
      <div className={classnames('md-picker-container', className, { display, inline })}>
        <TextField
          icon={icon}
          onClick={this.toggleOpen}
          label={label}
          floatingLabel={floatingLabel}
          value={fieldValue}
          onChange={onChange}
        />
        {inline ? <PickerInline>{children}</PickerInline> : <PickerDialog isOpen={this.state.isOpen} close={this.close}>{children}</PickerDialog>}
      </div>
    );
  }
}
