import React, { PureComponent, PropTypes } from 'react';
import FocusContainer from 'react-md/lib/Helpers/FocusContainer';
import TextField from 'react-md/lib/TextFields';
import DialogFooter from 'react-md/lib/Dialogs/DialogFooter';

export default class ContainedFormExample extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
  };

  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <FocusContainer
        focusOnMount
        component="form"
        className="md-form"
        onSubmit={function noSubmit(e) { e.preventDefault(); }}
        aria-labelledby="contained-form-example"
      >
        <TextField id="look" label="Look at me!" />
        <TextField id="dontLook" label="But not me.." disabled rows={4} />
        <DialogFooter
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
