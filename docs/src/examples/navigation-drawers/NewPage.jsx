import React, { PureComponent, PropTypes } from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import Button from 'react-md/lib/Buttons';
import { setOverflow } from 'react-md/lib/utils';

import './_new-page.scss';

export default class NewPage extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
  };

  constructor(props) {
    super(props);

    this.state = { isOpen: false };
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.state.isOpen === nextState.isOpen) { return; }

    setTimeout(() => setOverflow(nextState.isOpen), 100);
  }

  openDemo = (e) => {
    const d = document.body || document.documentElement;
    const { scrollTop } = d;
    d.scrollTop = 0;
    const { pageX, pageY } = e.changedTouches ? e.changedTouches[0] : e;
    const style = {
      transformOrigin: `${pageX}px ${pageY}px`,
    };

    this.setState({ isOpen: !this.state.isOpen, scrollTop, style });
  };

  closeDemo = () => {
    const d = document.body || document.documentElement;
    d.scrollTop = this.state.scrollTop;
    this.setState({ isOpen: false });
  };

  render() {
    let demo;
    if (this.state.isOpen) {
      demo = (
        <div className="new-page-demo full-page" key={demo} style={this.state.style}>{this.props.children}</div>
      );
    }
    return (
      <CSSTransitionGroup
        transitionName="md-dialog"
        transitionEnterTimeout={300}
        transitionLeaveTimeout={300}
        component="section"
        className="new-page-demo-container"
      >
        <Button raised label="Open the NavigationDrawer demo" onClick={this.openDemo} />
        {demo}
      </CSSTransitionGroup>
    );
  }
}
