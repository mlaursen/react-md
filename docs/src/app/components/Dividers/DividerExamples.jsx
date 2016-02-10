import React from 'react';
import Divider from 'react-md/lib/Dividers';
import TextField from 'react-md/lib/TextFields';
import FontIcon from 'react-md/lib/FontIcons';

import FakePhone from '../../FakePhone';

export default function DividerExamples() {
  return (
    <div className="fake-phone-container">
      <FakePhone
        secondary
        iconLeft={<FontIcon>arrow_back</FontIcon>}
        iconRight={<FontIcon>send</FontIcon>}
        title="Compose"
        >
        <form>
          <TextField
            label="From"
            type="email"
            floatingLabel={false}
            fullWidth
          />
          <Divider />
          <TextField
            label="To"
            type="email"
            floatingLabel={false}
            fullWidth
          />
          <Divider />
          <TextField
            label="Subject"
            floatingLabel={false}
            maxLength={80}
            fullWidth
          />
          <Divider />
          <TextField
            placeholder="Message"
            rows={2}
            maxRows={-1}
            fullWidth
            maxLength={120}
          />
        </form>
      </FakePhone>
    </div>
  );
}
