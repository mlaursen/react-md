import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import FontIcon from '../FontIcons';
import ControlContainer from './ControlContainer';


export default class Checkbox extends Component {
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
    ]),
    checked: PropTypes.bool,
    defaultChecked: PropTypes.bool.isRequired,
    label: PropTypes.node,
    labelBefore: PropTypes.bool.isRequired,
    checkedIcon: PropTypes.node.isRequired,
    uncheckedIcon: PropTypes.node.isRequired,
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
