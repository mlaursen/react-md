import React, { PropTypes } from 'react';
import Button from 'react-md/lib/Buttons/Button';

const Contact = () => (
  <section className="md-cell md-cell--4">
    <h4 className="md-title">Contact</h4>
    <Button flat primary label="Mikkel Laursen" href="mailto:mlaursen03@gmail.com">mail</Button>
  </section>
);

export default Contact;
