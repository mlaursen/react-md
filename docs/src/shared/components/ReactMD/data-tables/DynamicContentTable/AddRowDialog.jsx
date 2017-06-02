import React, { PureComponent, PropTypes } from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import Button from 'react-md/lib/Buttons/Button';
import Dialog from 'react-md/lib/Dialogs';
import Toolbar from 'react-md/lib/Toolbars';

import FormGroup from './FormGroup';

export default class AddRowDialog extends PureComponent {
  static propTypes = {
    visible: PropTypes.bool.isRequired,
    addRows: PropTypes.func.isRequired,
    closeDialog: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = { count: 1 };
  }

  addGroup = () => {
    this.setState({ count: this.state.count + 1 });
  };

  closeDialog = () => {
    this.props.closeDialog();
    this.setState({ count: 1 });
  };

  handleSubmit = (e) => {
    this.props.addRows(e);
    this.setState({ count: 1 });
  };

  render() {
    const { visible } = this.props;
    const submit = <Button type="submit" flat>Submit</Button>;

    const groups = [...new Array(this.state.count)].map((_, i) => (
      <FormGroup key={i} index={i} />
    ));

    return (
      <Dialog
        id="add-row-dialog"
        aria-label="Create a new row"
        visible={visible}
        onHide={this.closeDialog}
        fullPage
      >
        <CSSTransitionGroup
          transitionName="md-cross-fade"
          transitionEnterTimeout={300}
          transitionLeave={false}
          component="form"
          onSubmit={this.handleSubmit}
          className="md-text-container md-toolbar-relative"
          id="new-nutrition-row-form"
        >
          <Toolbar
            nav={<Button icon onClick={this.closeDialog}>arrow_back</Button>}
            title="Create new row"
            fixed
            colored
            actions={submit}
          />
          {groups}
        </CSSTransitionGroup>
        <Button floating fixed onClick={this.addGroup} primary>add</Button>
      </Dialog>
    );
  }
}
