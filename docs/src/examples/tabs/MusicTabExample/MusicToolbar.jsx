import React from 'react';
import Toolbar from 'react-md/lib/Toolbars';
import CloseButton from 'containers/PhoneSizeDemo/CloseButton';
import Button from 'react-md/lib/Buttons/Button';

const MusicToolbar = () => (
  <Toolbar
    colored
    nav={<CloseButton icon>keyboard_arrow_left</CloseButton>}
    title="Metal"
    actions={<Button icon>search</Button>}
  />
);

export default MusicToolbar;
