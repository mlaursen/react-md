import React, { PureComponent, PropTypes, Children, cloneElement } from 'react';
import cn from 'classnames';
import deprecated from 'react-prop-types/lib/deprecated';

import invalidIf from '../utils/PropTypes/invalidIf';
import between from '../utils/PropTypes/between';
import Paper from '../Papers/Paper';
import ToolbarTitle from './ToolbarTitle';

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

    /*
     * An optional style to apply to the `h2` surroudning the `title` prop.
     */
    titleStyle: PropTypes.object,

    /*
     * An optional className to apply to the `h2` surroudning the `title` prop.
     */
    titleClassName: PropTypes.string,

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
    title: invalidIf(PropTypes.node, 'titleMenu'),

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
    colored: invalidIf(PropTypes.bool, 'themed'),

    /**
     * The component to render the toolbar as.
     */
    component: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.string,
    ]).isRequired,

    /**
     * Boolean if the toolbar is inset in the page. This will just add some margin around
     * it.
     */
    inset: PropTypes.bool,

    /**
     * An optional zDepth to enforce for the toolbar. This should be a number between 0 and 5.
     * If this is omitted, the toolbar will gain a zDepth of 2 when `fixed`.
     */
    zDepth: between(PropTypes.number, 0, 5),
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
    component: 'header',
  };

  render() {
    const {
      style,
      className,
      component,
      titleStyle,
      titleClassName,
      prominentTitle,
      primary, // deprecated
      secondary, // deprecated
      themed,
      singleColor,
      actions,
      fixed,
      actionLeft, // deprecated
      actionsRight, // deprecated
      children,
      inset,
      ...props
    } = this.props;
    delete props.nav;
    delete props.title;
    delete props.titleMenu;
    delete props.zDepth;
    delete props.colored;
    delete props.prominent;

    // delete deprecated;
    delete props.containerStyle;
    delete props.containerClassName;
    delete props.actionLeft;
    delete props.actionsRight;

    let {
      colored,
      title,
      titleMenu,
      nav,
      prominent,
      zDepth,
    } = this.props;

    colored = colored || primary || secondary;
    prominent = prominent || prominentTitle;

    title = (
      <ToolbarTitle
        key="title"
        style={titleStyle}
        className={titleClassName}
        prominent={prominentTitle}
        offset={prominentTitle}
        title={title}
      />
    );

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
        className: cn('md-title md-title--toolbar md-select-field--toolbar', {
          'md-title--toolbar-offset': prominentTitle,
          'md-title--toolbar-prominent': prominentTitle,
        }, titleMenu.props.className),
        position: titleMenu.props.position || 'tl',
        toolbar: true,
      });
    }

    if (typeof zDepth !== 'number') {
      zDepth = fixed ? 2 : 0;
    }

    return (
      <Paper
        {...props}
        component={component}
        zDepth={zDepth}
        style={style}
        className={cn('md-toolbar', {
          'md-background--primary': colored,
          'md-toolbar--themed': themed,
          'md-toolbar--text-white': singleColor && colored,
          'md-toolbar--discrete': !prominent,
          'md-toolbar--prominent': prominent,
          'md-toolbar--fixed': fixed,
          'md-toolbar--inset': inset,
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
