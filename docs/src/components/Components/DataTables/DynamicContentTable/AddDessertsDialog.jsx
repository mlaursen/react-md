/* eslint-disable react/no-array-index-key */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import Button from 'react-md/lib/Buttons/Button';
import DialogContainer from 'react-md/lib/Dialogs';
import Toolbar from 'react-md/lib/Toolbars';

import FormGroup from './FormGroup';

export default class AddDessertsDialog extends PureComponent {
  static propTypes = {
    visible: PropTypes.bool.isRequired,
    addDesserts: PropTypes.func.isRequired,
    onHide: PropTypes.func.isRequired,
  };

  state = { count: 1 };

  componentWillReceiveProps(nextProps) {
    if (this.props.visible && this.props.visible !== nextProps.visible) {
      this.setState({ count: 1 });
    }
  }

  addDessert = () => {
    this.setState({ count: this.state.count + 1 });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.addDesserts(e);
  };

  render() {
    const { visible, onHide } = this.props;

    const groups = [...new Array(this.state.count)].map((_, i) => (
      <FormGroup key={i} index={i} />
    ));

    return (
      <DialogContainer
        id="add-desserts-dialog"
        aria-labelledby="add-desserts-dialog-title"
        visible={visible}
        onHide={onHide}
        fullPage
      >
        <CSSTransitionGroup
          id="add-dessert-form"
          component="form"
          onSubmit={this.handleSubmit}
          className="md-text-container md-toolbar--relative"
          transitionName="md-cross-fade"
          transitionEnterTimeout={300}
          transitionLeave={false}
        >
          <Toolbar
            nav={<Button icon onClick={onHide}>arrow_back</Button>}
            title="Create a new Dessert"
            titleId="add-desserts-dialog-title"
            fixed
            colored
            actions={<Button type="submit" flat>Submit</Button>}
          />
          {groups}
        </CSSTransitionGroup>
        <Button floating fixed onClick={this.addDessert} primary>add</Button>
      </DialogContainer>
    );
  }
}
