import React, { PureComponent, PropTypes } from 'react';
import cn from 'classnames';

import SelectField from '../SelectFields/SelectField';
import TableColumn from './TableColumn';
import findTable from './findTable';

/**
 * The `SelectFieldColumn` component is used to render select fields in `DataTable`s.
 * The only reason this component is required is to that the select field will not
 * take the overflow of the `DataTable` into consideration when rendering itself. Without
 * this component, the menu items would be hidden by the data table's overflow.
 *
 * All props that are on the `SelectField` are also available here (except the naming of style or className).
 * See the [SelectField](/components/select-fields?tab=1#select-field-proptypes) for remaining prop descriptions.
 */
export default class SelectFieldColumn extends PureComponent {
  static propTypes = {
    /**
     * An optional id to use for the select field in the column. If this is omitted,
     * the id will be generated from the `baseId` from the `DataTable`.
     */
    id: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),

    /**
     * An optional style to apply to the `TableColumn`.
     */
    style: PropTypes.object,

    /**
     * An optional className to apply to the `TableColumn`.
     */
    className: PropTypes.string,

    /**
     * An optional style to apply to the select field's wrapper in the column.
     */
    wrapperStyle: PropTypes.object,

    /**
     * An optional className to apply to the select field's wrapper in the column.
     */
    wrapperClassName: PropTypes.string,

    /**
     * An optional style to apply to the select field's menu component.
     */
    menuStyle: PropTypes.object,

    /**
     * An optional className to apply to the select field's menu component.
     */
    menuClassName: PropTypes.string,

    /**
     * An optional style to apply to the select field's input.
     */
    inputStyle: PropTypes.object,

    /**
     * An optional className to apply to the select field's input.
     */
    inputClassName: PropTypes.string,

    /**
     * Boolean if the `SelectFieldColumn` is in the `TableHeader` component. This is
     * injected from the `TableRow` component. Should not be used.
     */
    header: PropTypes.bool,

    /**
     * An optional function to call when the select field's menu is toggled open.
     * See the select field component for the callback information.
     */
    onMenuToggle: PropTypes.func,

    /**
     * The position of the select field. It is ideal to keep this as the default.
     */
    position: SelectField.propTypes.position,

    /**
     * Boolean if the select field is open by default.
     */
    defaultOpen: PropTypes.bool,

    /**
     * When the dialog is open and a user scrolls the dialog offscreen, this is the amount
     * of the dialog that should be offscreen before hiding the dialog (inverse). The default
     * is to have 25% of the dialog offscreen.
     */
    scrollThreshold: PropTypes.number.isRequired,
  };

  static defaultProps = {
    position: SelectField.Positions.BELOW,
    scrollThreshold: 0.75,
  };

  static contextTypes = {
    rowId: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
  }

  constructor(props, context) {
    super(props, context);

    this.state = {
      active: !!props.defaultOpen,
      left: null,
      width: null,
    };

    this._wrapper = null;
    this._table = null;
    this._left = null;
    this._scrollLeft = null;

    this._setWrapper = this._setWrapper.bind(this);
    this._repositionCell = this._repositionCell.bind(this);
    this._handleMenuToggle = this._handleMenuToggle.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    const { active } = this.state;
    if (active === prevState.active) {
      return;
    } else if (this._table) {
      this._table[`${active ? 'add' : 'remove'}EventListener`]('scroll', this._repositionCell);
      this._left = active ? this.state.left : null;
      this._scrollLeft = active ? this._table.scrollLeft : null;
    }
  }

  componentWillUnmount() {
    if (this.table && this.state.active) {
      this._table.removeEventListener('scroll', this._repositionCell);
    }
  }

  _setWrapper(wrapper) {
    this._wrapper = wrapper;
    this._table = findTable(this._wrapper);
  }

  /**
   * When the dialog is open and the user scrolls the data table (for some reason), this will
   * keep the cell positioned correctly.
   */
  _repositionCell() {
    if (!this._ticking) {
      requestAnimationFrame(() => {
        this._ticking = false;

        let left = this._left;
        let scrolledOut = false;
        if (this._table) {
          const { scrollLeft, offsetWidth } = this._table;
          left -= (scrollLeft - this._scrollLeft);
          scrolledOut = left < 16 || offsetWidth - left < this.state.width * this.props.scrollThreshold;
        }

        let { active } = this.state;
        if (!this._timeout && scrolledOut) {
          active = false;
        }

        this.setState({ left, active });
      });
    }

    this._ticking = true;
  }

  _handleMenuToggle(active, e) {
    if (this.props.onMenuToggle) {
      this.props.onMenuToggle(active, e);
    }

    let width = null;
    let left = null;
    if (this._wrapper && active) {
      left = this._wrapper.getBoundingClientRect().left - 1; // 1px for box shadow
      width = this._wrapper.offsetWidth;
    }

    this.setState({ active, width, left });
  }

  render() {
    const { rowId } = this.context;
    const { active, width, left } = this.state;
    const {
      style,
      className,
      menuStyle,
      menuClassName,
      wrapperStyle,
      wrapperClassName,
      header,
      ...props
    } = this.props;
    delete props.id;
    delete props.scrollThreshold;

    let { id } = this.props;
    if (!id) {
      id = `${rowId}-select`;
    }

    return (
      <TableColumn
        style={{ left, ...style }}
        className={cn('md-select-field-column', {
          'md-table-column--fixed md-table-column--fixed-active': active,
        }, className)}
        header={header}
        __fixedColumn
      >
        <div
          ref={this._setWrapper}
          style={{ ...wrapperStyle, width }}
          className={wrapperClassName}
        >
          <SelectField
            id={id}
            {...props}
            style={menuStyle}
            className={menuClassName}
            onMenuToggle={this._handleMenuToggle}
            fullWidth
          />
        </div>
      </TableColumn>
    );
  }
}
