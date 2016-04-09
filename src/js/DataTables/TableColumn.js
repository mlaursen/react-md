import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';
import injectTooltip from '../Tooltips';

/**
 * A column in a table. This is either the `th` or `td` component.
 */
class TableColumn extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  static propTypes = {
    /**
     * The optional className for the table column
     */
    className: PropTypes.string,

    /**
     * The children to display in the column.
     */
    children: PropTypes.node,

    /**
     * A boolean if the column has numeric data. It will right-align the data.
     */
    numeric: PropTypes.bool,

    /**
     * Boolean if this column should be adjusted with additional padding. This *should*
     * be handled automatically by the `TableRow` component.
     */
    adjusted: PropTypes.bool,

    /**
     * Boolean if this is a `th` component.
     */
    header: PropTypes.bool.isRequired,

    /**
     * The optional tooltip to render on hover.
     */
    tooltipLabel: PropTypes.string,

    /**
     * The position of the tooltip.
     */
    tooltipPosition: PropTypes.bool,

    /**
     * The optionally injected tooltip from the `injectTooltip` higher order component.
     */
    tooltip: PropTypes.node,
  };

  static defaultProps = {
    header: false,
  };

  render() {
    const { className, numeric, adjusted, header, children, tooltip, ...props } = this.props;

    return React.createElement(header ? 'th' : 'td', {
      className: classnames(`md-table-${header ? 'header' : 'data'}`, className, { numeric, adjusted }),
      ...props,
      children: [children, tooltip],
    });
  }
}

export default injectTooltip(TableColumn);
