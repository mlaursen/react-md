import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';
import TableCheckbox from './TableCheckbox';

export default class TableHeaderRow extends Component {
  constructor(props, context) {
    super(props, context);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
    onCheckboxClick: PropTypes.func.isRequired,
    allChecked: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    allChecked: false,
  };

  render() {
    const { className, children, allChecked, onCheckboxClick, ...props } = this.props;
    return (
      <thead>
        <tr className={classnames('md-table-header-row', className)} {...props}>
          <TableCheckbox checked={allChecked} onClick={onCheckboxClick} />
          {children}
        </tr>
      </thead>
    );
  }
}
