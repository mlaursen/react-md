import React from 'react';
import Divider from 'react-md/lib/Dividers';
import TextField from 'react-md/lib/TextFields';
import Button from 'react-md/lib/Buttons';
import Chip from 'react-md/lib/Chips';

import './_email.scss';
import PhoneSizeDemo from 'containers/PhoneSizeDemo';
import { randomAvatars } from 'utils/RandomUtils';

const [trevor, alex] = randomAvatars(2);

const defaultMulti = `Hi,
I just wanted to check in and see if you had any plans this upcoming weekend. ` +
  'We are thinking of heading up to Napa. Let us know if you\'d like to go and ' +
  'we\'ll make reservations.';

const FullWidthExamples = () => (
  <PhoneSizeDemo
    iconLeft="arrow_back"
    toolbarActions={<Button icon>send</Button>}
    contentComponent="form"
  >
    <div className="email-chip-container">
      <TextField placeholder="To" type="email" block id="emailTo" paddedBlock={false} />
      <Chip label="Trevor Hansen" avatar={trevor} />
      <Chip label="Alex Nelson" avatar={alex} />
    </div>
    <Divider className="md-divider--text-field" />
    <TextField placeholder="Subject" maxLength={80} block id="emailSubject" defaultValue="Plans for the weekend" />
    <Divider className="md-divider--text-field" />
    <TextField placeholder="Message" rows={4} block maxLength={240} id="emailMessage" defaultValue={defaultMulti} />
  </PhoneSizeDemo>
);

export default FullWidthExamples;
