import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Button, SVGIcon } from 'react-md';

import arrowBack from 'icons/arrow_back.svg';

@withRouter
export default class BackButton extends PureComponent {
  static propTypes = {
    onClick: PropTypes.func,
    iconEl: PropTypes.element,
    match: PropTypes.object,
    history: PropTypes.object,
    location: PropTypes.object,
    staticContext: PropTypes.object,
  };

  static defaultProps = {
    iconEl: <SVGIcon use={arrowBack.url} />,
    fixed: true,
    floating: true,
    secondary: true,
  };

  handleClick = (e) => {
    if (this.props.onClick) {
      this.props.onClick(e);
    }

    this.props.history.goBack();
  };

  render() {
    const { match, history, location, staticContext, ...props } = this.props;
    return <Button {...props} onClick={this.handleClick} />;
  }
}
