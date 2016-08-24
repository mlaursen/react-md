import React, { PureComponent, PropTypes } from 'react';
import cn from 'classnames';

import FontIcon from '../FontIcons';

/**
 * Any additional props such as event listeners will be applied
 * to the chip itself, not the chip container.
 */
export default class Chip extends PureComponent {
  static propTypes = {
    /**
     * Any style that should be added to the chip container.
     */
    style: PropTypes.object,

    /**
     * An optional className to add to the chip container.
     */
    className: PropTypes.string,

    /**
     * The label to display in the chip.
     */
    label: PropTypes.string.isRequired,

    /**
     * An optional function to call when the chip is clicked.
     */
    onClick: PropTypes.func,

    /**
     * An optional function to call to convert the chip into a removable chip.
     * This will inject a remove icon button into the chip.
     */
    remove: PropTypes.func,

    /**
     * The children to use to display the remove icon button.
     */
    removeIconChildren: PropTypes.node,

    /**
     * The icon className to use to display the remove icon button.
     */
    removeIconClassName: PropTypes.string,

    /**
     * An optional function to call when the chip is focused.
     */
    onFocus: PropTypes.func,

    /**
     * An optional function to call when the chip is blurred.
     */
    onBlur: PropTypes.func,

    /**
     * This should be an Avatar component that will be injected before the
     * label in the chip.
     */
    children: PropTypes.node,
  };

  static defaultProps = {
    removeIconChildren: 'add_circle',
    removeIconClassName: 'material-icons rotate-45-deg',
  };

  constructor(props) {
    super(props);

    this.state = { focus: false };
    this._handleFocus = this._handleFocus.bind(this);
    this._handleBlur = this._handleBlur.bind(this);
  }

  _handleFocus(e) {
    if (this.props.onFocus) {
      this.props.onFocus(e);
    }

    this.setState({ focus: true });
  }

  _handleBlur(e) {
    if (this.props.onBlur) {
      this.props.onBlur(e);
    }

    this.setState({ focus: false });
  }

  render() {
    const {
      style,
      className,
      label,
      children,
      remove,
      removeIconChildren,
      removeIconClassName,
      onClick,
      ...props,
    } = this.props;

    let removeBtn;
    if (remove) {
      removeBtn = (
        <button type="button" className="md-chip-remove" onClick={remove}>
          <FontIcon iconClassName={removeIconClassName} children={removeIconChildren} />
        </button>
      );
    }

    return (
      <div
        className={cn('md-chip-container', className, {
          'md-contact-chip': !!children,
          'focus': this.state.focus,
        })}
        style={style}
      >
        {children}
        <button
          type="button"
          {...props}
          className={cn('md-chip', {
            'with-remove': !!remove,
          })}
          onClick={onClick}
          onFocus={this._handleFocus}
          onBlur={this._handleBlur}
        >
          {label}
        </button>
        {removeBtn}
      </div>
    );
  }
}
