/* eslint-disable react/no-array-index-key */
import React, { PureComponent } from 'react';
import { DialogContainer } from 'react-md';
import loremIpsum from 'lorem-ipsum';

import Configuration from './Configuration';

const paragraphs = Array.from(Array(10)).map((_, i) => (
  <p key={i}>
    {loremIpsum({ units: 'paragraphs', count: 1 })}
  </p>
));

const contentProps = { id: 'scrolling-content-dialog-content' };

const KeyboardMessage = () => (
  <h5 tabIndex={0} className="no-tab-outline">
    This dialog can always be closed with the <code>ESC</code> key if there are no actions
  </h5>
);

export default class ScrollingContentAndSizing extends PureComponent {
  state = {
    title: true,
    footer: true,
    height: null,
    width: null,
    visible: false,
  };

  componentWillMount() {
    this.actions = [{
      label: 'Ok',
      primary: true,
      onClick: this.hide,
    }, {
      label: 'Cancel',
      secondary: true,
      onClick: this.hide,
    }];
  }

  show = () => {
    this.setState({ visible: true });
  };

  hide = () => {
    this.setState({ visible: false });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.show();
  };

  handleChange = (e) => {
    const { id, checked, value } = e.target;
    const key = id.substring(id.lastIndexOf('-') + 1);
    let keyValue = checked;
    if (value !== 'on') {
      keyValue = value.match(/[0-9]{0,3}(\.[0-9]{0,3})?(%|vh|vw|r?em|px)$/)
        ? value
        : parseFloat(value);
    }
    this.setState({ [key]: keyValue });
  };

  render() {
    const {
      title,
      footer,
      height,
      width,
      visible,
    } = this.state;
    return (
      <div>
        <Configuration onChange={this.handleChange} onSubmit={this.handleSubmit} />
        <DialogContainer
          id="scrolling-content-dialog"
          aria-describedby="scrolling-content-dialog-content"
          title={title ? 'Large Content Dialog' : null}
          visible={visible}
          onHide={this.hide}
          actions={footer ? this.actions : null}
          height={height}
          width={width}
          contentProps={contentProps}
        >
          {!footer ? <KeyboardMessage /> : null}
          {paragraphs}
        </DialogContainer>
      </div>
    );
  }
}
