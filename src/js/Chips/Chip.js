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
    removeIcon: PropTypes.node.isRequired,
  };

  static defaultProps = {
    removeIcon: <FontIcon style={{ transform: 'rotate(45deg)' }}>add_circle</FontIcon>,
  };

  render() {
    const { className, label, children, remove, removeIcon, onClick } = this.props;
    return (
      <div className={classnames('md-chip-container', className, { 'md-contact-chip': !!children, 'focus': this.state.focus })}>
        {children}
        <button
          type="button"
          className={classnames('md-chip', {
            'with-remove': !!remove,
          })}
          onClick={onClick}
          onFocus={() => this.setState({ focus: true })}
          onBlur={() => this.setState({ focus: false })}
          >
          {label}
        </button>
        {remove &&
        <button type="button" className="md-chip-remove" onClick={remove}>
          {removeIcon}
        </button>
        }
      </div>
    );
  }
}
