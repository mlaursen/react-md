import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

import { IconButton } from '../';

export default class CardExpander extends Component {
  constructor(props) {
    super(props);
  }

  static contextTypes = {
    isExpanded: PropTypes.bool.isRequired,
    onExpandClick: PropTypes.func.isRequired,
    iconClassName: PropTypes.string.isRequired,
    iconChildren: PropTypes.string,
  };

  render() {
    const { isExpanded, onExpandClick, iconClassName, iconChildren } = this.context;

    return <IconButton className={classnames('md-card-expander', { 'flipped': isExpanded })} onClick={onExpandClick} iconClassName={iconClassName} children={iconChildren} />;
  }
}
