import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { stringify } from 'qs';
import { getTab } from 'utils/routing';
import BottomNavigation from 'react-md/lib/BottomNavigations';
import { updateFinderVisibility } from 'state/sassdocFab';

import './_styles.scss';

@withRouter
@connect(({ media: { defaultMedia } }) => ({ defaultMedia }), { updateFinderVisibility })
export default class DocumentationTabs extends PureComponent {
  static propTypes = {
    defaultMedia: PropTypes.string.isRequired,
    location: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    updateFinderVisibility: PropTypes.func,
  };

  constructor(props) {
    super(props);

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

  isSassDocDisabled = pathname => !!(pathname.match(/helpers/) && !pathname.match(/layovers/));

  makeLinks = ({ location: { pathname } }) => {
    const disabled = this.isSassDocDisabled(pathname);
    return [{
      id: 'documentation-examples',
      label: 'Examples',
      iconChildren: 'remove_red_eye',
    }, {
      id: 'documentation-prop-types',
      label: 'Prop Types',
      iconChildren: 'settings',
    }, {
      id: 'documentation-sassdoc',
      label: 'SassDoc',
      iconChildren: 'color_lens',
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
