import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { stringify } from 'qs';
import { BottomNavigation, FontIcon } from 'react-md';

import { getTab } from 'utils/routing';
import { updateFinderVisibility } from 'state/sassdocFab';

import './_styles.scss';

class MobileNavigation extends PureComponent {
  static propTypes = {
    defaultMedia: PropTypes.string.isRequired,
    location: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    updateFinderVisibility: PropTypes.func,
  };

  constructor(props) {
    super();

    this.state = {
      links: this.makeLinks(props),
    };
  }

  componentWillReceiveProps(nextProps) {
    const { location: { pathname } } = this.props;
    const nextPath = nextProps.location.pathname;
    if (this.isSassDocDisabled(pathname) !== this.isSassDocDisabled(nextPath)) {
      this.setState({ links: this.makeLinks(nextProps) });
    }
  }

  isSassDocDisabled = pathname => !!(pathname.match(/helpers|svg/) && !pathname.match(/layovers/));

  makeLinks = ({ location: { pathname } }) => {
    const disabled = this.isSassDocDisabled(pathname);
    return [{
      id: 'documentation-examples',
      label: 'Examples',
      icon: <FontIcon>remove_red_eye</FontIcon>,
    }, {
      id: 'documentation-prop-types',
      label: 'Prop Types',
      icon: <FontIcon>settings</FontIcon>,
    }, {
      id: 'documentation-sassdoc',
      label: 'SassDoc',
      icon: <FontIcon>color_lens</FontIcon>,
      disabled,
    }];
  };

  handleNavChange = (activeTabIndex) => {
    const { history, location: { pathname } } = this.props;
    let search;
    if (activeTabIndex > 0) {
      search = stringify({ tab: activeTabIndex });
    }

    history.replace({ pathname, search });
  };

  render() {
    const { links } = this.state;
    const { location: { search }, updateFinderVisibility } = this.props;
    const activeIndex = getTab(search) || 0;
    return (
      <BottomNavigation
        activeIndex={activeIndex}
        onNavChange={this.handleNavChange}
        dynamic
        links={links}
        colored
        onVisibilityChange={updateFinderVisibility}
      />
    );
  }
}
export default withRouter(connect(({ media: { defaultMedia } }) => ({ defaultMedia }), { updateFinderVisibility })(MobileNavigation));
