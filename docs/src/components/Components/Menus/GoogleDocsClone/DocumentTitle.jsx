import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ResizeObserver from 'react-md/lib/Helpers/ResizeObserver';
import TextField from 'react-md/lib/TextFields';

import StarDocument from './StarDocument';
import MoveDocument from './MoveDocument';

const BUTTON_SIZE = 40;
const ACCOUNT_SIZE = 200; // really 165, but adding some additional spacing

export default class DocumentTitle extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
  };

  state = { max: 375 };

  setDiv = (div) => {
    this.div = div;
    this.calcMaxSize();
  };

  /**
   * Want the size to be the width of the entire toolbar, but subtracting the nav button + margins,
   * the star/move document buttons, and the Google account thing.
   */
  calcMaxSize = () => {
    if (!this.div) {
      return;
    }

    const toolbar = this.div.parentNode;
    this.setState({ max: toolbar.offsetWidth - (BUTTON_SIZE * 4) - ACCOUNT_SIZE });
  };

  render() {
    const { className } = this.props;
    const { max } = this.state;
    return (
      <div className="menus__google-docs__title" ref={this.setDiv}>
        <ResizeObserver onResize={this.calcMaxSize} />
        <TextField
          id="document-title"
          placeholder="Untitled Document"
          block
          customSize="google-docs-title"
          className={className}
          resize={{ max }}
        />
        <StarDocument />
        <MoveDocument />
      </div>
    );
  }
}
