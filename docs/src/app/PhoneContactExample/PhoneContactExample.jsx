import React from 'react';
import FontIcon from 'react-md/FontIcons';
import SelectField from 'react-md/SelectFields';
import TextField from 'react-md/TextFields';
import { FloatingButton } from 'react-md/Buttons';

import FakePhone from '../FakePhone';

const addrTypes = ['Work', 'Home'];

export default function PhoneContactExample() {
  return (
    <div className="fake-phone-container">
      <FakePhone primary={true} iconLeft="arrow_back" iconRight="check">
        <section className="person-placeholder fab-container fab-right">
          <FontIcon className="person">person</FontIcon>
          <FloatingButton secondary>photo_camera</FloatingButton>
        </section>
        <form className="md-form">
          <TextField
            floatingLabel={false}
            icon={<FontIcon>person</FontIcon>}
            label="Name"
          />
          <div className="contact-row">
            <TextField
              floatingLabel={false}
              label="Phone"
              icon={<FontIcon>phone</FontIcon>}
              type="tel"
            />
            <SelectField
              menuItems={['Mobile'].concat(addrTypes)}
              placeholder="Mobile"
            />
          </div>
          <div className="contact-row">
            <TextField
              floatingLabel={false}
              label="Email"
              icon={<FontIcon>email</FontIcon>}
              type="email"
            />
            <SelectField
              menuItems={addrTypes}
              placeholder="Work"
            />
          </div>
          <div className="contact-row">
            <TextField
              label="Address"
              floatingLabel={false}
              icon={<FontIcon>place</FontIcon>}
            />
            <SelectField
              menuItems={addrTypes}
              placeholder="Home"
            />
          </div>
          <TextField
            label="Ringtone"
            floatingLabel={false}
            icon={<FontIcon>volume_up</FontIcon>}
          />
          <TextField
            label="Add note"
            floatingLabel={false}
            icon={<FontIcon>add</FontIcon>}
          />
        </form>
      </FakePhone>
    </div>
  );
}
