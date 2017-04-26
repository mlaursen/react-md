import React, { PureComponent, PropTypes } from 'react';
import cn from 'classnames';
import isRequiredForA11y from 'react-prop-types/lib/isRequiredForA11y';

/**
 * This component is just a simple accessibility wrapper when using tabs. If you use the
 * `TabsContainer` component, you *should* not manually use this as the `TabsContainer`
 * generates this for you.
 */
export default class TabPanel extends PureComponent {
  static propTypes = {
    /**
     * An id for the panel. This is used for a11y. This should equal the `controlsId`
     * of whichever tab's children will be placed in here.
     */
    id: isRequiredForA11y(PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ])),

    /**
     * An id for the tab that owns this panel. This should equal the `id` of whichever
     * tab's children will be placed in here.
     */
    controlledById: isRequiredForA11y(PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ])),

    /**
     * An optional style to apply.
     */
    style: PropTypes.object,

    /**
     * An optional className to apply.
     */
    className: PropTypes.string,

    /**
     * The component to render the panel as.
     */
    component: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.string,
    ]).isRequired,

    /**
     * Boolean if the panel is currently active. This is used to generated the `aria-hidden`
     * attribute.
     */
    active: PropTypes.bool,

    /**
     * Any children to display.
     */
    children: PropTypes.node,
  };

  static defaultProps = {
    component: 'div',
  };

  render() {
    const {
      component: Component,
      id,
      active,
      className,
      controlledById,
      children,
      ...props
    } = this.props;

    return (
      <Component
        {...props}
        id={id}
        className={cn('md-tab-panel', className)}
        role="tabpanel"
        aria-hidden={!active}
        aria-labelledby={controlledById}
      >
        {children}
      </Component>
    );
  }
}
