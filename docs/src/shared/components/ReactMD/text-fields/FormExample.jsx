import React from 'react';
import TextField from 'react-md/lib/TextFields';
import Button from 'react-md/lib/Buttons/Button';

import PhoneSizeDemo from 'containers/PhoneSizeDemo';
import './_application.scss';

const FormExample = () => (
  <PhoneSizeDemo
    title="Application"
    iconLeft="arrow_back"
    toolbarActions={<Button icon>more_vert</Button>}
  >
    <form className="md-grid">
      <TextField
        id="applicationTitle"
        label="Title"
        defaultValue="Vintage 50's Dress"
        customSize="title"
        className="md-cell md-cell--12"
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
        className="price md-cell md-cell--1-phone md-cell--3"
      />
      <TextField
        id="applicationLocation"
        label="Location (optional)"
        defaultValue="Fremont Bridge"
        className="location md-cell md-cell--3-phone md-cell--5-tablet md-cell--9-desktop"
      />
      <TextField
        id="applicationDescription"
        label="Description"
        rows={2}
        defaultValue="Unique and rare dress from 1952. Made out of cotton with front pockets. Sleeveless with button closures."
        className="md-cell md-cell--12"
      />
    </form>
  </PhoneSizeDemo>
);

export default FormExample;
