import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { stringify } from 'qs';
import { withRouter } from 'react-router';
import { Tabs, Tab } from 'react-md';
import { getTab } from 'utils/routing';

import './_styles.scss';

class DocumentationTabs extends PureComponent {
  static propTypes = {
    visible: PropTypes.bool,
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
    const { location: { pathname, search }, visible } = this.props;
    if (!visible) {
      return null;
    }

    const activeTabIndex = getTab(search) || 0;
    const colors = pathname.indexOf('colors') !== -1;
    const customization = pathname.indexOf('customization') !== -1;
    const firstTabLabel = customization && pathname.indexOf('grid') === -1
      ? 'Info' : 'Examples';

    let themer;
    let sassdocTab;
    let propTypesTab;
    if (!customization) {
      propTypesTab = <Tab label="Prop Types" id="documentation-prop-types" key="prop-types" />;
    }

    if (colors || pathname.match(/layovers/) || !pathname.match(/helpers|svg/)) {
      sassdocTab = <Tab label="SassDoc" id="documentation-sassdoc" key="sassdoc" />;
    }

    return (
      <Tabs
        mobile={false}
        tabId="documentation"
        className="documentation-tabs"
        activeTabIndex={activeTabIndex}
        onTabChange={this.handleTabChange}
      >
        <Tab label={firstTabLabel} id={`documentation-${firstTabLabel.toLowerCase()}`} key="first-tab" />
        {propTypesTab}
        {themer}
        {sassdocTab}
      </Tabs>
    );
  }
}
export default withRouter(DocumentationTabs);
