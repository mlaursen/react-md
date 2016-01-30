import React from 'react';
import classnames from 'classnames';

import Paper from 'react-md/lib/Papers';
import { IconButton } from 'react-md/lib/Buttons';
import Toolbar, { ActionArea } from 'react-md/lib/Toolbars';

import './_fake-phone.scss';

export default function FakePhone({ children, primary = false, secondary = false, className, onMenuClick, onSearchClick, iconLeft = 'menu', iconRight = 'search', title, withTabs = false, ...props }) {
  return (
    <Paper className={classnames('fake-phone', className)} {...props} zDepth={3}>
      <Toolbar
        primary={primary}
        secondary={secondary}
        actionLeft={<IconButton onClick={onMenuClick}>{iconLeft}</IconButton>}
        actionsRight={<ActionArea><IconButton onClick={onSearchClick}>{iconRight}</IconButton></ActionArea>}
        title={title}
        >
        {withTabs && children}
      </Toolbar>
      {!withTabs &&
      <div className="phone-content">
        {children}
      </div>
      }
      <div className="fake-phone-toolbar">
        <IconButton style={{ transform: 'rotate3d(0, 0, 1, 270deg)' }}>change_history</IconButton>
        <IconButton>radio_button_unchecked</IconButton>
        <IconButton>check_box_outline_blank</IconButton>
      </div>
    </Paper>
  );
}
