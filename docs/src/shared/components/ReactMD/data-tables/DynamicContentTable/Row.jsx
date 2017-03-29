import React, { PureComponent, PropTypes } from 'react';
import cn from 'classnames';
import TableRow from 'react-md/lib/DataTables/TableRow';
import EditDialogColumn from 'react-md/lib/DataTables/EditDialogColumn';
import SelectFieldColumn from 'react-md/lib/DataTables/SelectFieldColumn';
import toClassName from 'utils/StringUtils/toClassName';

const TYPES = ['Ice cream', 'Pastry', 'Other'];

export default class Row extends PureComponent {
  static propTypes = {
    id: PropTypes.string,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    calories: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
    sodium: PropTypes.number.isRequired,
    calcium: PropTypes.number.isRequired,
    iron: PropTypes.number.isRequired,
    className: PropTypes.string,
    isNew: PropTypes.bool,
    mobile: PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = { highlight: props.isNew ? true : null };
  }

  componentDidMount() {
    if (this.props.isNew) {
      this._timeout = setTimeout(() => {
        this._timeout = setTimeout(() => {
          this._timeout = null;
          this.setState({ highlight: null });
        }, 2000);

        this.setState({ highlight: false });
      }, 4000);
    }
  }

  componentWillUnmount() {
    if (this._timeout) {
      clearTimeout(this._timeout);
    }
  }

  createColumn = (name) => (
    <EditDialogColumn
      id={`${this.props.id || toClassName(this.props.name)}-${name}`}
      defaultValue={this.props[name]}
      type={name === 'name' ? 'text' : 'number'}
      inline
      noIcon
      enforceMinWidth={name === 'name' ? this.props.mobile : false}
      className={cn({
        'nutrition-table__number-column': name !== 'name',
      })}
      textFieldClassName={cn({
        'nutrition-table__percentage-field': name === 'calcium' || name === 'iron',
      })}
    />
  );

  render() {
    const {
      className,
      /* eslint-disable no-unused-vars */
      name,
      type,
      calories,
      fat,
      carbs,
      protein,
      sodium,
      calcium,
      iron,
      mobile,
      isNew,
      /* eslint-enable no-unused-vars */
      ...props
    } = this.props;

    const { highlight } = this.state;

    return (
      <TableRow
        {...props}
        className={cn(className, {
          'table-row': highlight !== null,
          'table-row--highlight': highlight,
        })}
      >
        {this.createColumn('name')}
        <SelectFieldColumn id={`${this.props.id || name}-type`} menuItems={TYPES} defaultValue={type} />
        {this.createColumn('calories')}
        {this.createColumn('fat')}
        {this.createColumn('carbs')}
        {this.createColumn('protein')}
        {this.createColumn('sodium')}
        {this.createColumn('calcium')}
        {this.createColumn('iron')}
      </TableRow>
    );
  }
}
