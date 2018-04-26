import React from 'react';
import { Button, Cell } from 'react-md';
import { GITHUB_URL } from 'constants/application';

const Contribute = () => (
  <Cell component="section" size={8}>
    <h4 className="md-title">Contributing</h4>
    <p className="md-body-2">
      This project is currently developed by a single person. Feel free
      to contribute!
    </p>
    <Button flat secondary href={GITHUB_URL} iconClassName="fa fa-github">
      Github
    </Button>
  </Cell>
);

export default Contribute;
