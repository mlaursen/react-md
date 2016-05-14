import React, { Component, PropTypes } from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';

import Divider from '../Dividers';
import { List, ListItem } from '../Lists';
import Subheader from '../Subheaders';

/**
 * The `Sidebar` component is related to the `SideNav` component
 * fromt he Material Design Docs.
 *
 * A sidebar can be docked tot he left or right of the screen.
 */
export default class Sidebar extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  static propTypes = {
    /**
     * Boolean if the overlay should appear when opened.
     */
    overlay: PropTypes.bool,

    /**
     * Boolean if the sidebar is visible and open.
     */
    isOpen: PropTypes.bool,

    /**
     * Boolean if the sidebar is fixed to the side of the page.
     */
    fixed: PropTypes.bool,

    /**
     * Boolean if sidebar should be responsive.
     */
    responsive: PropTypes.bool,

    /**
     * An optional header to display above the children or list items.
     */
    header: PropTypes.node,

    /**
     * Any children to display after the generated list of items.
     */
    children: PropTypes.node,

    /**
     * An optional className to apply.
     */
    className: PropTypes.string,

    /**
     * The transition name to use for the overlay.
     */
    transitionName: PropTypes.string,

    /**
     * The enter timeout for the overlay transition.
     */
    transitionEnterTimeout: PropTypes.number,

    /**
     * The leave timeout for the overlay transition.
     */
    transitionLeaveTimeout: PropTypes.number,

    /**
     * An optional function to call when the overlay is clicked.
     * This should normally close the sidebar.
     */
    onOverlayClick: PropTypes.func,

    /**
     * The position to align the sidebar of the screen to.
     */
    align: PropTypes.oneOf(['left', 'right']),

    /**
     * A list of item props to convert into `ListItem`, `Divider`, or
     * `Subheader` components.
     *
     * ##### Item Descriptions
     */
    items: PropTypes.arrayOf(PropTypes.shape({
      /**
       * Boolean if this item is a divider.
       */
      divider: PropTypes.bool,

      /**
       * Boolean if this item is a subheader.
       */
      subheader: PropTypes.bool,

      /**
       * The primary text to display in a `ListItem` or a `Subheader`.
       */
      primaryText: PropTypes.string,
    })),
  };

  static defaultProps = {
    align: 'left',
    responsive: true,
    transitionName: 'md-overlay',
    transitionEnterTimeout: 150,
    transitionLeaveTimeout: 150,
  };

  itemToComponent = ({ divider, subheader, ...itemProps }) => {
    let component = ListItem;
    if(divider) {
      component = Divider;
    } else if(subheader) {
      component = Subheader;
    }

    return React.createElement(component, itemProps);
  };

  render() {
    const { isOpen, header, overlay, responsive, className, children, onOverlayClick, align, items, fixed, ...props } = this.props;
    const isOverlayVisible = isOpen && (responsive || overlay);

    let listItems;
    if(items) {
      listItems = (
        <List>
          {items.map(this.itemToComponent)}
        </List>
      );
    }
    return (
      <CSSTransitionGroup
        component="div"
        className={classnames('md-sidebar-container', `md-sidebar-${align}`, className, { fixed, responsive })}
        {...props}
        >
        <nav className={classnames('md-sidebar', { 'active': isOpen })}>
          {header}
          {listItems}
          {children}
        </nav>
        {isOverlayVisible &&
          <div className="md-overlay" onClick={onOverlayClick} />
        }
      </CSSTransitionGroup>
    );
  }
}
