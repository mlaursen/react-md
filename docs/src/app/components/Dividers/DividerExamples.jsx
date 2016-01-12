import React from 'react';
import Divider from 'react-md/Divider';
import TextField from 'react-md/TextFields';
import FontIcon from 'react-md/FontIcon';

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
            fullWidth
          />
          <Divider />
          <TextField
            placeholder="Message"
            rows={10}
            fullWidth
          />
        </form>
      </FakePhone>
    </div>
  );
}
