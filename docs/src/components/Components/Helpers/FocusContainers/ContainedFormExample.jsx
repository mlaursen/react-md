import React, { PureComponent } from 'react';
import {
  Button,
  CardActions,
  FocusContainer,
  TextField,
} from 'react-md';

export default class ContainedFormExample extends PureComponent {
  state = { containFocus: true };

  disableFocusTrap = () => {
    this.setState({ containFocus: false });
  };

  handleSubmit = (e) => {
    e.preventDefault();
  };

  render() {
    const { containFocus } = this.state;
    return (
      <FocusContainer
        focusOnMount
        containFocus={containFocus}
        component="form"
        className="md-grid"
        onSubmit={this.handleSubmit}
        aria-labelledby="contained-form-example"
      >
        <TextField id="look-at-me" label="Look at me!" className="md-cell md-cell--12" />
        <TextField id="look-at-me-not" label="But not me.." disabled rows={4} className="md-cell md-cell--12" />
        <p className="md-cell md-cell--12">
          The keyboard focus containment can be disabled by clicking the following button.
        </p>
        <Button onClick={this.disableFocusTrap} raised primary>Let me off Mr. Bones Wild Ride!</Button>
        <CardActions className="md-cell md-cell--12">
          <Button flat type="submit" className="md-cell--right">Submit</Button>
          <Button flat type="reset" disabled>Cancel</Button>
        </CardActions>
      </FocusContainer>
    );
  }
}
