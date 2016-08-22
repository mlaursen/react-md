import React from 'react';
import Avatar from 'react-md/lib/Avatars';
import SelectField from 'react-md/lib/SelectFields';

import { randomImage } from 'utils/RandomUtils';

const InboxHeader = () => (
  <header className="account-picker" data-i-tried="true">
    <div className="avatar-blocks">
      <Avatar src={randomImage({ width: 56 })} className="active" alt="Random Avatar" />
      <Avatar src={randomImage()} alt="Backup Avatar" />
    </div>
    <h3 className="account-name">Jonathan Lee</h3>
    <SelectField
      fullWidth
      defaultValue="heyfromjonathan@gmail.com"
      menuItems={['heyfromjonathan@gmail.com', 'altemail@gmail.com']}
      position={SelectField.Positions.BELOW}
    />
  </header>
);

export default InboxHeader;
