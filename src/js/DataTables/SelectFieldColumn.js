import React, { PureComponent, PropTypes } from 'react';

import TableColumn from './TableColumn';
import SelectField from '../SelectFields';

// This is really half the time of the default menu transition. It seemed to be reasonable
// enough
const ABSOLUTE_DELAY = 100;

const styles = {
  absolute: { position: 'absolute' },
};

/**
 * The `SelectFieldColumns` is a simple wrapper for the `SelectField` and `TableColumn`
 * components. The only purpose of this Component is to allow the select field's menu
 * to extend past the data table's bounds.
 *
 * All props are just passed to the `SelectField` inside. To view all other undocumented
 * props here, view [Select Field Documentation](/components/select-fields#prop-types-select-field)
 */
export default class SelectFieldColumn extends PureComponent {
  static propTypes = {
    /**
     * Boolean if the select field is open by default.
     */
    defaultOpen: PropTypes.bool.isRequired,

    /**
     * An optional function to call when the select field's menu open state
     * is toggled.
     */
    onMenuToggle: PropTypes.func,

    /**
     * An optional style to apply to the column.
     */
    style: PropTypes.object,

    /**
     * An optional className to apply to the column.
     */
    className: PropTypes.string,

    /**
     * An optional style to apply to the select field's menu in the table column.
     */
    menuStyle: PropTypes.object,

    /**
     * An optional class name to apply to the select field's menu in the table column.
     */
    menuClassName: PropTypes.string,
  };

  static defaultProps = {
    defaultOpen: false,
  };

  constructor(props) {
    super(props);

    this.state = { absolute: props.defaultOpen };
    this._handleMenuToggle = this._handleMenuToggle.bind(this);
  }

  componentWillUnmount() {
    if (this._timeout) {
      clearTimeout(this._timeout);
    }
  }

  _handleMenuToggle(open, event) {
    if (this.props.onMenuToggle) {
      this.props.onMenuToggle(open, event);
    }

    this._timeout = setTimeout(() => {
      this._timeout = null;
      this.setState({ absolute: open });
    }, ABSOLUTE_DELAY);
  }

  render() {
    const { absolute } = this.state;
    const { style, className, menuStyle, menuClassName, ...props } = this.props;
    delete props.header;

    return (
      <TableColumn
        style={{ ...style, ...styles[`${absolute ? 'absolute' : 'noop'}`] }}
        className={className}
      >
        <SelectField
          {...props}
          style={menuStyle}
          className={menuClassName}
          onMenuToggle={this._handleMenuToggle}
          position={SelectField.Positions.BELOW}
        />
      </TableColumn>
    );
  }
}
