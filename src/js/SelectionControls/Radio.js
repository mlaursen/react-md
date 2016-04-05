import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import FontIcon from '../FontIcons';
import ControlContainer from './ControlContainer';


export default class Radio extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  static propTypes = {
    className: PropTypes.string,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]).isRequired,
    defaultChecked: PropTypes.bool.isRequired,
    checked: PropTypes.bool,
    checkedIcon: PropTypes.node.isRequired,
    uncheckedIcon: PropTypes.node.isRequired,
    label: PropTypes.node,
    labelBefore: PropTypes.bool.isRequired,
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
