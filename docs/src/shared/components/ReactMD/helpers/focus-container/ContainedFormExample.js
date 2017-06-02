import React, { PureComponent, PropTypes } from 'react';
import FocusContainer from 'react-md/lib/Helpers/FocusContainer';
import TextField from 'react-md/lib/TextFields';
import DialogFooter from 'react-md/lib/Dialogs/DialogFooter';
import Button from 'react-md/lib/Buttons/Button';

export default class ContainedFormExample extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
  };

  constructor(props) {
    super(props);

    this.state = {};
  }

  _disableFocusTrap = () => {
    this.setState({ containFocus: false });
  };

  render() {
    return (
      <FocusContainer
        focusOnMount
        component="form"
        className="md-grid"
        onSubmit={function noSubmit(e) { e.preventDefault(); }}
        aria-labelledby="contained-form-example"
        containFocus={this.state.containFocus}
      >
        <TextField id="look" label="Look at me!" className="md-cell md-cell--12" />
        <TextField id="dontLook" label="But not me.." disabled rows={4} className="md-cell md-cell--12" />
        <p className="md-cell md-cell--12">
          The keyboard focus containment can be disabled by clicking the following button.
        </p>
        <Button onClick={this._disableFocusTrap} raised primary>Let me off Mr. Bones Wild Ride!</Button>
        <DialogFooter
          className="md-cell md-cell--12"
          actions={[{
            label: 'Submit',
            type: 'submit',
          }, {
            label: 'Cancel',
            disabled: true,
          }]}
        />
      </FocusContainer>
    );
  }
}
