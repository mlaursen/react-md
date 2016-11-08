import React, { PureComponent } from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import Tabs from 'react-md/lib/Tabs/Tabs';
import Tab from 'react-md/lib/Tabs/Tab';
import TabsContainer from 'react-md/lib/Tabs/TabsContainer';
import Slider from 'react-md/lib/Sliders';

import CircularProgress from 'react-md/lib/Progress/CircularProgress';
import LoremIpsum from 'components/LoremIpsum';

export default class SimpleTabs extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { activeTabIndex: 0, tabTwoChildren: null };
    this._handleTabChange = this._handleTabChange.bind(this);
  }

  componentWillUnmount() {
    if (this._timeout) {
      clearTimeout(this._timeut);
    }
  }

  _handleTabChange(activeTabIndex) {
    if (activeTabIndex === 1 && !this.state.tabTwoChildren) {
      // Fake async loading
      this._timeout = setTimeout(() => {
        this._timeout = null;

        this.setState({
          tabTwoChildren: [
            <LoremIpsum key="ipsum" paragraphClassName="md-text-container" />,
            <Slider id="slider" defaultValue={30} key="slider" className="md-cell md-cell--12" />,
          ],
        });
      }, 3000);
    }

    this.setState({ activeTabIndex });
  }

  render() {
    const { activeTabIndex } = this.state;
    let { tabTwoChildren } = this.state;

    if (!tabTwoChildren && activeTabIndex === 1) {
      tabTwoChildren = <CircularProgress id="loading-tab-two" key="loading" />;
    }

    return (
      <TabsContainer onTabChange={this._handleTabChange} activeTabIndex={activeTabIndex} panelClassName="md-grid" colored>
        <Tabs tabId="tab">
          <Tab label="Tab One">
            <h3 className="md-cell md-cell--12">Hello, World!</h3>
          </Tab>
          <Tab label="Tab Two">
            <CSSTransitionGroup
              component="div"
              className="md-cell md-cell--12"
              transitionName="md-cross-fade"
              transitionEnterTimeout={300}
              transitionLeave={false}
            >
              {tabTwoChildren}
            </CSSTransitionGroup>
          </Tab>
        </Tabs>
      </TabsContainer>
    );
  }
}
