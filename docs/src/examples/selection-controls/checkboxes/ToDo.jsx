import React, { PureComponent, PropTypes } from 'react';
import ListItemControl from 'react-md/lib/Lists/ListItemControl';
import Checkbox from 'react-md/lib/SelectionControls/Checkbox';

export default class ToDo extends PureComponent {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    todo: PropTypes.shape({
      todo: PropTypes.string.isRequired,
      key: PropTypes.number.isRequired,
    }).isRequired,
    checked: PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);

    this._handleChange = this._handleChange.bind(this);
  }

  _handleChange(checked) {
    this.props.onClick(checked, this.props.todo);
  }

  render() {
    const { todo: { todo }, checked } = this.props;
    return (
      <ListItemControl
        primaryAction={<Checkbox onChange={this._handleChange} checked={checked} className={checked ? 'strikethrough' : ''} />}
        primaryText={todo}
      />
    );
  }
}
