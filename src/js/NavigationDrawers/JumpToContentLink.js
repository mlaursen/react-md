import React, { PureComponent, PropTypes } from 'react';
import cn from 'classnames';

/**
 * This is an accessibility only component that should be used in the `NavigationDrawer`
 * component. It allows keyboard users to quickly jump to the main content.
 *
 * This component relies on the `contextTypes` of the `NavigationDrawer` to work. If this is going
 * to be used outside of that component, you will need to specify an `id` and `label` contextType
 * to pass to this component.
 */
export default class JumpToContentLink extends PureComponent {
  static propTypes = {
    /**
     * An optional className to apply.
     */
    className: PropTypes.string,

    /**
     * An optional function to call when the linked is clicked.
     */
    onClick: PropTypes.func,
  };

  static contextTypes = {
    id: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]).isRequired,
    label: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);

    this._handleClick = this._handleClick.bind(this);
  }

  _handleClick(e) {
    if (this.props.onClick) {
      this.props.onClick(e);
    }

    document.getElementById(this.context.id).focus();
  }

  render() {
    const { className, ...props } = this.props;
    const { id, label } = this.context;
    return (
      <a
        {...props}
        id={`skipTo${id}`}
        href={`#${id}`}
        onClick={this._handleClick}
        className={cn('md-content-jump', className)}
      >
        {label}
      </a>
    );
  }
}
