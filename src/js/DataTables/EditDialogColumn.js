import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';

import TableColumn from './TableColumn';
import TextField from '../TextFields';
import { ENTER, TAB } from '../constants/keyCodes';
import { onOutsideClick } from '../utils';

/**
 * A Text Edit dialog for tables. This can either be a small
 * version which only has the text field or a large version
 * that includes a title with a save and cancel action buttons.
 */
export default class EditDialogColumn extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      active: false,
      animating: false,
    };
  }

  static propTypes = {
    /**
     * The optional className to apply to the edit dialog.
     */
    className: PropTypes.string,

    /**
     * The optional className to apply to the column.
     */
    columnClassName: PropTypes.string,

    /**
     * The transition duration when the dialog is moving from
     * active to inactive.
     */
    transitionDuration: PropTypes.number.isRequired,

    /**
     * Boolean if the edit dialog is disabled.
     */
    disabled: PropTypes.bool,

    /**
     * The optional max length for the edit dialog.
     */
    maxLength: PropTypes.number,

    /**
     * An optional onFocus function to call.
     */
    onFocus: PropTypes.func,

    /**
     * An optional onBlur function to call.
     */
    onBlur: PropTypes.func,

    /**
     * An optional onKeyDown function to call.
     */
    onKeyDown: PropTypes.func,
  };

  static defaultProps = {
    transitionDuration: 150,
  };

  componentWillUpdate(nextProps, nextState) {
    if(this.state.active === nextState.active) { return; }

    if(nextState.active) {
      window.addEventListener('click', this.handleClickOutside);
    } else {
      window.removeEventListener('click', this.handleClickOutside);
    }

    this.setState({
      animating: true,
      timeout: setTimeout(() => {
        if(!nextState.active) {
          ReactDOM.findDOMNode(this).querySelector('input').blur();
        }

        this.setState({ animating: false, timeout: null });
      }, nextProps.transitionDuration),
    });
  }

  componentWillUnmount() {
    this.state.timeout && clearTimeout(this.state.timeout);
  }

  handleClickOutside = e => onOutsideClick(e, ReactDOM.findDOMNode(this.refs.column), () => this.setState({ active: false }));

  handleFocus = (e) => {
    this.props.onFocus && this.props.onFocus(e);

    this.setState({ active: true });
  };

  handleKeyDown = (e) => {
    this.props.onKeyDown && this.props.onKeyDown(e);

    if([ENTER, TAB].indexOf(e.which || e.keyCode) !== -1) {
      this.setState({ active: false });
    }
  };

  render() {
    const { active, animating } = this.state;
    const {
      columnClassName,
      className,
      maxLength,
      ...props,
    } = this.props;

    return (
      <TableColumn className={classnames(columnClassName, 'prevent-grow md-edit-dialog-column')} ref="column">
        <div
          className={classnames('md-edit-dialog', className, {
            animating,
            active,
          })}
        >
          <TextField
            {...props}
            ref="textField"
            floatingLabel={false}
            onKeyDown={this.handleKeyDown}
            onFocus={this.handleFocus}
            maxLength={active ? maxLength : null}
          />
        </div>
      </TableColumn>
    );
  }
}
