import React, { PureComponent, PropTypes, Children, cloneElement, isValidElement } from 'react';
import cn from 'classnames';

import oneRequired from '../utils/PropTypes/oneRequired';
import AccessibleFakeInkedButton from '../Helpers/AccessibleFakeInkedButton';

/**
 * The `Tab` component is used for rendering a single tab in the `Tabs` component.
 * It can opionally have either a `label`, an `icon` or both.
 */
export default class Tab extends PureComponent {
  static propTypes = {
    /**
     * An id for the tab. This is required for a11y. If you use the `Tabs` component, this
     * will automatically be generated for you and injected into this component.
     */
    id: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),

    /**
     * An id for a `TabPanel` that holds the children from this tab. This is required for a11y.
     * If you use the `Tabs` component, this will automatically be generated for you and injected
     * into this component.
     */
    controlsId: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),

    /**
     * An optional style to apply.
     */
    style: PropTypes.object,

    /**
     * An optional className to apply.
     */
    className: PropTypes.string,

    /**
     * The component to render as.
     */
    component: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.string,
    ]).isRequired,

    /**
     * Any children to display once the tab has been selected.
     */
    children: PropTypes.node,

    /**
     * An optional icon to display in the tab. This can either be used alone, or it
     * will be placed above the `label` if both are given.
     */
    icon: PropTypes.element,

    /**
     * An optional label to display in the tab. This can either be used alone, or it
     * will be placed below the `icon` if both are given.
     */
    label: oneRequired(PropTypes.node, 'icon'),

    /**
     * An optional function to call when the tab is clicked. The callback includes this tab's index,
     * id, controlsId, children, and finally click event. All the additional parameters are included
     * if you are not using the `TabsContainer` component. The `id` and `controlsId` are mainly passed
     * for accessibility.
     *
     * ```js
     * onClick(index, id, controlsId, children, event);
     * ```
     */
    onClick: PropTypes.func,

    /**
     * Boolean if the tab is currently active. If you use the `Tabs` component, this is automatically
     * injected.
     */
    active: PropTypes.bool,

    /**
     * Boolean if the tab is currently active. If you use the `Tabs` component, this is automatically
     * injected.
     */
    index: PropTypes.number,
  };

  static defaultProps = {
    component: 'li',
  };

  constructor(props) {
    super(props);

    this._handleClick = this._handleClick.bind(this);
  }

  _handleClick(e) {
    if (this.props.onClick) {
      this.props.onClick(this.props.index, this.props.id, this.props.controlsId, this.props.children, e);
    }
  }

  render() {
    const {
      id,
      controlsId,
      className,
      active,
      ...props
    } = this.props;
    delete props.index;
    delete props.icon;
    delete props.label;

    let { icon, label } = this.props;
    if (icon) {
      const iconEl = Children.only(icon);
      icon = cloneElement(icon, {
        className: cn('md-icon--tab', iconEl.props.className),
      });
    }

    if (isValidElement(label)) {
      const labelEl = Children.only(label);
      label = cloneElement(label, {
        className: cn('md-tab-label', labelEl.props.className),
      });
    } else {
      label = <div className="md-tab-label">{label}</div>;
    }
    return (
      <AccessibleFakeInkedButton
        {...props}
        id={id}
        role="tab"
        onClick={this._handleClick}
        className={cn('md-tab', {
          'md-tab--active': active,
          'md-tab--inactive': !active,
          'md-tab--icon': label && icon,
        }, className)}
        aria-controls={controlsId}
        aria-selected={active}
      >
        {icon}
        {label}
      </AccessibleFakeInkedButton>
    );
  }
}
