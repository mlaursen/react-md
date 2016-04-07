import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Checkbox from '../SelectionControls/Checkbox';

export default class TableCheckbox extends Component {
  constructor(props, context) {
    super(props, context);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  static propTypes = {
    checked: PropTypes.bool.isRequired,
  };

  static contextTypes = {
    uncheckedIconClassName: PropTypes.string.isRequired,
    uncheckedIconChildren: PropTypes.node,
    checkedIconClassName: PropTypes.string.isRequired,
    checkedIconChildren: PropTypes.node,
  };

  render() {
    const { checked, ...props } = this.props;

    return (
      <td className="md-table-checkbox">
        <Checkbox {...this.context} checked={checked} {...props} />
      </td>
    );
  }
}
