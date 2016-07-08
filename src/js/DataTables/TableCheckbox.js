import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import FontIcon from '../FontIcons';
import Checkbox from '../SelectionControls/Checkbox';

export default class TableCheckbox extends Component {
  constructor(props, context) {
    super(props, context);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  static propTypes = {
    checked: PropTypes.bool,
  };

  static contextTypes = {
    uncheckedIconClassName: PropTypes.string.isRequired,
    uncheckedIconChildren: PropTypes.node,
    checkedIconClassName: PropTypes.string.isRequired,
    checkedIconChildren: PropTypes.node,
  };

  render() {
    const { checked, ...props } = this.props;

    const { uncheckedIconChildren, uncheckedIconClassName, checkedIconChildren, checkedIconClassName } = this.context;
    const checkedIcon = <FontIcon iconClassName={checkedIconClassName} children={checkedIconChildren} />;
    const uncheckedIcon = <FontIcon iconClassName={uncheckedIconClassName} children={uncheckedIconChildren} />;

    return (
      <td className="md-table-checkbox">
        <Checkbox checked={checked} {...props} checkedIcon={checkedIcon} uncheckedIcon={uncheckedIcon} />
      </td>
    );
  }
}
