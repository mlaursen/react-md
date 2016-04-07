import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';

import TableCheckbox from './TableCheckbox';

export default class TableRow extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      selected: props.defaultSelected,
    };
  }

  static propTypes = {
    defaultSelected: PropTypes.bool,
    selected: PropTypes.bool,
    className: PropTypes.string,
    children: PropTypes.arrayOf(PropTypes.node).isRequired,
    onClick: PropTypes.func,
    onCheckboxClick: PropTypes.func,

    childrenValidation: (props) => {
      if(props.children.length < 3) {
        return new Error(`There must be at least 3 columns for a data table row. Only '${props.children.length}' were given.`);
      }
    },
  };

  static defaultProps = {
    defaultSelected: false,
  };

  isSelected = () => {
    return typeof this.props.selected === 'undefined' ? this.state.selected : this.props.selected;
  };

  handleCheckboxClick = (e) => {
    e.stopPropagation();
    const { onCheckboxClick, selected } = this.props;
    onCheckboxClick && onCheckboxClick(e);

    if(typeof selected === 'undefined') {
      this.setState({ selected: !this.state.selected });
    }
  };

  render() {
    const { className, children, onCheckboxClick, ...props } = this.props;
    const selected = this.isSelected();
    return (
      <tr {...props} className={classnames('md-table-row', className, { 'active': selected })}>
        <TableCheckbox key="checkbox" checked={selected} onClick={this.handleCheckboxClick} />
        {children}
      </tr>
    );
  }
}
