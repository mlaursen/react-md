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
  children: <LoremIpsum key="recent" className="md-grid" />,
}, {
  label: 'Favorites',
  icon: <FontIcon style={{ width: 24 }}>favorites</FontIcon>,
  children: <LoremIpsum key="favorites" className="md-grid" />,
}, {
  label: 'Nearby',
  icon: <FontIcon>person</FontIcon>,
  children: <LoremIpsum key="nearby" className="md-grid" />,
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
  }

  _handleChange(activeTabIndex, content) {
    this.setState({ activeTabIndex, content });
  }

  render() {
    const { activeTabIndex, content } = this.state;
    return (
      <PhoneSizeDemo title="Page title" toolbarActions={toolbarActions}>
        <Tabs activeTabIndex={activeTabIndex} onChange={this._handleChange} tabs={tabs} />
        <CSSTransitionGroup transitionName="md-cross-fade" transitionEnterTimeout={300} transitionLeave={false}>
          {content}
        </CSSTransitionGroup>
      </PhoneSizeDemo>
    );
  }
}
