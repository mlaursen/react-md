import React from 'react';
import TextField from 'react-md/lib/TextFields';
import Button from 'react-md/lib/Buttons';

import PhoneSize from 'components/PhoneSize';
import './_application.scss';

const FormExample = () => (
  <PhoneSize
    title="Application"
    iconLeft="arrow_back"
    actionsRight={<Button icon className="mla">more_vert</Button>}
  >
    <form className="md-form md-form--padded">
      <TextField
        id="applicationTitle"
        label="Title"
        defaultValue="Vintage 50's Dress"
        customSize="title"
        required
      />
      <TextField
        id="applicationPrice"
        label="Price"
        type="number"
        defaultValue={10}
        step={0.01}
        min={0}
        pattern="^\d+(\.|\,)\d{2}"
        className="price"
      />
      <TextField
        id="applicationLocation"
        label="Location (optional)"
        defaultValue="Fremont Bridge"
        className="location"
      />
      <TextField
        id="applicationDescription"
        label="Description"
        rows={2}
        defaultValue="Unique and rare dress from 1952. Made out of cotton with front pockets. Sleeveless with button closures."
      />
    </form>
  </PhoneSize>
);

export default FormExample;
