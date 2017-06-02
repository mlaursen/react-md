import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';

import Autocomplete from 'react-md/lib/Autocompletes';
import TextField from 'react-md/lib/TextFields';
import Button from 'react-md/lib/Buttons';

import pastries from 'constants/pastries';
import { addNotification } from 'actions/notifications';


@connect(() => ({}), { addNotification })
export default class InlineAutocomplete extends PureComponent {
  static propTypes = {
    addNotification: PropTypes.func.isRequired,
  };

  state = { errorText: '', quantity: 1, pastry: '' };

  _handleSubmit = (e) => {
    e.preventDefault();

    const { quantity, pastry } = this.state;
    if (!pastry || !quantity) {
      this.setState({
        errorText: 'A pastry is required!',
      });

      return;
    }

    this.props.addNotification({
      text: `You have ordered ${quantity} '${pastry}'`,
    });
  };

  _handleBlur = (e) => {
    let errorText = '';
    if (!e.target.value) {
      errorText = 'A pastry is required!';
    }

    this.setState({ errorText, pastry: e.target.value });
  };

  _updateQuantity = (value) => {
    this.setState({ quantity: value });
  };

  _fixQuantity = () => {
    this.setState({ quantity: Math.min(50, Math.max(1, this.state.quantity)) });
  };

  _selectPastry = (pastry) => {
    this.setState({ pastry });
  };

  render() {
    const { quantity } = this.state;
    return (
      <form onSubmit={this._handleSubmit} className="never-gonna-bake-you-up-form md-grid">
        <h3 className="md-title md-cell md-cell--12">Never Gonna Bake You Up</h3>
        <Autocomplete
          id="pastry"
          label="Specify your pastry"
          data={pastries}
          className="md-cell md-cell--6 md-cell--4-phone"
          inline
          required
          onBlur={this._handleBlur}
          errorText={this.state.errorText}
          onAutocomplete={this._selectPastry}
          onChange={this._selectPastry}
        />
        <TextField
          id="pastryAmount"
          type="number"
          label="Quantity"
          min={1}
          max={50}
          className="md-cell md-cell--6 md-cell--4-phone"
          value={quantity}
          onChange={this._updateQuantity}
          onBlur={this._fixQuantity}
        />
        <Button raised type="submit" secondary className="md-cell--right md-cell--bottom">
          Order
        </Button>
      </form>
    );
  }
}
