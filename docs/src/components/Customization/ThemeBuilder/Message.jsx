import React from 'react';
import { bem } from 'react-md';

const Message = () => (
  <p className={bem('theme-configuration', 'message')}>
    <i>
      When the save for future visits checkbox is checked, cookies will be created to store your
      theme for later visits and other pages. If you do not check this checkbox, the default theme
      will be applied when you leave this page.
    </i>
  </p>
);

export default Message;
