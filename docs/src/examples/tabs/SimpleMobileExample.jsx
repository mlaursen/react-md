import React, { PureComponent, PropTypes } from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import Button from 'react-md/lib/Buttons/Button';
import Tabs from 'react-md/lib/Tabs/Tabs';
import FontIcon from 'react-md/lib/FontIcons';

import PhoneSizeDemo from 'containers/PhoneSizeDemo';
import LoremIpsum from 'components/LoremIpsum';
import ToolbarMenu from '../toolbars/ToolbarMenu';

const toolbarActions = [
  <Button key="search" icon>search</Button>,
  <ToolbarMenu key="menu" />,
];

const tabs = [{
  label: 'Recents',
  icon: <FontIcon>phone</FontIcon>,
  children: <LoremIpsum key="recent" className="md-cell md-cell--12" count={20} />,
}, {
  label: 'Favorites',
  // Its width is off for some reason
  icon: <FontIcon style={{ width: 24 }}>favorites</FontIcon>,
  children: <LoremIpsum key="favorites" className="md-cell md-cell--12" count={20} />,
}, {
  label: 'Nearby',
  icon: <FontIcon>person</FontIcon>,
  children: <LoremIpsum key="nearby" className="md-cell md-cell--12" count={20} />,
}];

export default class SimpleMobileExample extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
  };

  constructor(props) {
    super(props);

    this.state = {
      activeTabIndex: 0,
      content: tabs[0].children,
    };
    this._handleChange = this._handleChange.bind(this);
    this._setTabs = this._setTabs.bind(this);
  }

  componentWillUnmount() {
    if (this._timeout) {
      clearTimeout(this._timeout);
    }
  }

  _setTabs(tabs) {
    if (tabs) {
      // Have to wait for the mobile hacking styles to load
      this._timeout = setTimeout(() => {
        this._timeout = null;
        tabs._positionElements();
      }, 300);
    }
  }

  _handleChange(activeTabIndex, content) {
    this.setState({ activeTabIndex, content });
  }

  render() {
    const { activeTabIndex, content } = this.state;
    return (
      <PhoneSizeDemo title="Page title" toolbarActions={toolbarActions} zDepth={0}>
        <Tabs activeTabIndex={activeTabIndex} onChange={this._handleChange} tabs={tabs} ref={this._setTabs} />
        <CSSTransitionGroup
          component="div"
          className="md-grid md-tab-toolbar--icon-relative"
          transitionName="md-cross-fade"
          transitionEnterTimeout={300}
          transitionLeave={false}
        >
          {content}
        </CSSTransitionGroup>
      </PhoneSizeDemo>
    );
  }
}
