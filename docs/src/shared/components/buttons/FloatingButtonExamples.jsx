import React from 'react';
import Button from 'react-md/lib/Buttons/Button';

const FloatingButtonExamples = () => (
  <div className="btn-example">
    <p>Floating buttons can be unstyled or styled with the primary/secondary color.</p>
    <Button floating>home</Button>
    <Button floating primary>share</Button>
    <Button floating secondary>favorite</Button>

    <p>Just like any other <code>FontIcon</code>, hopefully any font-icon library can be used.</p>
    <Button floating secondary iconClassName="fa fa-star-o" />

    <p>
      When a floating button is disabled, any styling will be overridden and they
      will not be clickable.
    </p>
    <Button floating primary disabled>favorite</Button>
    <Button floating secondary disabled>accessible</Button>
  </div>
);

export default FloatingButtonExamples;
