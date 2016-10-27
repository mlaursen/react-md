import React from 'react';
import Button from 'react-md/lib/Buttons/Button';

import { GITHUB_URL } from 'constants/application';

const Contribute = () => (
  <section className="md-cell md-cell--8">
    <h4 className="md-title">Contributing</h4>
    <p className="md-body-2">
      This project is currently developed by a single person. Feel free
      to contribute!
    </p>
    <Button flat secondary label="Github" href={GITHUB_URL} iconClassName="fa fa-github" />
  </section>
);

export default Contribute;
