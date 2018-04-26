import React from 'react';
import { Button, Cell } from 'react-md';

const Contact = () => (
  <Cell component="section" size={4}>
    <h4 className="md-title">Contact</h4>
    <Button flat primary href="mailto:mlaursen03@gmail.com" iconChildren="mail">
      Mikkel Laursen
    </Button>
  </Cell>
);

export default Contact;
