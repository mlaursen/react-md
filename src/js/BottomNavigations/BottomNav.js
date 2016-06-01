import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import classnames from 'classnames';
import FontIcon from '../FontIcons';
import injectInk from '../Inks';

/**
 * The `BottomNav` component is used for rendering one of the nav items
 * in the `BottomNavigation` component. This is used for switching the view.
 */
class BottomNav extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  static propTypes = {
    /**
     * An optional style to apply.
     */
    style: PropTypes.object,

    /**
     * An optional className to apply.
     */
    className: PropTypes.string,

    /**
     * The label for the navigation.
     */
    label: PropTypes.string.isRequired,

    /**
     * Any children used to display the icon.
     */
    iconChildren: PropTypes.node,

    /**
     * The icon className to use.
     */
    iconClassName: PropTypes.string,

    /**
     * Boolean if this nav is currently active.
     */
    active: PropTypes.bool.isRequired,

    /**
     * Boolean if the nav is colored.
     */
    colored: PropTypes.bool,

    /**
     * An optional function to call onClick. It is called
     * with the label and click event.
     *
     * `onClick(label, event)`
     */
    onClick: PropTypes.func,

    /**
     * A function injected from the `BottomNavigation` component.
     * It is called with the label and click event.
     *
     * `onClick(label, event)`
     */
    onNavChange: PropTypes.func.isRequired,

    /**
     * Boolean if the tabs are fixed sizes. This will be true
     * if there are only three BottomNavs.
     */
    fixed: PropTypes.bool.isRequired,

    /**
     * Ink injected from `injectInk`.
     */
    ink: PropTypes.node,

    /**
     * The component to render as.
     */
    component: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
    ]).isRequired,
  };

  static defaultProps = {
    component: 'button',
  };

  handleClick = (e) => {
    const { onClick, onNavChange, label } = this.props;
    onClick && onClick(label, e);
    onNavChange(label, e);
  };

  render() {
    const {
      className,
      label,
      iconClassName,
      iconChildren,
      colored,
      active,
      fixed,
      ink,
      component,
      ...props,
    } = this.props;
    delete props.onClick;


    let displayLabel;
    if(fixed || active) {
      displayLabel = <span key="label">{label}</span>;
    }

    return (
      <CSSTransitionGroup
        type={component === 'button' ? 'button' : null}
        component={component}
        transitionName="bottom-nav"
        transitionEnterTimeout={150}
        transitionLeave={false}
        className={classnames('md-bottom-nav', className, {
          active,
          colored,
          fixed,
          'shifting': !fixed,
          'default': !colored,
        })}
        {...props}
        onClick={this.handleClick}
      >
        {ink}
        <FontIcon key="icon" iconClassName={iconClassName}>{iconChildren}</FontIcon>
        {displayLabel}
      </CSSTransitionGroup>
    );
  }
}

export default injectInk(BottomNav);
