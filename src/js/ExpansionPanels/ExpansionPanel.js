import React, { PureComponent, Children } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import cn from 'classnames';
import deprecated from 'react-prop-types/lib/deprecated';

import getField from '../utils/getField';
import themeColors from '../utils/themeColors';
import getCollapserStyles from '../utils/getCollapserStyles';
import controlled from '../utils/PropTypes/controlled';
import Paper from '../Papers/Paper';
import AccessibleFakeButton from '../Helpers/AccessibleFakeButton';
import Collapse from '../Helpers/Collapse';
import FontIcon from '../FontIcons/FontIcon';
import getDeprecatedIcon from '../FontIcons/getDeprecatedIcon';
import PanelContent from './PanelContent';

const LABEL_FONT_SIZE = 15;
const LINE_HEIGHT = 1.42857;
const SINGLE_LINE_HEIGHT = LABEL_FONT_SIZE * LINE_HEIGHT;

/**
 * The `ExpansionPanel` component needs to be used with the `ExpansionList`
 * component. The only reason is that the `ExpansionPanel` should really
 * be rendered as a table, but it was a bit hard to have a single component
 * dynamically rendering another row when expanded. It couldn't be in the
 * same row since the expanded content might not have the same columns.
 */
export default class ExpansionPanel extends PureComponent {
  static propTypes = {
    /**
     * An optional style to apply to the panel.
     */
    style: PropTypes.object,

    /**
     * An optional className to apply to the panel.
     */
    className: PropTypes.string,

    /**
     * An options style to apply to the panel's header content. This is the
     * section that toggles the children to be visible and label columns.
     */
    headerStyle: PropTypes.object,

    /**
     * An optional className to apply to the panel's header content. This is the
     * section that toggles the children to be visible and label columns.
     */
    headerClassName: PropTypes.string,

    /**
     * An optional style to apply to the element surrounding the children when expanded.
     */
    contentStyle: PropTypes.object,

    /**
     * An optional className to apply to the element surrounding the children when expanded.
     */
    contentClassName: PropTypes.string,

    /**
     * An optional style to apply to the footer when the `footer` prop is `undefined`.
     *
     * @see {@link #footer}
     */
    footerStyle: PropTypes.object,

    /**
     * An optional className to apply to the footer when the `footer` prop is `undefined`.
     *
     * @see {@link #footer}
     */
    footerClassName: PropTypes.string,

    /**
     * The main label to display in the unexpanded panel.
     */
    label: PropTypes.node.isRequired,

    /**
     * Any additional columns to display after the main label. If this is a `list`
     * instead of a singular item, they will each be formatted as a column.
     */
    secondaryLabel: PropTypes.node,

    /**
     * Any additional columns to display after the main label when the panel is
     * expanded. If this is omitted, the default `secondaryLabel` will be displayed
     * instead.
     */
    expandedSecondaryLabel: PropTypes.node,

    /**
     * The component to render the panel as.
     */
    component: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
    ]).isRequired,

    /**
     * The content to display once the panel is toggled open.
     */
    children: PropTypes.node,

    /**
     * A boolean if the panel is currently expanded. This will force the component
     * to be controlled and require's the `onExpandToggle` function to be defined.
     */
    expanded: controlled(PropTypes.bool, 'onExpandToggle', 'defaultExpanded'),

    /**
     * Boolean if an uncontrolled panel should be expanded by default.
     */
    defaultExpanded: PropTypes.bool.isRequired,

    /**
     * The icon to display for expanding the expansion panel.
     */
    expanderIcon: PropTypes.element,

    /**
     * Boolean if the `ExpansionPanel` is currently tab focused. This is injected
     * and managed by the `ExpansionList` component. Do not set yourself.
     */
    focused: PropTypes.bool.isRequired,

    /**
     * A list of min-widths to apply to each column in the panel header. This is injected
     * and managed by the `ExpansionList` component. Do not set yourself.
     */
    columnWidths: PropTypes.arrayOf(PropTypes.number).isRequired,

    /**
     * Boolean if the panel has too much content so that it overflowns. This is injected
     * and managed by the `ExpansionList` component. Do not set yourself.
     *
     * When this is active, it will truncate all columns except for the main label and the
     * toggle icon.
     */
    overflown: PropTypes.bool,

    /**
     * A function to call when the expansion panel's expanded state is toggled.
     * The callback for this function will include the new expanded state.
     *
     * `onExpandToggle(expanded)`
     */
    onExpandToggle: PropTypes.func,

    /**
     * An optional function to call when the Save button is clicked on the expanded panel.
     */
    onSave: PropTypes.func,

    /**
     * An optional function to call when the Cancel button is clicked on the expanded panel.
     */
    onCancel: PropTypes.func,

    /**
     * Boolean if the panel should close when the Save button is clicked.
     */
    closeOnSave: PropTypes.bool,

    /**
     * Boolean if the panel should close when the Cancel button is clicked.
     */
    closeOnCancel: PropTypes.bool,

    /**
     * An optional button type to apply to the Save button. This will get
     * passed to the `FlatButton`.
     */
    saveType: PropTypes.oneOf(['button', 'submit', 'reset']),

    /**
     * The label for the Save button.
     */
    saveLabel: PropTypes.node.isRequired,

    /**
     * Boolean if the Save button should be styled with the primary color.
     */
    savePrimary: PropTypes.bool,

    /**
     * Boolean if the Save button should be styled with the secondary color,
     */
    saveSecondary: PropTypes.bool,

    /**
     * Any additional props to provide/override for the save button in the
     * footer of the panel.
     */
    saveProps: PropTypes.object,

    /**
     * An optional button type to apply to the Cancel button. This will get
     * passed to the `FlatButton`.
     */
    cancelType: PropTypes.oneOf(['button', 'submit', 'reset']),

    /**
     * The label for the Cancel button.
     */
    cancelLabel: PropTypes.node.isRequired,

    /**
     * Boolean if the Cancel button should be styled with the primary color,
     */
    cancelPrimary: PropTypes.bool,

    /**
     * Boolean if the Cancel button should be styled with the secondary color,
     */
    cancelSecondary: PropTypes.bool,

    /**
     * Any additional props to provide/override for the cancel button in the
     * footer of the panel.
     */
    cancelProps: PropTypes.object,

    /**
     * The tab index for the panel's header. This allows keyboard navigation.
     */
    tabIndex: PropTypes.number.isRequired,

    /**
     * Boolean if the panel's content should animate when the content's visibility changes. This
     * can also be toggled from the `ExpansionList` component if all `ExpansionPanel` in the list
     * should not animate. This only affects the height transition.
     *
     * > The default value is really `true` since it gets passed down to the `Collapse` component.
     */
    animateContent: PropTypes.bool,

    /**
     * This prop controls the footer for the expansion panel. If this prop is `undefined`, it will
     * go with the default behavior of generating the save and cancel buttons with the save and cancel
     * props.
     *
     * If this value is `null`, there will be no footer created.
     *
     * Finally, if this prop is defined as any renderable item, it will be displayed in place of the
     * footer.
     *
     * @see {@link #footerChildren}
     */
    footer: PropTypes.node,

    /**
     * Any additional children that should be displayed in the footer of the panel. These children
     * will be placed after the action buttons.
     */
    footerChildren: PropTypes.node,
    expandIconChildren: deprecated(PropTypes.node, 'Use the `expanderIcon` instead'),
    expandIconClassName: deprecated(PropTypes.string, 'Use the `expanderIcon` instead'),
  };

  static defaultProps = {
    defaultExpanded: false,
    expanderIcon: <FontIcon>keyboard_arrow_down</FontIcon>,
    component: 'li',
    saveLabel: 'Save',
    cancelLabel: 'Cancel',
    savePrimary: true,
    tabIndex: 0,
    closeOnSave: true,
    closeOnCancel: true,
    focused: false,
    columnWidths: [],
  };

  static contextTypes = {
    animateContent: PropTypes.bool,
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      received: false,
      twoLine: false,
    };

    if (typeof props.expanded === 'undefined') {
      this.state.expanded = props.defaultExpanded;
    }
  }

  componentDidMount() {
    this._determineIfTwoLine();
  }

  componentWillReceiveProps(nextProps) {
    if (process.env.NODE_ENV === 'development' && !this.state.received) {
      if (nextProps.columnWidths.length === 0) {
        // Hopefully a nice warning about fixing the missing props injected from ExpansionList
        /* eslint-disable no-console */
        console.error(
          'The `ExpansionPanel` component expects the `columnWidths` prop to be injected from the ' +
          '`ExpansionList` component. It could be missing because:' +
          '\n - you have a wrapper component with extra functionality' +
          '\n - the `ExpansionPanel` is not a direct child of the `ExpansionList` component' +
          '\n\nYou can fix this by making sure to pass `this.props.focused` and `this.props.columnWidths` ' +
          'within your wrapper component and making the `ExpansionPanel` a direct child of `ExpansionList`.'
        );
      }

      this.setState({ received: true });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.label === prevProps.label && this.props.secondaryLabel === prevProps.secondaryLabel) {
      return;
    }

    this._determineIfTwoLine();
  }

  _isExpanded(props, state) {
    return typeof props.expanded === 'undefined' ? state.expanded : props.expanded;
  }

  _determineIfTwoLine = () => {
    let twoLine = false;
    Array.prototype.slice.call(findDOMNode(this).querySelectorAll('.md-panel-column'))
      .some(el => (twoLine = el.offsetHeight > SINGLE_LINE_HEIGHT));

    this.setState({ twoLine });
  };

  _handleClick = () => {
    const expanded = !this._isExpanded(this.props, this.state);
    if (this.props.onExpandToggle) {
      this.props.onExpandToggle(expanded);
    }


    if (typeof this.props.expanded === 'undefined') {
      this.setState({ expanded });
    }
  };

  _handleSave = (e) => {
    const { onSave, onExpandToggle, closeOnSave } = this.props;
    if (onSave) {
      onSave(e);
    }

    if (closeOnSave) {
      if (onExpandToggle) {
        onExpandToggle(false);
      }

      if (typeof this.props.expanded === 'undefined') {
        this.setState({ expanded: false });
      }
    }
  };

  _handleCancel = (e) => {
    const { onCancel, onExpandToggle, closeOnCancel } = this.props;
    if (onCancel) {
      onCancel(e);
    }

    if (closeOnCancel) {
      if (onExpandToggle) {
        onExpandToggle(false);
      }

      if (typeof this.props.expanded === 'undefined') {
        this.setState({ expanded: false });
      }
    }
  };

  render() {
    const {
      className,
      label,
      secondaryLabel,
      expandedSecondaryLabel,
      children,
      focused,
      columnWidths,
      saveType,
      saveLabel,
      savePrimary,
      saveSecondary,
      saveProps,
      cancelType,
      cancelLabel,
      cancelPrimary,
      cancelSecondary,
      cancelProps,
      headerStyle,
      headerClassName,
      contentStyle,
      contentClassName,
      tabIndex,
      overflown,
      footer,
      footerChildren,
      footerStyle,
      footerClassName,

      // deprecated
      expandIconChildren,
      expandIconClassName,
      /* eslint-disable no-unused-vars */
      animateContent: propAnimateContent,
      expanded: propExpanded,
      expanderIcon: propExpanderIcon,
      defaultExpanded,
      closeOnSave,
      closeOnCancel,
      onSave,
      onCancel,
      onExpandToggle,
      /* eslint-enable no-unused-vars */
      ...props
    } = this.props;
    const { twoLine } = this.state;
    const expanded = this._isExpanded(this.props, this.state);
    const animateContent = getField(this.props, this.context, 'animateContent');

    let columns = Children.map(expanded && expandedSecondaryLabel || secondaryLabel, (panelLabel, i) => (
      <div
        style={{ [`${overflown ? 'width' : 'minWidth'}`]: columnWidths[i + 1] }}
        className={cn('md-panel-column', {
          'md-panel-column--overflown': overflown,
        }, themeColors({ text: true }))}
      >
        {panelLabel}
      </div>
    ));

    if (!Array.isArray(columns)) {
      columns = [columns];
    }

    columns.unshift((
      <div
        key="main-label"
        style={{ minWidth: columnWidths[0] }}
        className={cn('md-panel-column', themeColors({ text: true }))}
      >
        {label}
      </div>
    ));

    let expanderIcon = getDeprecatedIcon(expandIconClassName, expandIconChildren, this.props.expanderIcon);
    expanderIcon = React.Children.only(expanderIcon);
    expanderIcon = React.cloneElement(expanderIcon, {
      className: getCollapserStyles({
        flipped: expanded,
      }, 'md-expansion-panel__collapser md-cell--right', expanderIcon.props.className),
    });

    return (
      <Paper
        {...props}
        className={cn('md-expansion-panel', {
          'md-expansion-panel--expanded': expanded,
        }, className)}
        aria-expanded={expanded}
      >
        <AccessibleFakeButton
          onClick={this._handleClick}
          style={headerStyle}
          className={cn('md-panel-header', {
            'md-panel-header--expanded': expanded || twoLine,
            'md-panel-header--focused': focused,
          }, headerClassName)}
          tabIndex={tabIndex}
        >
          {columns}
          {expanderIcon}
        </AccessibleFakeButton>
        <Collapse collapsed={!expanded} animate={animateContent}>
          <PanelContent
            style={contentStyle}
            className={contentClassName}
            footerStyle={footerStyle}
            footerClassName={footerClassName}
            onSave={this._handleSave}
            onCancel={this._handleCancel}
            saveType={saveType}
            saveLabel={saveLabel}
            savePrimary={savePrimary}
            saveSecondary={saveSecondary}
            saveProps={saveProps}
            cancelType={cancelType}
            cancelLabel={cancelLabel}
            cancelPrimary={cancelPrimary}
            cancelSecondary={cancelSecondary}
            cancelProps={cancelProps}
            footer={footer}
            footerChildren={footerChildren}
          >
            {children}
          </PanelContent>
        </Collapse>
      </Paper>
    );
  }
}
