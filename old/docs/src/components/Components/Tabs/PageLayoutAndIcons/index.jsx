import React from 'react';
import { FontIcon, TabsContainer, Tabs, Tab } from 'react-md';

import PhoneEmulator from 'components/PhoneEmulator';

import AppToolbar from './AppToolbar';
import Recents from './Recents';
import Favorites from './Favorites';
import Nearby from './Nearby';

/**
 * This scrolls the active tab panel to the top of its content.
 *
 * Ideally the react-swipeable-views would expose a way to provide props to each
 * "slide" so that we could add ids and aria-attributes to it. Since it doesn't,
 * we can get the panel id, get the parent node (the slide) and then set the scrollTop
 * to 0.
 *
 * The `onTabChange` callback will provide the next activeTabIndex, tabId, panelId, and the
 * event that triggered the change.
 *
 * > NOTE: This will also be called if the activeTabIndex did not change. This allows you to
 * scroll to the top when the same tab is clicked.
 *
 * @param {number} activeTabIndex - the next active tab index.
 * @param {String} tabId - the next active tab's id
 * @param {String} tabPanelId - next active tab's panel's id
 * @param {Event} event - whatever event triggered the tab change
 */
function scrollToTop(activeTabIndex, tabId, tabPanelId) {
  // Mobile devices use an emulator and the scrolling is attached to the entire dialog
  // instead of the tabs-container.
  const emulator = document.getElementById('phone-emulator-demo');
  if (emulator) {
    emulator.scrollTop = 0;
    return;
  }

  const panel = document.getElementById(tabPanelId);
  if (panel) {
    panel.parentNode.scrollTop = 0;
  }
}

const PageLayoutAndIcons = () => (
  <PhoneEmulator toolbar={false}>
    <TabsContainer
      fixed
      themed
      labelAndIcon
      toolbar={<AppToolbar />}
      panelClassName="md-grid"
      onTabChange={scrollToTop}
    >
      <Tabs tabId="phone-stuffs" mobile inactiveTabClassName="md-text--secondary">
        <Tab label="Recents" icon={<FontIcon>phone</FontIcon>}>
          <Recents />
        </Tab>
        <Tab label="Favorites" icon={<FontIcon forceSize>favorites</FontIcon>}>
          <Favorites />
        </Tab>
        <Tab label="Nearby" icon={<FontIcon>person</FontIcon>}>
          <Nearby />
        </Tab>
      </Tabs>
    </TabsContainer>
  </PhoneEmulator>
);
export default PageLayoutAndIcons;
