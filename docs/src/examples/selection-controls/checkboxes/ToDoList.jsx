import React, { PureComponent, PropTypes } from 'react';
import TextField from 'react-md/lib/TextFields';
import List from 'react-md/lib/Lists/List';
import Paper from 'react-md/lib/Papers';
import Divider from 'react-md/lib/Dividers';
import { ENTER } from 'react-md/lib/constants/keyCodes';
import { findIndex } from 'lodash/array';

import './_todo-list.scss';
import ToDo from './ToDo';

export default class ToDoList extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
  };

  constructor(props) {
    super(props);

    this.state = {
      value: '',
      todos: [],
      remaining: 0,
    };

    this._handleChange = this._handleChange.bind(this);
    this._handleKeyDown = this._handleKeyDown.bind(this);
    this._handleClick = this._handleClick.bind(this);
  }

  _handleChange(value) {
    this.setState({ value });
  }

  _handleKeyDown(e) {
    if ((e.which || e.keyCode) === ENTER) {
      const key = Date.now();
      const todo = {
        key,
        id: `todo-${key}`,
        name: 'todos[]',
        todo: { todo: this.state.value, key },
        checked: false,
      };

      this.setState({
        value: '',
        todos: [...this.state.todos, todo],
        remaining: this.state.remaining + 1,
      });
    }
  }

  _handleClick(checked, todo) {
    const todos = this.state.todos.slice();
    const i = findIndex(todos, t => t.key === todo.key);
    todos[i] = Object.assign({}, todos[i], { checked });

    this.setState({ remaining: this.state.remaining + (checked ? -1 : 1), todos });
  }

  render() {
    const { todos, value, remaining } = this.state;

    let todoItems;
    let controls;
    if (todos.length) {
      todoItems = todos.map(todo => <ToDo {...todo} onClick={this._handleClick} />);
      todoItems = [<Divider key="divider-1" />, <List key="todos">{todoItems}</List>];

      controls = [
        <Divider key="divider-2" />,
        <div key="controls" className="todo-controls">
          {`${remaining} item${remaining !== 1 ? 's' : ''} left`}
        </div>,
      ];
    }

    return (
      <section className="todo-list-example">
        <h3 className="md-headline todo-headline">todos</h3>
        <Paper zDepth={1} className="todo-list-container">
          <TextField
            id="createTodo"
            block
            fullWidth
            placeholder="What needs to be done?"
            value={value}
            onKeyDown={this._handleKeyDown}
            onChange={this._handleChange}
          />
          {todoItems}
          {controls}
        </Paper>
      </section>
    );
  }
}
