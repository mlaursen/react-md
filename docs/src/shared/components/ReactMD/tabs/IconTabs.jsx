import React, { PureComponent, PropTypes } from 'react';
import { TabsContainer, Tabs, Tab } from 'react-md/lib/Tabs';
import FontIcon from 'react-md/lib/FontIcons';

import PhoneSizeDemo from 'containers/PhoneSizeDemo';
import ClosePhoneSizeDemoButton from 'components/PhoneSizeDemo/ClosePhoneSizeDemoButton';
import LoremIpsum from 'components/LoremIpsum';
import BaseToolbarExample from '../toolbars/BaseToolbarExample';

const phone = <FontIcon>phone</FontIcon>;
const favorites = <FontIcon style={{ width: 24 }}>favorites</FontIcon>; // it's 48 for some reason
const nearby = <FontIcon>person</FontIcon>;
const nav = <ClosePhoneSizeDemoButton key="close" icon />;


export default class IconTabs extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
  };

  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <PhoneSizeDemo toolbar={false}>
        <TabsContainer toolbar={<BaseToolbarExample component="div" nav={nav} />} colored panelClassName="md-grid phone-tab-content">
          <Tabs tabId="phone-stuffs">
            <Tab label="Recents" icon={phone}>
              <LoremIpsum count={20} paragraphClassName="md-cell md-cell--12 md-text-container" />
            </Tab>
            <Tab label="Favorites" icon={favorites}>
              <LoremIpsum count={20} paragraphClassName="md-cell md-cell--12 md-text-container" />
            </Tab>
            <Tab label="Nearby" icon={nearby}>
              <LoremIpsum count={20} paragraphClassName="md-cell md-cell--12 md-text-container" />
            </Tab>
          </Tabs>
        </TabsContainer>
      </PhoneSizeDemo>
    );
  }
}
