import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { TableRow, TableColumn } from 'react-md';

export default class DessertRow extends PureComponent {
  static propTypes = {
    isNew: PropTypes.bool,
    dessert: PropTypes.shape({
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      calories: PropTypes.number.isRequired,
      fat: PropTypes.number.isRequired,
      carbs: PropTypes.number.isRequired,
      protein: PropTypes.number,
      sodium: PropTypes.number.isRequired,
      calcium: PropTypes.number.isRequired,
      iron: PropTypes.number.isRequired,
    }).isRequired,
    className: PropTypes.string,
  };

  constructor(props) {
    super();
    this.state = { highlight: props.isNew ? true : null };
  }

  componentDidMount() {
    if (!this.state.highlight) {
      return;
    }

    // Keep highlight color for 4 seconds then fade out for 2 seconds.
    this.timeout = setTimeout(() => {
      this.timeout = setTimeout(() => {
        this.timeout = null;
        this.setState({ highlight: null });
      }, 2000);

      this.setState({ highlight: false });
    }, 4000);
  }

  componentWillUnmount() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }

  render() {
    const { highlight } = this.state;
    const {
      dessert,
      className,
      isNew, // eslint-disable-line no-unused-vars
      ...props
    } = this.props;

    const cells = Object.keys(dessert).map((key, i) => (
      <TableColumn key={key} numeric={i > 1}>{dessert[key]}</TableColumn>
    ));
    return (
      <TableRow
        {...props}
        className={cn(className, {
          'md-background--card': highlight !== null,
          'data-tables__desserts__row': highlight !== null,
          'data-tables__desserts__row--highlight': highlight,
        })}
      >
        {cells}
      </TableRow>
    );
  }
}
