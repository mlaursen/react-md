import React, { PureComponent, PropTypes, Children, cloneElement } from 'react';
import cn from 'classnames';
import deprecated from 'react-prop-types/lib/deprecated';

import ToolbarTitle from './ToolbarTitle';
import Paper from '../Papers';

export default class Toolbar extends PureComponent {
  static propTypes = {
    /**
     * An optional style to apply to the toolbar.
     */
    style: PropTypes.object,

    /**
     * An optional className to apply to the toolbar,
     */
    className: PropTypes.string,

    /**
     * Boolean if the toolbar should more prominent. This will double the height of the toolbar.
     */
    prominent: PropTypes.bool,

    /**
     * Boolean if the toolbar's title should be more prominent. This will move the title to the
     * second line of the toolbar. This only works when the `prominent` prop is true as well.
     */
    prominentTitle: PropTypes.bool,

    /**
     * The current title of the page to show in the toolbar. It is invalid to specify both a
     * `title` and a `titleMenu`. Only one should be given.
     */
    title: (props, propName, componentName, location, propFullName, ...args) => {
      const componentNameSafe = componentName || '<<anonymous>>';
      const propFullNameSafe = propFullName || propName;
      let err = PropTypes.node(props, propName, componentName, location, propFullName, ...args);
      if (!err && typeof props[propName] !== 'undefined' && typeof props.titleMenu !== 'undefined') {
        err = new Error(
          `You provided both a \`${propFullNameSafe}\` and a \`titleMenu\` ${location} to the ` +
          `${componentNameSafe} but only one can be given.`
        );
      }

      return err;
    },

    /**
     * An optional title menu to display instead of the title. This should be a `SelectField` component.
     * It is cloned with some additional props, so if the `SelectField` is separated into a separate
     * component, the following props must be passed to get the correct styling: `className`, `block`,
     * `paddedBlock`, `position`.
     */
    titleMenu: PropTypes.element,

    /**
     * This prop is used for rendering an optional navigation button to the left of the `title`
     * or the `titleMenu` component. This needs to be an icon `Button` because some additional props
     * are cloned into it.
     */
    nav: PropTypes.element,

    /**
     * Any additional actions to display to the right of the title. This should be a list or a single
     * `Button` to display. The buttons get cloned with an additional className for toolbar styling.
     */
    actions: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.arrayOf(PropTypes.element),
    ]),

    /**
     * Any children to display in the toolbar. This will be displayed between the optional title and
     * actions.
     */
    children: PropTypes.node,

    /**
     * Boolean if the toolbar should be fixed to the top of the page. This will add some additional box shadow.
     */
    fixed: PropTypes.bool,

    /**
     * Boolean if the nav, actions, and title should share the same color. For a `colored` or dark `themed`
     * toolbar, they will all be colored white. For a transparent or light `themed` toolbar, the colors will
     * be the `rgba(0, 0, 0, .87)`. Setting this to false will only style the title to the specific color
     * stated above.
     */
    singleColor: PropTypes.bool,

    /**
     * Boolean if the toolbar should be colored based off the current theme. This will either style the background
     * to be fairly white, or fairly black. You can not specify both `themed` and `colored`.
     */
    themed: PropTypes.bool,

    /**
     * Boolean if the toolbar should be colored with the `$md-primary-color`.
     */
    colored: (props, propName, componentName, ...args) => {
      let err = PropTypes.bool(props, propName, componentName, ...args);

      if (!err && typeof props[propName] !== 'undefined' && typeof props.theme !== 'undefined') {
        err = new Error(
          `You provided both a \`colored\` prop and a \`themed\` prop to the ${componentName} but ` +
          'only one may be chosen.'
        );
      }

      return err;
    },
    containerStyle: deprecated(
      PropTypes.object,
      'The `container` no longer exists in the `Toolbar`. Use the `style` prop instead'
    ),
    containerClassName: deprecated(
      PropTypes.string,
      'The `container` no longer exists in the `Toolbar`. Use the `className` prop instead'
    ),
    primary: deprecated(PropTypes.bool, 'Use the `colored` prop instead'),
    secondary: deprecated(
      PropTypes.bool,
      'Toolbars can no longer be themed to the secondary color. Use the `colored` prop instead'
    ),
    actionLeft: deprecated(PropTypes.element, 'Use the `nav` prop instead'),
    actionsRight: deprecated(
      PropTypes.node,
      'Use the `menu` prop and/or the `actions` prop instead'
    ),
  };

  static defaultProps = {
    singleColor: true,
  };

  render() {
    const {
      style,
      className,
      prominentTitle,
      primary,
      secondary,
      themed,
      singleColor,
      actions,
      fixed,
      actionLeft,
      actionsRight,
      children,
      ...props,
    } = this.props;
    delete props.nav;
    delete props.title;
    delete props.titleMenu;
    delete props.colored;
    delete props.prominent;

    let {
      colored,
      title,
      titleMenu,
      nav,
      prominent,
    } = this.props;

    colored = colored || primary || secondary;
    prominent = prominent || prominentTitle;

    title = <ToolbarTitle key="title" prominent={prominentTitle} offset={!nav} title={title} />;

    if (nav || actionLeft) {
      const navEl = Children.only(nav || actionLeft);
      nav = cloneElement(nav, {
        className: cn('md-btn--toolbar md-toolbar--action-left', navEl.props.className),
      });
    }

    let rightActions;
    if (actions || actionsRight) {
      rightActions = Children.map(Children.toArray(actions || actionsRight), action => cloneElement(action, {
        className: cn('md-btn--toolbar', action.props.className),
      }));

      rightActions = (
        <div key="actions" className="md-cell--right md-toolbar--action-right">
          {rightActions}
        </div>
      );
    }

    if (titleMenu) {
      titleMenu = Children.only(titleMenu);
      titleMenu = cloneElement(titleMenu, {
        className: cn('md-select-field--toolbar md-title--toolbar', {
          'md-title--toolbar-offset': !nav,
        }, titleMenu.props.className),
        menuClassName: cn({
          'md-toolbar-relative': prominentTitle,
        }, titleMenu.props.menuClassname),
        block: true,
        paddedBlock: false,
        position: titleMenu.props.position || 'tl',
      });
    }

    return (
      <Paper
        {...props}
        component="header"
        zDepth={fixed ? 2 : 0}
        style={style}
        className={cn('md-toolbar', {
          'md-background--primary': colored,
          'md-toolbar--themed': themed,
          'md-toolbar--text-white': singleColor && colored,
          'md-toolbar--discreet': !prominent,
          'md-toolbar--prominent': prominent,
          'md-toolbar--fixed': fixed,
        }, className)}
      >
        {nav}
        {title}
        {titleMenu}
        {children}
        {rightActions}
      </Paper>
    );
  }
}
