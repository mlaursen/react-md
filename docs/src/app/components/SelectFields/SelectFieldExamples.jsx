import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import SelectField from 'react-md/SelectFields';
import Card, { CardText, CardTitle } from 'react-md/Cards';
import FontIcon from 'react-md/FontIcons';
import TextField from 'react-md/TextFields';

import states from './states';

export default class SelectFieldExamples extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    return (
      <Card>
        <CardTitle title="Edit Shipping info" />
        <CardText component="form" className="md-form">
          <TextField
            label="Full name"
            floatingLabel={false}
            defaultValue="Ali Conners"
            icon={<FontIcon>person</FontIcon>}
          />
          <TextField
            label="Street name"
            floatingLabel={false}
            defaultValue="2000 Main Street"
            icon={<FontIcon>place</FontIcon>}
          />
          <div className="addr-inline">
            <TextField
              label="City"
              floatingLabel={false}
              defaultValue="Hoboken"
              className="city"
            />
            <SelectField
              dense
              defaultValue={states[0].abbreviation}
              menuItems={states}
              itemLabel="abbreviation"
              itemValue="abbreviation"
            />
            <TextField
              label="Zip"
              floatingLabel={false}
              defaultValue="94122"
              className="zip"
              type="zip"
            />
          </div>
          <TextField
            label="Email"
            floatingLabel={false}
            type="email"
            icon={<FontIcon>email</FontIcon>}
          />
        </CardText>
      </Card>
    );
  }
}
