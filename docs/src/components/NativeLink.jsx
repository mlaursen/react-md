import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

class NativeLink extends PureComponent {
  static propTypes = {
    href: PropTypes.string.isRequired,
    history: PropTypes.object,
    location: PropTypes.object,
    children: PropTypes.node,
    routes: PropTypes.array,
    match: PropTypes.object,
    staticContext: PropTypes.object,
  };

  handleClick = (e) => {
    // When using native links, need to prevent the default behavior and use react-router's history
    // instead so there isn't janky scrolling
    e.preventDefault();
    const { history } = this.props;

    if (this.link) {
      history.push(this.link.href.replace(window.location.origin, ''));
    }
  };

  render() {
    const {
      href,
      children,
      location,
      history,
      routes,
      match,
      staticContext,
      ...props
    } = this.props;

    return (
      <a
        {...props}
        href={href}
        ref={(link) => { this.link = link; }}
        onClick={this.handleClick}
      >
        {children}
      </a>
    );
  }
}

export default withRouter(NativeLink);
