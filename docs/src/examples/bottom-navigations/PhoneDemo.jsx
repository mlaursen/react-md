import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import shallowCompare from 'react-addons-shallow-compare';
import classnames from 'classnames';
import Paper from 'react-md/lib/Papers';
import { isTouchDevice } from 'react-md/lib/utils';

import PhoneToolbar from './PhoneToolbar';

export default class PhoneDemo extends Component {
  constructor(props) {
    super(props);

    this.state = { scrollTop: 0 };
  }

  static propTypes = {
    inset: PropTypes.bool,
    className: PropTypes.string,
    children: PropTypes.node,
    bottomNav: PropTypes.object,
  };

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  componentDidMount() {
    if (isTouchDevice()) {
      (document.documentElement || document.body).addEventListener('touchstart', this.preventDefault);
    }
  }

  componentWillUnMount() {
    if (isTouchDevice()) {
      (document.documentElement || document.body).removeEventListener('touchstart', this.preventDefault);
    }
  }

  /**
   * Need to override the window touch event to prevent the bottom nav from handling
   * touches unless we are touching in the phone-size container.
   */
  preventDefault = (e) => {
    let target = e.target;
    while (target && target.parentNode) {
      if (target.classList && target.classList.contains('phone-size-container')) {
        return;
      }

      target = target.parentNode;
    }

    e.stopPropagation();
  };

  startScrollJacking = () => {
    window.addEventListener('wheel', this.emulateMobileScroll);
    window.addEventListener('mousewheel', this.emulateMobileScroll);
  };

  stopScrollJacking = () => {
    window.removeEventListener('wheel', this.emulateMobileScroll);
    window.removeEventListener('mousewheel', this.emulateMobileScroll);
  };

  emulateMobileScroll = (e) => {
    e.preventDefault();
    const node = findDOMNode(this).querySelector('.demo-content');
    const scrollTop = Math.max(0, Math.min(node.scrollTop + e.deltaY, node.scrollHeight));
    const heightDiff = node.scrollHeight - node.offsetHeight;
    if (this.state.scrollTop >= heightDiff && scrollTop >= heightDiff) {
      return;
    }

    node.scrollTop = scrollTop;

    // ONLY FOR DEMO HACKING ONLY
    // BAD BAD BAD
    const dynamic = this.props.bottomNav.props.dynamic;
    if (dynamic && this.state.scrollTop < scrollTop) {
      this.props.bottomNav.setState({ visible: false });
    } else if (dynamic && this.state.scrollTop > scrollTop) {
      this.props.bottomNav.setState({ visible: true });
    }

    this.setState({ scrollTop });
  };

  render() {
    const { children, inset, className } = this.props;

    let events;
    if (!isTouchDevice()) {
      events = {
        onMouseOver: this.startScrollJacking,
        onMouseLeave: this.stopScrollJacking,
      };
    } else {
      events = {};
    }

    return (
      <Paper
        className={classnames('phone-size-container', className, {
          'noscroll': !isTouchDevice(),
        })}
        {...events}
      >
        <section className="demo-content">
          <PhoneToolbar inset={inset} />
          {children}
        </section>
      </Paper>
    );
  }
}
