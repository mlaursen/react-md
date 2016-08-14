import React from 'react';
import { FloatingButton } from 'react-md/lib/Buttons';

export default () => (
  <div className="floating-btn-examples">
    <p>Floating buttons can be unstyled or styled with the primary/secondary color.</p>
    <FloatingButton>home</FloatingButton>
    <FloatingButton primary>share</FloatingButton>
    <FloatingButton secondary>favorite</FloatingButton>

    <p>Just like any other <code>FontIcon</code>, hopefully any font-icon library can be used.</p>
    <FloatingButton secondary iconClassName="fa fa-star-o" />

    <p>
      When a floating button is disabled, any styling will be overridden and they
      will not be clickable.
    </p>
    <FloatingButton primary disabled>favorite</FloatingButton>
    <FloatingButton secondary disabled>accessible</FloatingButton>
  </div>
);
