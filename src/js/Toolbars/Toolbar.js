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
    actionLeft: PropTypes.node,
    title: PropTypes.string,
    children: PropTypes.node,
    actionsRight: PropTypes.node,
    fixed: PropTypes.bool,
  };

  componentDidMount() {
    if(!this.props.children) { return; }

    const tabs = ReactDOM.findDOMNode(this.refs.tabs);
    if(tabs.querySelector('.md-tabs.tabs-centered') || tabs.querySelector('.md-tabs.fixed-width')) { return; }

    const actionLeft = ReactDOM.findDOMNode(this).querySelector('.action-left');
    if(!actionLeft) { return; }
    const actionLeftMargin = parseInt(window.getComputedStyle(actionLeft, null).getPropertyValue('margin-left'));
    const offset = tabs.querySelector('.md-tab-label > div').offsetLeft;

    /*eslint-disable react/no-did-mount-set-state*/
    this.setState({
      tabsOffset: `${actionLeftMargin * 2 + actionLeft.offsetWidth - offset}px`,
    });
  }

  render() {
    const { actionLeft, title, actionsRight, children, ...props } = this.props;
    const { tabsOffset } = this.state;
    const childrenAsHeader = !!children && !actionLeft && !title && !actionsRight;

    let header;
    if(childrenAsHeader) {
      header = children;
    } else {
      header = [
        actionLeft && React.cloneElement(actionLeft, { key: 'action-left', className: 'action-left' }),
        title && <h3 key="title" className="md-title">{title}</h3>,
        actionsRight && React.cloneElement(actionsRight, { key: 'actions-right' }),
      ];
    }
    return (
      <div className={classnames('md-toolbar-container', { fixed: isPropEnabled(props, 'fixed') })}>
        <header {...props} className={mergeClassNames(props, 'md-toolbar')}>
          {header}
        </header>
        {!childrenAsHeader && children && React.cloneElement(children, { ref: 'tabs', tabsOffset })}
      </div>
    );
  }
}
