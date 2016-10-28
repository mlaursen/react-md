import React, { PureComponent, PropTypes } from 'react';
import withRouter from 'react-router/lib/withRouter';
// import { connect } from 'react-redux';
import { Tabs, Tab } from 'react-md/lib/Tabs';

@withRouter
export default class DocumentationTabs extends PureComponent {
  static propTypes = {
    router: PropTypes.shape({
      replace: PropTypes.func.isRequired,
      location: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
        query: PropTypes.shape({
          tab: PropTypes.string,
        }),
      }).isRequired,
      params: PropTypes.shape({
        component: PropTypes.string,
        section: PropTypes.string,
      }).isRequired,
    }).isRequired,
    className: PropTypes.string,
    children: PropTypes.node,
  };

  constructor(props) {
    super(props);

    this.state = {};
    this._handleTabChange = this._handleTabChange.bind(this);
  }

  _handleTabChange(activeTabIndex) {
    const { router: { replace, location: { pathname } } } = this.props;
    let query;
    if (activeTabIndex > 0) {
      query = { tab: activeTabIndex };
    }

    replace({ pathname, query });
  }

  render() {
    const { router: { location: { query: { tab } }, params: { section } } } = this.props;
    let sassdocTab;
    if (section !== 'helpers') {
      sassdocTab = (
        <Tab label="SassDoc" id="documentation-sassdoc" />
      );
    }

    return (
      <Tabs
        tabId="documentation"
        className="documentation-tabs"
        activeTabIndex={parseInt(tab, 10) || 0}
        onTabChange={this._handleTabChange}
        colored
      >
        <Tab label="Examples" id="documentation-examples" />
        <Tab label="Prop Types" id="documentation-prop-types" />
        {sassdocTab}
      </Tabs>
    );
  }
}
