import React, { useState } from 'react';
import { Button, DropdownMenu, IconSeparator, FontIcon, Toolbar } from 'react-md';
import getCollapserStyles from 'react-md/lib/utils/getCollapserStyles';

const VersionPicker = () => {
  const [visible, setVisible] = useState(false);
  return (
    <Toolbar title="react-md" style={{ alignItems: 'center' }}>
      <DropdownMenu
        id="version-picker"
        menuItems={[{
          href: 'https://react-md.dev',
          primaryText: 'v2',
          component: 'a',
        }]}
        belowAnchor={{
          x: DropdownMenu.HorizontalAnchors.INNER_RIGHT,
          y: DropdownMenu.VerticalAnchors.OVERLAP,
        }}
        position={DropdownMenu.Positions.BELOW}
        visible={visible}
        onVisibilityChange={nextVisible => setVisible(nextVisible)}
      >
        <Button flat style={{ margin: 0 }}>
          <IconSeparator label="v1">
            <FontIcon className={getCollapserStyles({ flipped: visible })}>arrow_drop_down</FontIcon>
          </IconSeparator>
        </Button>
      </DropdownMenu>
    </Toolbar>
  );
};

export default VersionPicker;
