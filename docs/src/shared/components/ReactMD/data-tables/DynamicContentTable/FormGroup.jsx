import React, { PropTypes } from 'react';
import SelectField from 'react-md/lib/SelectFields';
import TextField from 'react-md/lib/TextFields';
import SelectionControl from 'react-md/lib/SelectionControls/SelectionControl';

const TYPES = ['Ice Cream', 'Pastry', 'Other'];


const FormGroup = ({ index }) => (
  <section className="md-grid" aria-labelledby={`new-row-group-${index + 1}`}>
    <h2 id={`new-row-group-${index + 1}`} className="md-cell md-cell--12">New Row {index + 1}</h2>
    <TextField
      id={`dessert-name-${index}`}
      name={`name-${index}`}
      label="Dessert"
      customSize="title"
      defaultValue="Magic"
      placeholder="Ice Cream"
      className="md-cell"
    />
    <SelectField
      id={`dessert-type-${index}`}
      name={`type-${index}`}
      label="Type"
      menuItems={TYPES}
      defaultValue="Other"
      className="md-cell md-cell--bottom"
    />
    <TextField
      id={`dessert-calories-${index}`}
      name={`calories-${index}`}
      type="number"
      label="Calories"
      defaultValue={172}
      placeholder="172"
      className="md-cell md-cell--bottom"
    />
    <TextField
      id={`dessert-fat-${index}`}
      name={`fat-${index}`}
      type="number"
      label="Fat"
      defaultValue={3}
      placeholder="3"
      className="md-cell"
    />
    <TextField
      id={`dessert-carbs-${index}`}
      name={`carbs-${index}`}
      type="number"
      label="Carbs"
      defaultValue={30}
      placeholder="30"
      className="md-cell"
    />
    <TextField
      id={`dessert-protein-${index}`}
      name={`protein-${index}`}
      type="number"
      label="Protein"
      defaultValue={12}
      placeholder="12"
      className="md-cell"
    />
    <TextField
      id={`dessert-sodium${index}`}
      name={`sodium-${index}`}
      type="number"
      label="Sodium"
      defaultValue={382}
      placeholder="382"
      className="md-cell"
    />
    <TextField
      id={`dessert-calcium-${index}`}
      name={`calcium-${index}`}
      type="number"
      label="Calcium"
      defaultValue={3}
      placeholder="3"
      className="md-cell"
    />
    <TextField
      id={`dessert-iron-${index}`}
      name={`iron-${index}`}
      type="number"
      label="Iron"
      defaultValue={9}
      placeholder="9"
      className="md-cell"
    />
    <SelectionControl
      id={`dessert-random-placement-${index}`}
      name={`random-placement-${index}`}
      type="checkbox"
      label="Place randomly in table?"
      defaultChecked
      className="md-cell md-cell--12"
    />
  </section>
);

FormGroup.propTypes = {
  index: PropTypes.number.isRequired,
};

export default FormGroup;
