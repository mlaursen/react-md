import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';

import { IconButton, FontIcon } from '../../../src/js';

export default class EditableSelectField extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  static propTypes = {
    focused: PropTypes.bool.isRequired,
    value: PropTypes.string.isRequired,
  };

  render() {
    const { focused, value, ...props } = this.props;
    return (
      <label
        className={classnames('md-select-field-container', {
          'focus': focused,
          'segmented': isPropEnabled(props, 'segmented'),
        })}
        >
        <input
          type="text"
          name={name}
          value={this.getLabel()}
          readOnly={!isPropEnabled(props, 'editable')}
          className="md-select-field"
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onClick={this.toggleMenu}
          handleKeyUp={this.handleInputKeyUp}
          {...props}
        />
        <FontIcon>arrow_drop_down</FontIcon>
      </label>
    );
  }
}
