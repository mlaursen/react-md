import React, { PureComponent, PropTypes } from 'react';
import ListItemControl from 'react-md/lib/Lists/ListItemControl';
import Checkbox from 'react-md/lib/SelectionControls/Checkbox';

export default class ToDo extends PureComponent {
  static propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    todo: PropTypes.shape({
      todo: PropTypes.string.isRequired,
      key: PropTypes.number.isRequired,
    }).isRequired,
    checked: PropTypes.bool.isRequired,
  };

  _handleChange = (checked) => {
    this.props.onClick(checked, this.props.todo);
  };

  render() {
    const { todo: { todo }, checked, id, name } = this.props;

    return (
      <ListItemControl
        primaryAction={
          <Checkbox
            id={id}
            name={name}
            onChange={this._handleChange}
            checked={checked}
            className={checked ? 'strikethrough' : ''}
          />
        }
        primaryText={todo}
      />
    );
  }
}
