import React from 'react';
import DatePicker from 'react-md/lib/Pickers/DatePickerContainer';

// or
// import { DatePicker } from 'react-md/lib/Pickers';

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

const today = new Date();
const LocaleExamples = () => (
  <div className="md-grid no-padding">
    <DatePicker
      id="local-en-US"
      label="Select a date"
      locales="en-US"
      defaultValue={today}
      className="md-cell"
    />
    <DatePicker
      id="locale-da-DK"
      label="Vælg en aftale dato"
      locales="da-DK"
      defaultValue={today}
      className="md-cell"
    />
    <DatePicker
      id="localeBrowser"
      label="Pretend Translate to Browser Locale"
      defaultValue={today}
      className="md-cell"
    />
  </div>
);

export default LocaleExamples;
