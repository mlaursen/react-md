import React, { PureComponent, PropTypes } from 'react';
import Button from 'react-md/lib/Buttons';
import QuickSearch from 'containers/QuickSearch';

export default class ToolbarChildren extends PureComponent {
  static propTypes = {
    mobile: PropTypes.bool.isRequired,
    mobileSearch: PropTypes.bool.isRequired,
    setMobileSearch: PropTypes.func.isRequired,
  };

  _startMobileSearch = () => {
    this.props.setMobileSearch(true);
  };

  _closeMobileSearch = () => {
    this.props.setMobileSearch(false);
  };

  render() {
    const { mobile, mobileSearch } = this.props;

    const search = <QuickSearch key="quick-search" />;
    if (!mobile) {
      return search;
    } else if (mobileSearch) {
      return (
        <div style={{ display: 'flex', width: '100%' }}>
          {search}
          <Button
            icon
            key="close"
            tooltipLabel="Close Quick Search"
            onClick={this._closeMobileSearch}
          >
            close
          </Button>
        </div>
      );
    } else {
      return (
        <Button
          icon
          key="toggle-quick-search"
          tooltipLabel="Search for documentation"
          onClick={this._startMobileSearch}
          className="mla"
        >
          search
        </Button>
      );
    }
  }
}
