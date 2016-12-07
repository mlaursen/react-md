import React, { PureComponent, PropTypes, Children } from 'react';
import { findDOMNode } from 'react-dom';
import cn from 'classnames';

import controlled from '../utils/PropTypes/controlled';
import Paper from '../Papers/Paper';
import Collapser from '../FontIcons/Collapser';
import AccessibleFakeButton from '../Helpers/AccessibleFakeButton';
import Collapse from '../Helpers/Collapse';
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
     * An optional style to applt to the element surrounding the children when expanded.
     */
    contentStyle: PropTypes.object,

    /**
     * An optional className to applt to the element surrounding the children when expanded.
     */
    contentClassName: PropTypes.string,

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
     * Any children required to render the expand icon.
     */
    expandIconChildren: PropTypes.node,

    /**
     * The icon className to use to render the expand icon.
     */
    expandIconClassName: PropTypes.string,

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
    saveLabel: PropTypes.string.isRequired,

    /**
     * Boolean if the Save button should be styled with the primary color.
     */
    savePrimary: PropTypes.bool,

    /**
     * Boolean if the Save button should be styled with the secondary color,
     */
    saveSecondary: PropTypes.bool,

    /**
     * An optional button type to apply to the Cancel button. This will get
     * passed to the `FlatButton`.
     */
    cancelType: PropTypes.oneOf(['button', 'submit', 'reset']),

    /**
     * The label for the Cancel button.
     */
    cancelLabel: PropTypes.string.isRequired,

    /**
     * Boolean if the Cancel button should be styled with the primary color,
     */
    cancelPrimary: PropTypes.bool,

    /**
     * Boolean if the Cancel button should be styled with the secondary color,
     */
    cancelSecondary: PropTypes.bool,

    /**
     * The tab index for the panel's header. This allows keyboard navigation.
     */
    tabIndex: PropTypes.number.isRequired,
  };

  static defaultProps = {
    defaultExpanded: false,
    expandIconChildren: 'keyboard_arrow_down',
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

  constructor(props) {
    super(props);

    this.state = {
      received: false,
      twoLine: false,
    };

    if (typeof props.expanded === 'undefined') {
      this.state.expanded = props.defaultExpanded;
    }

    this._handleSave = this._handleSave.bind(this);
    this._handleCancel = this._handleCancel.bind(this);
    this._handleClick = this._handleClick.bind(this);
    this._determineIfTwoLine = this._determineIfTwoLine.bind(this);
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
          '\n - the `ExpansionPanel` is not a direct child of the `ExpansonList` component' +
          '\n\nYou can fix this by making sure to pass `this.props.focused` and `this.props.columWidths` ' +
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

  _determineIfTwoLine() {
    let twoLine = false;
    Array.prototype.slice.call(findDOMNode(this).querySelectorAll('.md-panel-column'))
      .some(el => (twoLine = el.offsetHeight > SINGLE_LINE_HEIGHT));

    this.setState({ twoLine });
  }

  _handleClick() {
    const expanded = !this._isExpanded(this.props, this.state);
    if (this.props.onExpandToggle) {
      this.props.onExpandToggle(expanded);
    }


    if (typeof this.props.expanded === 'undefined') {
      this.setState({ expanded });
    }
  }

  _handleSave(e) {
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
  }

  _handleCancel(e) {
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
  }

  render() {
    const {
      className,
      label,
      secondaryLabel,
      expandedSecondaryLabel,
      children,
      expandIconChildren,
      expandIconClassName,
      focused,
      columnWidths,
      saveType,
      saveLabel,
      savePrimary,
      saveSecondary,
      cancelType,
      cancelLabel,
      cancelPrimary,
      cancelSecondary,
      headerStyle,
      headerClassName,
      contentStyle,
      contentClassName,
      tabIndex,
      ...props
    } = this.props;

    delete props.defaultExpanded;
    delete props.expanded;
    delete props.onSave;
    delete props.onCancel;
    delete props.onExpandToggle;
    delete props.closeOnSave;
    delete props.closeOnCancel;

    const { twoLine } = this.state;
    const expanded = this._isExpanded(this.props, this.state);

    let columns = Children.map(expanded && expandedSecondaryLabel || secondaryLabel, (panelLabel, i) => (
      <div className="md-panel-column md-text" style={{ minWidth: columnWidths[i + 1] }}>
        {panelLabel}
      </div>
    ));

    if (!Array.isArray(columns)) {
      columns = [columns];
    }

    columns.unshift((
      <div className="md-panel-column md-text" style={{ minWidth: columnWidths[0] }} key="main-label">
        {label}
      </div>
    ));

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
          <Collapser flipped={expanded} iconClassName={expandIconClassName} className="md-cell--right">
            {expandIconChildren}
          </Collapser>
        </AccessibleFakeButton>
        <Collapse collapsed={!expanded}>
          <PanelContent
            style={contentStyle}
            className={contentClassName}
            onSave={this._handleSave}
            onCancel={this._handleCancel}
            saveType={saveType}
            saveLabel={saveLabel}
            savePrimary={savePrimary}
            saveSecondary={saveSecondary}
            cancelType={cancelType}
            cancelLabel={cancelLabel}
            cancelPrimary={cancelPrimary}
            cancelSecondary={cancelSecondary}
          >
            {children}
          </PanelContent>
        </Collapse>
      </Paper>
    );
  }
}
