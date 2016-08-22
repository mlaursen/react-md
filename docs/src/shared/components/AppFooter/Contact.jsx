import React, { PureComponent } from 'react';
import FontIcon from 'react-md/lib/FontIcons';
import FlatButton from 'react-md/lib/Buttons/FlatButton';

export default class Contact extends PureComponent {
  render() {
    return (
      <div className="contact">
        <h4 className="md-title">Contact</h4>
        <FlatButton primary label="Mikkel Laursen" href="mailto:mlaursen03@gmail.com" type={null}>
          <FontIcon>mail</FontIcon>
        </FlatButton>
      </div>
    );
  }
}
