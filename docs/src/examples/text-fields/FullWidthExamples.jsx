import React from 'react';
import Divider from 'react-md/lib/Dividers';
import TextField from 'react-md/lib/TextFields';
import { IconButton } from 'react-md/lib/Buttons';

import PhoneSize from 'components/PhoneSize';

const BlockExamples = () => (
  <div>
    <PhoneSize
      iconLeft="arrow_back"
      actionsRight={<IconButton className="md-toolbar-item margin-left-auto">send</IconButton>}
      contentComponent="form"
    >
      <TextField label="From" type="email" block />
      <Divider />
      <TextField label="To" type="email" block />
      <Divider />
      <TextField label="Subject" maxLength={80} block />
      <Divider />
      <TextField placeholder="Message" rows={2} maxRows={-1} block maxLength={120} />
    </PhoneSize>
  </div>
);

export default BlockExamples;
