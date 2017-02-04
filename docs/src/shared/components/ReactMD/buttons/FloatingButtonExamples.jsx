import React from 'react';
import Button from 'react-md/lib/Buttons/Button';

const FloatingButtonExamples = () => (
  <div className="btn-example">
    <h5>Theme Examples</h5>
    <Button floating>home</Button>
    <Button floating primary>share</Button>
    <Button floating secondary iconClassName="fa fa-star-o" />
    <h5>Disabled Examples</h5>
    <Button floating primary disabled>favorite</Button>
    <Button floating secondary disabled>close</Button>
  </div>
);

export default FloatingButtonExamples;
