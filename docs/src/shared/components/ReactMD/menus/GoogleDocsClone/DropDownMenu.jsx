import React, { PureComponent, PropTypes } from 'react';
import cn from 'classnames';
import DropdownMenu from 'react-md/lib/Menus/DropdownMenu';
import AccessibleFakeInkedButton from 'react-md/lib/Helpers/AccessibleFakeInkedButton';

import toClassName from 'utils/StringUtils/toClassName';
const anchor = {
  x: DropdownMenu.HorizontalAnchors.INNER_LEFT,
  y: DropdownMenu.VerticalAnchors.BOTTOM,
};

export default class DropDownMenu extends PureComponent {
  static propTypes = {
    text: PropTypes.string.isRequired,
    className: PropTypes.string,
    items: PropTypes.array.isRequired,
    children: PropTypes.node,
  };

  constructor(props) {
    super(props);

    this.state = { mouseover: false, visible: false };
  }

  _handleVisibilityChange = (visible) => {
    this.setState({ visible });
  };

  _handleMouseOver = () => {
    this.setState({ mouseover: true });
  };

  _handleMouseLeave = () => {
    this.setState({ mouseover: false });
  };

  render() {
    const { text, items, ...props } = this.props;
    const { mouseover, visible } = this.state;

    return (
      <DropdownMenu
        {...props}
        id={`doc-control-${toClassName(text)}`}
        listClassName="google-docs-list"
        belowAnchor={anchor}
        cascading
        visible={visible}
        onVisibilityChange={this._handleVisibilityChange}
        position={DropdownMenu.Positions.BELOW}
        listHeightRestricted={false}
        menuItems={items}
      >
        <AccessibleFakeInkedButton
          className={cn('google-docs-dd-menu', {
            'md-btn--hover': mouseover,
            'md-paper md-paper--2': visible,
          })}
          onMouseOver={this._handleMouseOver}
          onMouseLeave={this._handleMouseLeave}
          tabbedClassName="md-btn--hover"
        >
          {text}
        </AccessibleFakeInkedButton>
      </DropdownMenu>
    );
  }
}
