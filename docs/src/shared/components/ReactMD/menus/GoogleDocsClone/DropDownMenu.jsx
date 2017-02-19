import React, { PureComponent, PropTypes } from 'react';
import cn from 'classnames';
import Menu from 'react-md/lib/Menus/Menu';
import AccessibleFakeInkedButton from 'react-md/lib/Helpers/AccessibleFakeInkedButton';
import mapToListParts from 'react-md/lib/utils/mapToListParts';

import toClassName from 'utils/StringUtils/toClassName';

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
        className={cn({ 'md-btn--hover': mouseover })}
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
        cascading
        id={`doc-control-${toClassName(text)}`}
        visible={visible}
        toggle={toggle}
        onClose={this._close}
        position={Menu.Positions.BELOW}
      >
        {items.map(mapToListParts)}
      </Menu>
    );
  }
}
