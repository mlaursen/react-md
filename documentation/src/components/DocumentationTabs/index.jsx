import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Tabs from 'react-md/lib/Tabs/Tabs';
import Tab from 'react-md/lib/Tabs/Tab';
import { stringify } from 'qs';
import { getTab } from 'utils/routing';

import './_styles.scss';

@withRouter
@connect(({ media: { defaultMedia } }) => ({ defaultMedia }))
export default class DocumentationTabs extends PureComponent {
  static propTypes = {
    defaultMedia: PropTypes.string.isRequired,
    location: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  };

  handleTabChange = (activeTabIndex) => {
    const { history, location: { pathname } } = this.props;
    let search;
    if (activeTabIndex > 0) {
      search = stringify({ tab: activeTabIndex });
    }

    history.replace({ pathname, search });
  };

  render() {
    const {
      defaultMedia,
      location: { pathname, search },
    } = this.props;

    const activeTabIndex = getTab(search) || 0;
    const colors = pathname.indexOf('colors') !== -1;
    const themes = pathname.indexOf('themes') !== -1;
    const customization = pathname.indexOf('customization') !== -1;
    const firstTabLabel = customization && pathname.indexOf('grid') === -1
      ? 'Info' : 'Examples';

    let themer;
    let sassdocTab;
    let propTypesTab;
    if (!customization) {
      propTypesTab = <Tab label="Prop Types" id="documentation-prop-types" key="prop-types" />;
    }

    if (colors || pathname.match(/layovers/) || !pathname.match(/helpers/)) {
      sassdocTab = <Tab label="SassDoc" id="documentation-sassdoc" key="sassdoc" />;
    }

    if (themes) {
      themer = <Tab label="Theme Builder" id="theme-builder" key="themer" />;
    }

    return (
      <Tabs
        tabId="documentation"
        className="documentation-tabs"
        activeTabIndex={activeTabIndex}
        onTabChange={this.handleTabChange}
        defaultMedia={defaultMedia}
      >
        <Tab label={firstTabLabel} id={`documentation-${firstTabLabel.toLowerCase()}`} key="first-tab" />
        {propTypesTab}
        {themer}
        {sassdocTab}
      </Tabs>
    );
  }
}
