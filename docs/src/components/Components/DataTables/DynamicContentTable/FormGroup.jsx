import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import SelectField from 'react-md/lib/SelectFields';
import TextField from 'react-md/lib/TextFields';
import SelectionControl from 'react-md/lib/SelectionControls/SelectionControl';
import loremIpsum from 'lorem-ipsum';

import { randomInt } from 'utils/random';

const TYPES = ['Ice Cream', 'Pastry', 'Other'];

export default class FormGroup extends PureComponent {
  static propTypes = {
    index: PropTypes.number.isRequired,
  };

  state = {};

  componentWillMount() {
    this.setState({
      dessert: loremIpsum({ count: randomInt({ min: 1, max: 5 }), units: 'words' }),
      type: TYPES[randomInt({ min: 0, max: TYPES.length - 1 })],
      calories: randomInt({ min: 150, max: 800 }),
      fat: randomInt({ min: 0, max: 52 }),
      carbs: randomInt({ min: 0, max: 118 }),
      protein: randomInt({ min: 0, max: 23 }),
      sodium: randomInt({ min: 80, max: 745 }),
      calcium: randomInt({ min: 0, max: 12 }),
      iron: randomInt({ min: 0, max: 80 }),
    });
  }

  render() {
    const { index } = this.props;
    const {
      dessert,
      type,
      calories,
      fat,
      carbs,
      protein,
      sodium,
      calcium,
      iron,
    } = this.state;

    // Ideally this would be a `<formgroup>` instead of a `<section>`, but
    // `<formgroup>` doesn't support `display: flex`
    return (
      <section className="md-grid" aria-labelledby={`dessert-group-${index + 1}-title`}>
        <h2 id={`dessert-group-${index + 1}-title`} className="md-cell md-cell--12">
          {`New Dessert ${index + 1}`}
        </h2>
        <TextField
          id={`dessert-name-${index}`}
          name={`name-${index}`}
          label="Dessert"
          customSize="title"
          defaultValue={dessert}
          placeholder="Ice Cream"
          className="md-cell"
        />
        <SelectField
          id={`dessert-type-${index}`}
          name={`type-${index}`}
          label="Type"
          menuItems={TYPES}
          defaultValue={type}
          className="md-cell md-cell--bottom"
        />
        <TextField
          id={`dessert-calories-${index}`}
          name={`calories-${index}`}
          type="number"
          label="Calories"
          defaultValue={calories}
          placeholder="3"
          className="md-cell md-cell--bottom"
        />
        <TextField
          id={`dessert-fat-${index}`}
          name={`fat-${index}`}
          type="number"
          label="Fat"
          defaultValue={fat}
          placeholder="3"
          className="md-cell"
        />
        <TextField
          id={`dessert-carbs-${index}`}
          name={`carbs-${index}`}
          type="number"
          label="Carbs"
          defaultValue={carbs}
          placeholder="3"
          className="md-cell"
        />
        <TextField
          id={`dessert-protein-${index}`}
          name={`protein-${index}`}
          type="number"
          label="Protein"
          defaultValue={protein}
          placeholder="3"
          className="md-cell"
        />
        <TextField
          id={`dessert-sodium-${index}`}
          name={`sodium-${index}`}
          type="number"
          label="Sodium"
          defaultValue={sodium}
          placeholder="3"
          className="md-cell"
        />
        <TextField
          id={`dessert-calcium-${index}`}
          name={`calcium-${index}`}
          type="number"
          label="Calcium"
          defaultValue={calcium}
          placeholder="3"
          className="md-cell"
        />
        <TextField
          id={`dessert-iron-${index}`}
          name={`iron-${index}`}
          type="number"
          label="Iron"
          defaultValue={iron}
          placeholder="3"
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
  }
}
