import React from 'react';
import TransitionGroup from 'react-addons-transition-group';

import DatePicker from './DatePicker';
import Height from '../Transitions';

export default function CalendarInline({ isOpen, ...props }) {
  return (
    <TransitionGroup>
      {isOpen &&
        <Height transitionEnterTimeout={150} transitionLeaveTimeout={150}>
          <DatePicker {...props} />
        </Height>
      }
    </TransitionGroup>
  );
}
