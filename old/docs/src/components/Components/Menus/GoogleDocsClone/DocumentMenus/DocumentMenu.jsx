import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import {
  AccessibleFakeInkedButton,
  DropdownMenu,
} from 'react-md';

const anchor = {
  x: DropdownMenu.HorizontalAnchors.INNER_LEFT,
  y: DropdownMenu.VerticalAnchors.BOTTOM,
};

const LIST_PADDING = 32;
const HEADER_HEIGHT = 80;
const EMPTY_STYLE = { height: null };

export default class DocumentMenu extends PureComponent {
  static propTypes = {
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    menuItems: PropTypes.array.isRequired,
  };

  state = { visible: false, listStyle: EMPTY_STYLE };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.visible && this.state.visible !== prevState.visible) {
      this.keepListInViewport();
    }
  }

  cachedStyle = null;
  viewportHeight = null;

  /**
   * If the user has a small desktop screen or has a short-in-height desktop, the list's height should
   * be updated to show as many items as possible before showing 1/3 of the one that is too close to the
   * bottom of the viewport.
   *
   * Also caches the style based on window height.
   */
  keepListInViewport = () => {
    if (this.cachedStyle && this.viewportHeight === window.innerHeight) {
      return;
    }

    this.viewportHeight = window.innerHeight;
    const list = document.getElementById(`document-${this.props.id}-list`);
    if (list) {
      const items = [...list.querySelectorAll('.md-list-item'), ...list.querySelectorAll('.md-divider')];
      const allowed = window.innerHeight - HEADER_HEIGHT - LIST_PADDING;
      let total = 0;
      let height = 0;
      for (let i = 0; i < items.length; i += 1) {
        const item = items[i];
        const itemHeight = Math.max(17, item.offsetHeight); // cheating. The "real" height of dividers is 16 + 1
        if (total + itemHeight > allowed) {
          height = total + (itemHeight / 3);
          break;
        }

        total += itemHeight;
      }

      if (height) {
        this.cachedStyle = { height };
        this.setState({ listStyle: this.cachedStyle });
      } else {
        this.cachedStyle = EMPTY_STYLE;
      }
    }
  };

  handleVisibility = (visible) => {
    let { listStyle } = this.state;
    if (visible && this.viewportHeight === window.innerHeight) {
      listStyle = this.cachedStyle;
    } else if (!visible && listStyle.height !== null) {
      listStyle = EMPTY_STYLE;
    }

    this.setState({ visible, listStyle });
  };

  render() {
    const { visible, listStyle } = this.state;
    const { id, text, ...props } = this.props;
    return (
      <DropdownMenu
        {...props}
        cascading
        id={`document-${id}`}
        visible={visible}
        belowAnchor={anchor}
        position={DropdownMenu.Positions.BELOW}
        listHeightRestricted={false}
        onVisibilityChange={this.handleVisibility}
        listStyle={listStyle}
        listClassName="menus__google-docs__menu__list"
      >
        <AccessibleFakeInkedButton
          tabbedClassName="md-btn--hover"
          className={cn('menus__google-docs__menu', {
            'md-paper md-paper--2': visible,
          })}
        >
          {text}
        </AccessibleFakeInkedButton>
      </DropdownMenu>
    );
  }
}
