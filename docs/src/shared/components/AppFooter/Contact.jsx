import React, { PureComponent } from 'react';
import FontIcon from 'react-md/lib/FontIcons';
import Button from 'react-md/lib/Buttons';

export default class Contact extends PureComponent {
  render() {
    return (
      <div className="contact">
        <h4 className="md-title">Contact</h4>
        <Button primary label="Mikkel Laursen" href="mailto:mlaursen03@gmail.com" flat>
          <FontIcon>mail</FontIcon>
        </Button>
      </div>
    );
  }
}
