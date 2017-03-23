import React, { PureComponent, PropTypes } from 'react';
import cn from 'classnames';
import Menu from 'react-md/lib/Menus/Menu';
import AccessibleFakeInkedButton from 'react-md/lib/Helpers/AccessibleFakeInkedButton';
import mapToListParts from 'react-md/lib/utils/mapToListParts';

import toClassName from 'utils/StringUtils/toClassName';
const anchor = {
  x: Menu.HorizontalAnchors.INNER_LEFT,
  y: Menu.VerticalAnchors.BOTTOM,
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

  _toggle = () => {
    this.setState({ visible: true });
  };

  _close = () => {
    this.setState({ visible: false });
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

    const toggle = (
      <AccessibleFakeInkedButton
        className={cn('google-docs-dd-menu', {
          'md-btn--hover': mouseover,
          'md-paper md-paper--2': visible,
        })}
        onClick={this._toggle}
        onMouseOver={this._handleMouseOver}
        onMouseLeave={this._handleMouseLeave}
        tabbedClassName="md-btn--hover"
      >
        {text}
      </AccessibleFakeInkedButton>
    );

    return (
      <Menu
        {...props}
        id={`doc-control-${toClassName(text)}`}
        listClassName="google-docs-list"
        anchor={anchor}
        cascading
        visible={visible}
        toggle={toggle}
        onClose={this._close}
        position={Menu.Positions.BELOW}
        listHeightRestricted={false}
      >
        {items.map(mapToListParts)}
      </Menu>
    );
  }
}
