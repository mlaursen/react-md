import React, { Component } from 'react';
import { Autocomplete, Button, TextField } from 'react-md';
import { pastries } from 'constants/sampleData';

export default class InlineAutocomplete extends Component {
  state = { quantity: 0, pastry: '' };

  handleSubmit = (e) => {
    e.preventDefault();
  };

  selectPastry = (pastry) => {
    this.setState({ pastry });
  };

  updateQuantity = (quantity) => {
    this.setState({ quantity });
  };

  /**
   * Some browsers don't respect the `type="number"`
   */
  fixQuantity = () => {
    const quantity = Math.min(50, Math.max(0, parseInt(this.state.quantity, 10)));
    if (this.state.quantity !== quantity) {
      this.setState({ quantity });
    }
  };

  render() {
    const { pastry, quantity } = this.state;

    return (
      <form
        id="never-gonna-make-you-up-form"
        name="never-gonna-bake-you-up"
        onSubmit={this.handleSubmit}
        className="md-grid"
      >
        <h3 className="md-title md-cell md-cell--12">
          Never Gonna Bake You Up
        </h3>
        <Autocomplete
          id="bakery-pastry"
          label="Specify your pastry"
          placeholder={pastries[0]}
          inline
          required
          value={pastry}
          data={pastries}
          className="md-cell md-cell--6 md-cell--4-phone"
          errorText="A pastry is required!"
          onBlur={this.handleBlur}
          onChange={this.selectPastry}
          onAutocomplete={this.selectPastry}
        />
        <TextField
          id="bakery-pastry-amount"
          type="number"
          label="Quantity"
          placeholder="12"
          min={0}
          max={50}
          required
          value={quantity}
          className="md-cell md-cell--6 md-cell--4-phone"
          onBlur={this.fixQuantity}
          onChange={this.updateQuantity}
        />
        <Button
          type="submit"
          raised
          secondary
          className="md-cell--right md-cell--bottom"
          disabled={quantity < 1 || quantity > 50 || !pastry}
        >
          Order
        </Button>
      </form>
    );
  }
}
