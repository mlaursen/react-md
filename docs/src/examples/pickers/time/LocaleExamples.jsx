import React from 'react';
import TimePicker from 'react-md/lib/Pickers/TimePickerContainer';

// or
// import { TimePicker } from 'react-md/lib/Pickers';

if (__CLIENT__ && !global.Intl) {
  require.ensure([], require => {
    const lang = typeof window !== 'undefined'
      ? window.navigator.userLanguage || window.navigator.language
      : 'en-US';

    require('intl');
    require('intl/locale-data/jsonp/en-US');
    require('intl/locale-data/jsonp/da-DK');

    if (['en-US', 'da-DK'].indexOf(lang) === -1) {
      require(`intl/locale-data/jsonp/${lang}`);
    }
  });
}

const todayAt1522 = new Date();
todayAt1522.setHours(15);
todayAt1522.setMinutes(22);
const LocaleExamples = () => (
  <div>
    <TimePicker
      label="Select a date"
      locales="en-US"
      defaultValue={todayAt1522}
      adjustMinWidth
    />
    <TimePicker
      label="Vælg en aftale dato"
      locales="da-DK"
      defaultValue={todayAt1522}
      adjustMinWidth
    />
    <TimePicker
      label="Pretend Translate to Browser Locale"
      defaultValue={todayAt1522}
      adjustMinWidth
    />
  </div>
);

export default LocaleExamples;
