import React from 'react';
import { Button } from 'react-md';

const Contact = () => (
  <section className="md-cell md-cell--4">
    <h4 className="md-title">Contact</h4>
    <Button flat primary href="mailto:mlaursen03@gmail.com" iconChildren="mail">
      Mikkel Laursen
    </Button>
  </section>
);

export default Contact;
