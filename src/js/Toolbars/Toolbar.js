import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';

import { isPropEnabled, mergeClassNames } from '../utils';

export default class Toolbar extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {};
  }

  static propTypes = {
    className: PropTypes.string,
    primary: PropTypes.bool,
    secondary: PropTypes.bool,
    menuButton: PropTypes.node.isRequired,
    title: PropTypes.string,
    children: PropTypes.node,
    actionsRight: PropTypes.node,
    fixed: PropTypes.bool,
  };

  componentDidMount() {
    if(!this.props.children) { return; }

    const tabs = ReactDOM.findDOMNode(this.refs.tabs);
    if(tabs.querySelector('.md-tabs.tabs-centered') || tabs.querySelector('.md-tabs.fixed-width')) { return; }

    const menuBtn = ReactDOM.findDOMNode(this).querySelector('.menu-btn');
    const menuMargin = parseInt(window.getComputedStyle(menuBtn, null).getPropertyValue('margin-left'));
    const offset = tabs.querySelector('.md-tab-label > div').offsetLeft;

    /*eslint-disable react/no-did-mount-set-state*/
    this.setState({
      tabsOffset: `${menuMargin * 2 + menuBtn.offsetWidth - offset}px`,
    });
  }

  render() {
    const { menuButton, title, actionsRight, children, ...props } = this.props;
    const { tabsOffset } = this.state;
    return (
      <div className={classnames('md-toolbar-container', { fixed: isPropEnabled(props, 'fixed') })}>
        <header {...props} className={mergeClassNames(props, 'md-toolbar')}>
          {React.cloneElement(menuButton, { className: 'menu-btn' })}
          {title && <h3 className="md-title">{title}</h3>}
          {actionsRight}
        </header>
        {children && React.cloneElement(children, { ref: 'tabs', tabsOffset })}
      </div>
    );
  }
}
