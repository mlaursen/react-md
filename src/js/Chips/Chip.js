import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';

import FontIcon from '../FontIcons';

export default class Chip extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = { focus: false };
  }

  static propTypes = {
    className: PropTypes.string,
    onClick: PropTypes.func,
    remove: PropTypes.func,
    label: PropTypes.string.isRequired,
    children: PropTypes.node,
    removeIconChildren: PropTypes.node,
    removeIconClassName: PropTypes.string,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
  };

  static defaultProps = {
    removeIconChildren: 'add_circle',
    removeIconClassName: 'material-icons rotate-45-deg',
  };

  handleFocus = (e) => {
    if(this.props.onFocus) { this.props.onFocus(e); }
    this.setState({ focus: true });
  };

  handleBlur = (e) => {
    if(this.props.onBlur) { this.props.onBlur(e); }
    this.setState({ focus: false });
  };

  render() {
    const {
      className,
      label,
      children,
      remove,
      removeIconChildren,
      removeIconClassName,
      onClick,
    } = this.props;

    return (
      <div className={classnames('md-chip-container', className, { 'md-contact-chip': !!children, 'focus': this.state.focus })}>
        {children}
        <button
          type="button"
          className={classnames('md-chip', {
            'with-remove': !!remove,
          })}
          onClick={onClick}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
        >
          {label}
        </button>
        {remove &&
        <button type="button" className="md-chip-remove" onClick={remove}>
          <FontIcon iconClassName={removeIconClassName} children={removeIconChildren} />
        </button>
        }
      </div>
    );
  }
}
