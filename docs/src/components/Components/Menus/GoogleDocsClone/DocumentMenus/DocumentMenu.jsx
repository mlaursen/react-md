import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import AccessibleFakeInkedButton from 'react-md/lib/Helpers/AccessibleFakeInkedButton';
import DropdownMenu from 'react-md/lib/Menus/DropdownMenu';

const anchor = {
  x: DropdownMenu.HorizontalAnchors.INNER_LEFT,
  y: DropdownMenu.VerticalAnchors.BOTTOM,
};

export default class DocumentMenu extends PureComponent {
  static propTypes = {
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    menuItems: PropTypes.array.isRequired,
  };

  state = { visible: false };

  handleVisibility = (visible) => {
    this.setState({ visible });
  };

  render() {
    const { visible } = this.state;
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
